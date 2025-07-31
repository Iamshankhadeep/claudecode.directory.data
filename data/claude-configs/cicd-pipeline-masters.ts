export default {
  id: 'cicd-pipeline-masters',
  title: 'CI/CD Pipeline Masters',
  description: 'Enterprise-grade CI/CD pipeline configuration with GitOps, security scanning, multi-environment deployments, and advanced automation patterns for production-scale systems.',
  category: 'Claude.md Configurations',
  tags: ['cicd', 'gitops', 'kubernetes', 'docker', 'security', 'testing', 'deployment', 'automation', 'github-actions', 'jenkins', 'enterprise'],
  difficulty: 'ADVANCED',
  estimatedTime: '3-6 hours setup',
  type: 'claude.md',
  author: {
    name: 'Claude Code Directory',
    url: 'https://claudecode.directory'
  },
  lastUpdated: '2024-01-31',
  content: `# CI/CD Pipeline Masters

Advanced CI/CD pipeline configuration for enterprise-scale deployments with GitOps workflows, comprehensive security scanning, multi-environment management, and automated testing strategies.

## Prerequisites

- Kubernetes cluster with GitOps operator (ArgoCD/Flux)
- Container registry (ECR, GCR, Harbor)
- Secret management system (Vault, AWS Secrets Manager)
- Security scanning tools (Snyk, Trivy, SonarQube)
- Understanding of deployment patterns and strategies

## Advanced GitHub Actions Pipeline

### Multi-Stage Pipeline with Security Integration

\`\`\`yaml
# .github/workflows/production-pipeline.yml
name: Production CI/CD Pipeline

on:
  push:
    branches: [main, develop]
    paths-ignore:
      - 'docs/**'
      - '*.md'
  pull_request:
    branches: [main]
    types: [opened, synchronize, reopened]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}
  KUBERNETES_VERSION: "1.28"
  HELM_VERSION: "3.12.0"

jobs:
  # Static Analysis and Security Scanning
  security-scan:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      security-events: write
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci --only=production

      - name: Run SAST with CodeQL
        uses: github/codeql-action/init@v3
        with:
          languages: typescript, javascript

      - name: Build application
        run: npm run build

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v3

      - name: Run Semgrep Security Scan
        uses: returntocorp/semgrep-action@v1
        with:
          config: >-
            p/security-audit
            p/secrets
            p/owasp-top-ten
            p/kubernetes

      - name: Dependency Security Scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high --fail-on=upgradable

      - name: License Compliance Check
        run: |
          npx license-checker --onlyAllow "MIT;ISC;Apache-2.0;BSD-2-Clause;BSD-3-Clause" --excludePrivatePackages

  # Build and Test
  build-test:
    runs-on: ubuntu-latest
    needs: security-scan
    strategy:
      matrix:
        node-version: [18, 20]
    outputs:
      image-digest: \${{ steps.build.outputs.digest }}
      image-tag: \${{ steps.meta.outputs.tags }}
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run type checking
        run: npm run type-check

      - name: Run unit tests
        run: npm run test:unit -- --coverage --watchAll=false
        env:
          CI: true

      - name: Run integration tests
        run: npm run test:integration
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/testdb

      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
          flags: unittests
          name: codecov-umbrella

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=sha,prefix={{branch}}-
            type=raw,value=latest,enable={{is_default_branch}}

      - name: Build and push Docker image
        id: build
        uses: docker/build-push-action@v5
        with:
          context: .
          platforms: linux/amd64,linux/arm64
          push: true
          tags: \${{ steps.meta.outputs.tags }}
          labels: \${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          build-args: |
            BUILDTIME=\${{ fromJSON(steps.meta.outputs.json).labels['org.opencontainers.image.created'] }}
            VERSION=\${{ fromJSON(steps.meta.outputs.json).labels['org.opencontainers.image.version'] }}
            REVISION=\${{ fromJSON(steps.meta.outputs.json).labels['org.opencontainers.image.revision'] }}

  # Container Security Scanning
  container-scan:
    runs-on: ubuntu-latest
    needs: build-test
    steps:
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: \${{ needs.build-test.outputs.image-tag }}
          format: 'sarif'
          output: 'trivy-results.sarif'

      - name: Upload Trivy scan results
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: 'trivy-results.sarif'

      - name: Docker Scout vulnerability scan
        uses: docker/scout-action@v1
        with:
          command: cves
          image: \${{ needs.build-test.outputs.image-tag }}
          only-severities: critical,high
          exit-code: true

  # Performance and Load Testing
  performance-test:
    runs-on: ubuntu-latest
    needs: build-test
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup K6
        run: |
          sudo gpg -k
          sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
          echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
          sudo apt-get update
          sudo apt-get install k6

      - name: Start test environment
        run: |
          docker-compose -f docker-compose.test.yml up -d
          sleep 30

      - name: Run load tests
        run: |
          k6 run --out json=results.json tests/performance/load-test.js

      - name: Generate performance report
        run: |
          node scripts/generate-perf-report.js results.json

      - name: Upload performance results
        uses: actions/upload-artifact@v3
        with:
          name: performance-results
          path: |
            results.json
            performance-report.html

  # Deploy to Staging
  deploy-staging:
    runs-on: ubuntu-latest
    needs: [build-test, container-scan]
    if: github.ref == 'refs/heads/develop'
    environment:
      name: staging
      url: https://staging.example.com
    steps:
      - name: Checkout GitOps repo
        uses: actions/checkout@v4
        with:
          repository: company/gitops-configs
          token: \${{ secrets.GITOPS_TOKEN }}
          path: gitops

      - name: Update staging manifest
        run: |
          cd gitops/apps/staging
          yq eval '.spec.template.spec.containers[0].image = "\${{ needs.build-test.outputs.image-tag }}"' -i deployment.yaml
          yq eval '.metadata.labels.version = "\${{ github.sha }}"' -i deployment.yaml

      - name: Commit and push changes
        run: |
          cd gitops
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add .
          git commit -m "Deploy \${{ github.sha }} to staging"
          git push

      - name: Wait for deployment
        run: |
          echo "Waiting for ArgoCD to sync deployment..."
          sleep 60

      - name: Run smoke tests
        run: |
          curl -f https://staging.example.com/health || exit 1
          npm run test:smoke -- --baseUrl https://staging.example.com

  # Deploy to Production
  deploy-production:
    runs-on: ubuntu-latest
    needs: [build-test, container-scan, performance-test]
    if: github.ref == 'refs/heads/main'
    environment:
      name: production
      url: https://example.com
    steps:
      - name: Checkout GitOps repo
        uses: actions/checkout@v4
        with:
          repository: company/gitops-configs
          token: \${{ secrets.GITOPS_TOKEN }}
          path: gitops

      - name: Create deployment branch
        run: |
          cd gitops
          git checkout -b deploy-\${{ github.sha }}

      - name: Update production manifest with canary strategy
        run: |
          cd gitops/apps/production
          # Update main deployment
          yq eval '.spec.template.spec.containers[0].image = "\${{ needs.build-test.outputs.image-tag }}"' -i deployment.yaml
          yq eval '.metadata.labels.version = "\${{ github.sha }}"' -i deployment.yaml
          
          # Create canary deployment
          cp deployment.yaml canary-deployment.yaml
          yq eval '.metadata.name = "app-canary"' -i canary-deployment.yaml
          yq eval '.spec.replicas = 1' -i canary-deployment.yaml
          yq eval '.metadata.labels.deployment = "canary"' -i canary-deployment.yaml

      - name: Create pull request for production deployment
        uses: peter-evans/create-pull-request@v5
        with:
          token: \${{ secrets.GITOPS_TOKEN }}
          path: gitops
          commit-message: "Deploy \${{ github.sha }} to production"
          title: "Production Deployment: \${{ github.sha }}"
          body: |
            ## Production Deployment
            
            **Commit**: \${{ github.sha }}
            **Image**: \${{ needs.build-test.outputs.image-tag }}
            
            ### Pre-deployment Checklist
            - [x] Security scans passed
            - [x] Performance tests passed
            - [x] Staging deployment successful
            
            ### Deployment Strategy
            - Canary deployment with 5% traffic
            - Gradual rollout over 30 minutes
            - Automatic rollback on error rate > 1%
          branch: deploy-\${{ github.sha }}

  # Post-deployment verification
  post-deployment:
    runs-on: ubuntu-latest
    needs: deploy-production
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Run production smoke tests
        run: |
          curl -f https://example.com/health || exit 1
          curl -f https://example.com/metrics || exit 1

      - name: Check application metrics
        run: |
          # Query Prometheus for key metrics
          curl -s "http://prometheus:9090/api/v1/query?query=up{job='app'}" | jq '.data.result[0].value[1]' | grep -q "1"

      - name: Notify deployment success
        uses: 8398a7/action-slack@v3
        with:
          status: success
          fields: repo,message,commit,author,action,eventName,ref,workflow
        env:
          SLACK_WEBHOOK_URL: \${{ secrets.SLACK_WEBHOOK }}
\`\`\`

## GitOps with ArgoCD Configuration

### Application Deployment Configuration

\`\`\`yaml
# argocd/applications/production-app.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: production-app
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: production
  source:
    repoURL: https://github.com/company/gitops-configs
    targetRevision: HEAD
    path: apps/production
    helm:
      valueFiles:
        - values.yaml
        - values-production.yaml
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
      allowEmpty: false
    syncOptions:
      - CreateNamespace=true
      - PrunePropagationPolicy=foreground
      - PruneLast=true
    retry:
      limit: 5
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m
  revisionHistoryLimit: 10
---
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: production
  namespace: argocd
spec:
  description: Production applications
  sourceRepos:
    - 'https://github.com/company/gitops-configs'
  destinations:
    - namespace: 'production'
      server: https://kubernetes.default.svc
    - namespace: 'monitoring'
      server: https://kubernetes.default.svc
  clusterResourceWhitelist:
    - group: ''
      kind: Namespace
    - group: 'rbac.authorization.k8s.io'
      kind: ClusterRole
    - group: 'rbac.authorization.k8s.io'
      kind: ClusterRoleBinding
  namespaceResourceWhitelist:
    - group: ''
      kind: '*'
    - group: 'apps'
      kind: '*'
    - group: 'networking.k8s.io'
      kind: '*'
    - group: 'extensions'
      kind: '*'
  roles:
    - name: admin
      policies:
        - p, proj:production:admin, applications, *, production/*, allow
        - p, proj:production:admin, repositories, *, *, allow
      groups:
        - company:platform-team
    - name: readonly
      policies:
        - p, proj:production:readonly, applications, get, production/*, allow
        - p, proj:production:readonly, applications, sync, production/*, deny
      groups:
        - company:developers
\`\`\`

### Progressive Delivery with Argo Rollouts

\`\`\`yaml
# rollouts/canary-rollout.yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: production-app
  namespace: production
spec:
  replicas: 10
  strategy:
    canary:
      canaryService: app-canary
      stableService: app-stable
      trafficRouting:
        nginx:
          stableIngress: app-ingress
          additionalIngressAnnotations:
            canary-by-header: X-Canary
            canary-by-header-value: "true"
      steps:
        - setWeight: 5
        - pause:
            duration: 2m
        - setWeight: 10
        - pause:
            duration: 2m
        - analysis:
            templates:
              - templateName: success-rate
            args:
              - name: service-name
                value: app-canary
        - setWeight: 25
        - pause:
            duration: 5m
        - analysis:
            templates:
              - templateName: success-rate
              - templateName: latency
            args:
              - name: service-name
                value: app-canary
        - setWeight: 50
        - pause:
            duration: 10m
        - setWeight: 75
        - pause:
            duration: 10m
  selector:
    matchLabels:
      app: production-app
  template:
    metadata:
      labels:
        app: production-app
    spec:
      containers:
        - name: app
          image: ghcr.io/company/app:latest
          ports:
            - containerPort: 8080
              protocol: TCP
          resources:
            requests:
              memory: "128Mi"
              cpu: "100m"
            limits:
              memory: "512Mi"
              cpu: "500m"
          livenessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /ready
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 5
---
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: success-rate
  namespace: production
spec:
  args:
    - name: service-name
  metrics:
    - name: success-rate
      interval: 2m
      count: 3
      successCondition: result[0] >= 0.99
      failureLimit: 2
      provider:
        prometheus:
          address: http://prometheus:9090
          query: |
            sum(rate(http_requests_total{service="{{args.service-name}}",status!~"5.."}[2m])) /
            sum(rate(http_requests_total{service="{{args.service-name}}"}[2m]))
---
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: latency
  namespace: production
spec:
  args:
    - name: service-name
  metrics:
    - name: p95-latency
      interval: 2m
      count: 3
      successCondition: result[0] <= 0.2
      failureLimit: 2
      provider:
        prometheus:
          address: http://prometheus:9090
          query: |
            histogram_quantile(0.95,
              sum(rate(http_request_duration_seconds_bucket{service="{{args.service-name}}"}[2m])) by (le)
            )
\`\`\`

## Advanced Jenkins Pipeline

### Declarative Pipeline with Kubernetes Agents

\`\`\`groovy
// Jenkinsfile - Enterprise CI/CD Pipeline
pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: docker
    image: docker:24-dind
    securityContext:
      privileged: true
    volumeMounts:
    - name: docker-sock
      mountPath: /var/run/docker.sock
  - name: kubectl
    image: bitnami/kubectl:1.28
    command:
    - sleep
    args:
    - 99d
  - name: helm
    image: alpine/helm:3.12.0
    command:
    - sleep
    args:
    - 99d
  - name: node
    image: node:20-alpine
    command:
    - sleep
    args:
    - 99d
  - name: security-scanner
    image: aquasec/trivy:latest
    command:
    - sleep
    args:
    - 99d
  volumes:
  - name: docker-sock
    hostPath:
      path: /var/run/docker.sock
"""
        }
    }
    
    environment {
        REGISTRY = 'your-registry.com'
        IMAGE_NAME = 'company/app'
        KUBECONFIG = credentials('k8s-config')
        DOCKER_REGISTRY_CREDS = credentials('docker-registry')
        SONAR_TOKEN = credentials('sonar-token')
        SNYK_TOKEN = credentials('snyk-token')
    }
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '30'))
        timeout(time: 1, unit: 'HOURS')
        disableConcurrentBuilds()
        skipStagesAfterUnstable()
    }
    
    stages {
        stage('Checkout & Setup') {
            steps {
                checkout scm
                container('node') {
                    sh '''
                        npm ci --only=production
                        npm audit --audit-level high
                    '''
                }
            }
        }
        
        stage('Code Quality & Security') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        container('node') {
                            sh '''
                                npm run test:unit -- --coverage --ci
                                npm run test:integration
                            '''
                            publishTestResults(
                                testResultsPattern: 'test-results.xml',
                                allowEmptyResults: false
                            )
                            publishCoverage(
                                adapters: [istanbulCoberturaAdapter('coverage/cobertura-coverage.xml')],
                                sourceFileResolver: sourceFiles('STORE_LAST_BUILD')
                            )
                        }
                    }
                }
                
                stage('Static Analysis') {
                    steps {
                        container('node') {
                            script {
                                def sonarqube = tool 'SonarQube Scanner'
                                withSonarQubeEnv('SonarQube') {
                                    sh """
                                        \${sonarqube}/bin/sonar-scanner \\
                                            -Dsonar.projectKey=\${JOB_NAME} \\
                                            -Dsonar.sources=src \\
                                            -Dsonar.tests=tests \\
                                            -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \\
                                            -Dsonar.testExecutionReportPaths=test-results.xml
                                    """
                                }
                            }
                        }
                    }
                }
                
                stage('Security Scan') {
                    steps {
                        container('security-scanner') {
                            sh '''
                                # Dependency vulnerability scan
                                snyk test --severity-threshold=high
                                
                                # SAST scan
                                semgrep --config=p/security-audit --config=p/owasp-top-ten src/
                            '''
                        }
                    }
                }
            }
        }
        
        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        
        stage('Build & Test Image') {
            steps {
                container('docker') {
                    script {
                        def imageTag = "\${REGISTRY}/\${IMAGE_NAME}:\${BUILD_NUMBER}"
                        def latestTag = "\${REGISTRY}/\${IMAGE_NAME}:latest"
                        
                        sh """
                            docker build \\
                                --build-arg BUILD_DATE=\$(date -u +'%Y-%m-%dT%H:%M:%SZ') \\
                                --build-arg VCS_REF=\${GIT_COMMIT} \\
                                --build-arg VERSION=\${BUILD_NUMBER} \\
                                -t \${imageTag} \\
                                -t \${latestTag} \\
                                .
                        """
                        
                        // Security scan of built image
                        sh """
                            trivy image --exit-code 1 --severity HIGH,CRITICAL \${imageTag}
                        """
                        
                        // Push to registry
                        withCredentials([usernamePassword(
                            credentialsId: 'docker-registry',
                            usernameVariable: 'DOCKER_USER',
                            passwordVariable: 'DOCKER_PASS'
                        )]) {
                            sh """
                                echo \$DOCKER_PASS | docker login \${REGISTRY} -u \$DOCKER_USER --password-stdin
                                docker push \${imageTag}
                                docker push \${latestTag}
                            """
                        }
                        
                        env.IMAGE_TAG = imageTag
                    }
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                container('helm') {
                    sh """
                        helm upgrade --install app-staging ./helm/app \\
                            --namespace staging \\
                            --create-namespace \\
                            --set image.tag=\${BUILD_NUMBER} \\
                            --set environment=staging \\
                            --set replicaCount=2 \\
                            --wait --timeout=5m
                    """
                }
                
                // Run smoke tests
                sh '''
                    sleep 30
                    curl -f http://app-staging.staging.svc.cluster.local/health || exit 1
                '''
            }
        }
        
        stage('Performance Tests') {
            when {
                branch 'develop'
            }
            steps {
                container('node') {
                    sh '''
                        npm run test:performance -- --base-url http://app-staging.staging.svc.cluster.local
                    '''
                    publishPerformanceReport(
                        parsers: [[$class: 'JMeterParser', glob: 'performance-results.jtl']],
                        relativeThresholds: [$class: 'RelativeThresholds',
                            thresholdTolerance: [$class: 'ThresholdTolerance',
                                unstableResponseTimeThreshold: '10',
                                failedResponseTimeThreshold: '20'
                            ]
                        ]
                    )
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                input message: 'Deploy to Production?', ok: 'Deploy',
                      submitterParameter: 'APPROVER'
                
                container('helm') {
                    sh """
                        helm upgrade --install app-production ./helm/app \\
                            --namespace production \\
                            --create-namespace \\
                            --set image.tag=\${BUILD_NUMBER} \\
                            --set environment=production \\
                            --set replicaCount=5 \\
                            --set resources.requests.cpu=200m \\
                            --set resources.requests.memory=256Mi \\
                            --set resources.limits.cpu=1000m \\
                            --set resources.limits.memory=1Gi \\
                            --wait --timeout=10m
                    """
                }
                
                // Verify deployment
                container('kubectl') {
                    sh '''
                        kubectl rollout status deployment/app-production -n production --timeout=600s
                        kubectl get pods -n production -l app=app-production
                    '''
                }
            }
            post {
                success {
                    slackSend(
                        channel: '#deployments',
                        color: 'good',
                        message: "✅ Production deployment successful: \${env.JOB_NAME} #\${env.BUILD_NUMBER} by \${APPROVER}"
                    )
                }
                failure {
                    slackSend(
                        channel: '#deployments',
                        color: 'danger',
                        message: "❌ Production deployment failed: \${env.JOB_NAME} #\${env.BUILD_NUMBER} by \${APPROVER}"
                    )
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        failure {
            emailext(
                subject: "Build Failed: \${env.JOB_NAME} #\${env.BUILD_NUMBER}",
                body: "Build failed. Check console output at \${env.BUILD_URL}",
                to: "\${env.CHANGE_AUTHOR_EMAIL}, platform-team@company.com"
            )
        }
    }
}
\`\`\`

## Multi-Cloud Deployment Strategy

### Terraform CI/CD Integration

\`\`\`typescript
// scripts/infrastructure-deploy.ts
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

interface DeploymentConfig {
  environment: string;
  region: string;
  provider: 'aws' | 'gcp' | 'azure';
  workspace: string;
  tfvarsFile: string;
}

class InfrastructureDeployer {
  private config: DeploymentConfig;
  
  constructor(config: DeploymentConfig) {
    this.config = config;
  }
  
  async deploy(): Promise<void> {
    try {
      console.log(\`Deploying to \${this.config.environment} in \${this.config.region}\`);
      
      // Initialize Terraform
      await this.runTerraform(['init', '-upgrade']);
      
      // Select workspace
      await this.runTerraform(['workspace', 'select', this.config.workspace]);
      
      // Plan deployment
      const planFile = \`plan-\${Date.now()}.tfplan\`;
      await this.runTerraform([
        'plan',
        '-var-file', this.config.tfvarsFile,
        '-out', planFile,
        '-detailed-exitcode'
      ]);
      
      // Apply if changes detected
      if (fs.existsSync(planFile)) {
        await this.runTerraform(['apply', '-auto-approve', planFile]);
        
        // Clean up plan file
        fs.unlinkSync(planFile);
        
        // Export outputs
        await this.exportOutputs();
      } else {
        console.log('No changes detected');
      }
      
    } catch (error) {
      console.error('Deployment failed:', error);
      throw error;
    }
  }
  
  private async runTerraform(args: string[]): Promise<string> {
    const cmd = \`terraform \${args.join(' ')}\`;
    console.log(\`Running: \${cmd}\`);
    
    try {
      const output = execSync(cmd, {
        cwd: path.join(__dirname, '../terraform'),
        encoding: 'utf8',
        stdio: 'pipe'
      });
      
      console.log(output);
      return output;
    } catch (error: any) {
      console.error('Terraform command failed:', error.message);
      if (error.stdout) console.log('STDOUT:', error.stdout);
      if (error.stderr) console.error('STDERR:', error.stderr);
      throw error;
    }
  }
  
  private async exportOutputs(): Promise<void> {
    try {
      const outputs = await this.runTerraform(['output', '-json']);
      const outputData = JSON.parse(outputs);
      
      // Export to environment variables for subsequent steps
      const envFile = path.join(__dirname, '../.env.terraform');
      const envVars = Object.entries(outputData)
        .map(([key, value]: [string, any]) => \`TF_\${key.toUpperCase()}=\${value.value}\`)
        .join('\\n');
      
      fs.writeFileSync(envFile, envVars);
      console.log('Terraform outputs exported to .env.terraform');
      
    } catch (error) {
      console.error('Failed to export outputs:', error);
    }
  }
  
  async destroy(): Promise<void> {
    console.log(\`Destroying infrastructure in \${this.config.environment}\`);
    
    await this.runTerraform(['init']);
    await this.runTerraform(['workspace', 'select', this.config.workspace]);
    await this.runTerraform([
      'destroy',
      '-var-file', this.config.tfvarsFile,
      '-auto-approve'
    ]);
  }
}

// Usage in CI/CD pipeline
async function main() {
  const environment = process.env.ENVIRONMENT || 'staging';
  const region = process.env.AWS_REGION || 'us-west-2';
  
  const deployer = new InfrastructureDeployer({
    environment,
    region,
    provider: 'aws',
    workspace: \`\${environment}-\${region}\`,
    tfvarsFile: \`terraform/environments/\${environment}.tfvars\`
  });
  
  if (process.argv[2] === 'destroy') {
    await deployer.destroy();
  } else {
    await deployer.deploy();
  }
}

if (require.main === module) {
  main().catch(console.error);
}
\`\`\`

## Advanced Testing Integration

### Comprehensive Test Strategy

\`\`\`typescript
// tests/e2e/pipeline-tests.ts
import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';

interface TestEnvironment {
  baseUrl: string;
  apiUrl: string;
  environment: 'staging' | 'production';
}

class PipelineTestSuite {
  private env: TestEnvironment;
  
  constructor(env: TestEnvironment) {
    this.env = env;
  }
  
  async runHealthChecks(): Promise<void> {
    test('Health endpoint responds correctly', async ({ request }) => {
      const response = await request.get(\`\${this.env.apiUrl}/health\`);
      expect(response.ok()).toBeTruthy();
      
      const health = await response.json();
      expect(health.status).toBe('healthy');
      expect(health.checks.database.status).toBe('up');
      expect(health.checks.redis.status).toBe('up');
    });
    
    test('Metrics endpoint is accessible', async ({ request }) => {
      const response = await request.get(\`\${this.env.apiUrl}/metrics\`);
      expect(response.ok()).toBeTruthy();
      expect(response.headers()['content-type']).toContain('text/plain');
    });
  }
  
  async runPerformanceTests(): Promise<void> {
    test('API response time is acceptable', async ({ request }) => {
      const start = Date.now();
      const response = await request.get(\`\${this.env.apiUrl}/api/users\`);
      const duration = Date.now() - start;
      
      expect(response.ok()).toBeTruthy();
      expect(duration).toBeLessThan(500); // 500ms threshold
    });
    
    test('Load balancer distributes traffic', async ({ request }) => {
      const responses = await Promise.all(
        Array.from({ length: 10 }, () => 
          request.get(\`\${this.env.apiUrl}/api/server-info\`)
        )
      );
      
      const serverIds = new Set();
      for (const response of responses) {
        const data = await response.json();
        serverIds.add(data.serverId);
      }
      
      // Should hit multiple servers (assuming > 1 replica)
      expect(serverIds.size).toBeGreaterThan(1);
    });
  }
  
  async runSecurityTests(): Promise<void> {
    test('Security headers are present', async ({ request }) => {
      const response = await request.get(this.env.baseUrl);
      const headers = response.headers();
      
      expect(headers['x-frame-options']).toBeTruthy();
      expect(headers['x-content-type-options']).toBe('nosniff');
      expect(headers['x-xss-protection']).toBeTruthy();
      expect(headers['strict-transport-security']).toBeTruthy();
    });
    
    test('API requires authentication', async ({ request }) => {
      const response = await request.get(\`\${this.env.apiUrl}/api/protected\`);
      expect(response.status()).toBe(401);
    });
    
    test('Rate limiting is enforced', async ({ request }) => {
      const requests = Array.from({ length: 100 }, () =>
        request.get(\`\${this.env.apiUrl}/api/public\`)
      );
      
      const responses = await Promise.allSettled(requests);
      const rateLimited = responses.some(r => 
        r.status === 'fulfilled' && r.value.status() === 429
      );
      
      expect(rateLimited).toBeTruthy();
    });
  }
  
  async runBusinessLogicTests(): Promise<void> {
    test('User registration flow works', async ({ page }) => {
      await page.goto(\`\${this.env.baseUrl}/register\`);
      
      await page.fill('[data-testid=email]', 'test@example.com');
      await page.fill('[data-testid=password]', 'SecurePassword123!');
      await page.click('[data-testid=submit]');
      
      await expect(page.locator('[data-testid=success-message]')).toBeVisible();
    });
    
    test('Critical user journey completes', async ({ page }) => {
      await page.goto(\`\${this.env.baseUrl}/login\`);
      
      // Login
      await page.fill('[data-testid=email]', 'existing@example.com');
      await page.fill('[data-testid=password]', 'password123');
      await page.click('[data-testid=login]');
      
      // Navigate to main feature
      await page.click('[data-testid=main-feature]');
      await expect(page.locator('[data-testid=feature-content]')).toBeVisible();
      
      // Perform critical action
      await page.click('[data-testid=critical-action]');
      await page.waitForResponse(resp => 
        resp.url().includes('/api/critical') && resp.status() === 200
      );
      
      await expect(page.locator('[data-testid=success-indicator]')).toBeVisible();
    });
  }
  
  async runInfrastructureTests(): Promise<void> {
    test('Database connectivity', async () => {
      // Test database connection and basic operations
      const result = execSync(
        \`kubectl exec -n \${this.env.environment} deployment/app -- npm run db:health\`,
        { encoding: 'utf8' }
      );
      
      expect(result).toContain('Database connection: OK');
    });
    
    test('Service mesh connectivity', async ({ request }) => {
      // Test service-to-service communication
      const response = await request.get(\`\${this.env.apiUrl}/api/service-status\`);
      const status = await response.json();
      
      expect(status.services.every(s => s.status === 'healthy')).toBeTruthy();
    });
    
    test('Resource utilization within limits', async () => {
      const metrics = execSync(
        \`kubectl top pods -n \${this.env.environment} --no-headers\`,
        { encoding: 'utf8' }
      );
      
      const pods = metrics.trim().split('\\n');
      for (const pod of pods) {
        const [, cpu, memory] = pod.split(/\\s+/);
        
        // CPU should be less than 80% of limit
        expect(parseInt(cpu.replace('m', ''))).toBeLessThan(800);
        
        // Memory should be less than 80% of limit
        expect(parseInt(memory.replace('Mi', ''))).toBeLessThan(800);
      }
    });
  }
}

// Test configuration
const testConfig: TestEnvironment = {
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  environment: (process.env.ENVIRONMENT as 'staging' | 'production') || 'staging'
};

const testSuite = new PipelineTestSuite(testConfig);

// Run all test suites
test.describe('Post-deployment Tests', () => {
  testSuite.runHealthChecks();
  testSuite.runPerformanceTests();
  testSuite.runSecurityTests();
  testSuite.runBusinessLogicTests();
  testSuite.runInfrastructureTests();
});
\`\`\`

## Container Registry Management

### Advanced Docker Configuration

\`\`\`dockerfile
# Multi-stage Dockerfile with security hardening
FROM node:20-alpine AS base
WORKDIR /app

# Security: Create non-root user
RUN addgroup -g 1001 -S nodejs && \\
    adduser -S nextjs -u 1001

# Install dependencies
FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Build stage
FROM base AS builder
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --production

# Runtime stage
FROM base AS runner
ENV NODE_ENV=production

# Security: Run as non-root user
USER nextjs

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
    CMD curl -f http://localhost:3000/health || exit 1

# Labels for metadata
LABEL org.opencontainers.image.title="Production App" \\
      org.opencontainers.image.description="Enterprise production application" \\
      org.opencontainers.image.vendor="Company Name" \\
      org.opencontainers.image.licenses="MIT"

ARG BUILDTIME
ARG VERSION
ARG REVISION
LABEL org.opencontainers.image.created=\$BUILDTIME \\
      org.opencontainers.image.version=\$VERSION \\
      org.opencontainers.image.revision=\$REVISION

EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

## Usage Instructions

1. **Setup GitHub Actions Pipeline**:
   \`\`\`bash
   # Create workflow file
   mkdir -p .github/workflows
   cp production-pipeline.yml .github/workflows/
   
   # Configure secrets in GitHub
   gh secret set DOCKER_REGISTRY_TOKEN
   gh secret set SONAR_TOKEN
   gh secret set SNYK_TOKEN
   \`\`\`

2. **Deploy ArgoCD and GitOps**:
   \`\`\`bash
   # Install ArgoCD
   kubectl create namespace argocd
   kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
   
   # Configure applications
   kubectl apply -f argocd/applications/
   \`\`\`

3. **Setup Jenkins with Kubernetes**:
   \`\`\`bash
   # Install Jenkins operator
   helm repo add jenkins https://charts.jenkins.io
   helm install jenkins jenkins/jenkins --values jenkins-values.yaml
   \`\`\`

4. **Configure Multi-Environment Deployments**:
   \`\`\`bash
   # Create environment-specific configurations
   kubectl create namespace staging
   kubectl create namespace production
   
   # Apply RBAC and network policies
   kubectl apply -f k8s/rbac/
   kubectl apply -f k8s/network-policies/
   \`\`\`

## Advanced Features

- **GitOps-based deployments** with ArgoCD/Flux
- **Progressive delivery** with canary and blue-green strategies
- **Comprehensive security scanning** at every stage
- **Multi-cloud infrastructure** deployment
- **Advanced testing strategies** including chaos engineering
- **Cost optimization** and resource monitoring
- **Compliance and audit** tracking
- **Disaster recovery** and backup automation
- **Performance and load testing** integration
- **Incident response** automation

This configuration provides enterprise-grade CI/CD pipelines with comprehensive security, testing, and deployment automation.
`
};