import { ClaudeMdConfig } from '../types';

export const infrastructureAsCodeConfigs: ClaudeMdConfig[] = [
  {
    id: 'infrastructure-as-code-masters',
    title: 'Infrastructure as Code Masters',
    slug: 'infrastructure-as-code-masters-configuration',
    description: 'Advanced Infrastructure as Code implementation with Terraform, Pulumi, CDK, GitOps workflows, policy as code, drift detection, and cloud-native infrastructure automation for enterprise-scale deployments.',
    category: 'Claude.md Configurations',
    tags: ['iac', 'terraform', 'pulumi', 'cdk', 'gitops', 'kubernetes', 'cloud-native', 'automation'],
    difficulty: 'ADVANCED',
    language: 'HCL',
    framework: 'Terraform + Pulumi + AWS CDK',
    author: {
      name: 'Claude Code Directory',
      url: 'https://claudecode.directory'
    },
    lastUpdated: '2024-01-31',
    content: `# Claude.md - Infrastructure as Code Masters

## Project Overview

This is an advanced Infrastructure as Code (IaC) configuration designed for building and managing complex cloud-native infrastructure at scale. It provides comprehensive IaC patterns using multiple tools including Terraform, Pulumi, AWS CDK, and integrates with GitOps workflows, policy-as-code frameworks, and automated compliance checking for enterprise-grade infrastructure automation.

## IaC Philosophy

### Core Principles
1. **Everything as Code**: All infrastructure defined in version-controlled code
2. **Immutable Infrastructure**: Replace instead of modify for consistency
3. **Declarative Configuration**: Describe desired state, not steps
4. **GitOps Workflow**: Git as single source of truth
5. **Policy as Code**: Automated compliance and governance
6. **Drift Detection**: Continuous monitoring for configuration drift
7. **Multi-Cloud Strategy**: Avoid vendor lock-in with abstraction

### Infrastructure Management Areas
- **Resource Provisioning**: Cloud resources, networking, compute
- **Configuration Management**: Application configuration and secrets
- **State Management**: Distributed state with locking
- **Security & Compliance**: Policy enforcement and auditing
- **Cost Optimization**: Resource tagging and cost tracking
- **Disaster Recovery**: Backup and recovery automation
- **Multi-Environment**: Dev, staging, production management

## Technology Stack

- **Primary IaC**: Terraform 1.5+ with advanced providers
- **Alternative IaC**: Pulumi for programmatic infrastructure
- **AWS Native**: AWS CDK for AWS-specific deployments
- **GitOps**: ArgoCD, Flux for Kubernetes deployments
- **Policy Engine**: Open Policy Agent (OPA), Sentinel
- **State Backend**: Terraform Cloud, S3 with DynamoDB
- **CI/CD**: GitHub Actions, GitLab CI, Jenkins
- **Monitoring**: Prometheus, Grafana, CloudWatch

## Project Structure

\`\`\`
infrastructure-as-code-masters/
├── terraform/                      # Terraform configurations
│   ├── modules/                    # Reusable Terraform modules
│   │   ├── networking/             # Network infrastructure
│   │   │   ├── vpc/                # VPC module
│   │   │   │   ├── main.tf         # VPC resources
│   │   │   │   ├── variables.tf    # Input variables
│   │   │   │   ├── outputs.tf      # Output values
│   │   │   │   └── versions.tf     # Provider versions
│   │   │   ├── security-groups/    # Security group module
│   │   │   ├── load-balancer/      # ALB/NLB module
│   │   │   └── vpn/                # VPN configuration
│   │   ├── compute/                # Compute resources
│   │   │   ├── eks/                # EKS cluster module
│   │   │   ├── ecs/                # ECS cluster module
│   │   │   ├── ec2-asg/            # EC2 Auto Scaling
│   │   │   └── lambda/             # Lambda functions
│   │   ├── data/                   # Data layer modules
│   │   │   ├── rds/                # RDS database
│   │   │   ├── dynamodb/           # DynamoDB tables
│   │   │   ├── s3/                 # S3 buckets
│   │   │   └── elasticache/        # Redis/Memcached
│   │   ├── security/               # Security modules
│   │   │   ├── iam/                # IAM roles/policies
│   │   │   ├── kms/                # KMS keys
│   │   │   ├── secrets-manager/    # Secrets management
│   │   │   └── vault/              # HashiCorp Vault
│   │   └── monitoring/             # Monitoring modules
│   │       ├── cloudwatch/         # CloudWatch setup
│   │       ├── prometheus/         # Prometheus stack
│   │       └── grafana/            # Grafana dashboards
│   ├── environments/               # Environment-specific configs
│   │   ├── global/                 # Global resources
│   │   │   ├── iam/                # Global IAM
│   │   │   ├── dns/                # Route53 zones
│   │   │   └── s3/                 # Shared S3 buckets
│   │   ├── dev/                    # Development environment
│   │   │   ├── main.tf             # Dev configuration
│   │   │   ├── terraform.tfvars    # Dev variables
│   │   │   └── backend.tf          # State configuration
│   │   ├── staging/                # Staging environment
│   │   └── production/             # Production environment
│   ├── policies/                   # Policy as Code
│   │   ├── opa/                    # Open Policy Agent
│   │   │   ├── terraform.rego      # Terraform policies
│   │   │   ├── kubernetes.rego     # K8s policies
│   │   │   └── cost.rego           # Cost policies
│   │   └── sentinel/               # Sentinel policies
│   │       ├── cost-control.sentinel
│   │       ├── security.sentinel
│   │       └── compliance.sentinel
│   └── scripts/                    # Helper scripts
│       ├── validate.sh             # Validation script
│       ├── plan.sh                 # Planning script
│       ├── apply.sh                # Apply script
│       └── destroy.sh              # Destroy script
├── pulumi/                         # Pulumi configurations
│   ├── infrastructure/             # Infrastructure stacks
│   │   ├── core/                   # Core infrastructure
│   │   │   ├── index.ts            # Main program
│   │   │   ├── vpc.ts              # VPC configuration
│   │   │   ├── kubernetes.ts       # K8s cluster
│   │   │   └── monitoring.ts       # Monitoring stack
│   │   ├── applications/           # Application infrastructure
│   │   └── data/                   # Data infrastructure
│   ├── policies/                   # Pulumi policies
│   │   ├── security-policies.ts    # Security policies
│   │   ├── cost-policies.ts        # Cost policies
│   │   └── compliance-policies.ts  # Compliance policies
│   ├── components/                 # Reusable components
│   │   ├── network/                # Network components
│   │   ├── compute/                # Compute components
│   │   └── security/               # Security components
│   └── scripts/                    # Pulumi scripts
│       ├── deploy.ts               # Deployment script
│       ├── preview.ts              # Preview script
│       └── destroy.ts              # Destroy script
├── cdk/                            # AWS CDK configurations
│   ├── lib/                        # CDK constructs
│   │   ├── stacks/                 # Stack definitions
│   │   │   ├── network-stack.ts    # Network stack
│   │   │   ├── compute-stack.ts    # Compute stack
│   │   │   └── data-stack.ts       # Data stack
│   │   └── constructs/             # Custom constructs
│   │       ├── secure-bucket.ts    # Secure S3 bucket
│   │       ├── auto-scaling.ts     # Auto-scaling construct
│   │       └── api-gateway.ts      # API Gateway construct
│   ├── bin/                        # CDK app entry points
│   └── test/                       # CDK tests
├── gitops/                         # GitOps configurations
│   ├── argocd/                     # ArgoCD applications
│   │   ├── apps/                   # Application manifests
│   │   ├── projects/               # ArgoCD projects
│   │   └── clusters/               # Cluster configurations
│   ├── flux/                       # Flux configurations
│   │   ├── clusters/               # Cluster definitions
│   │   ├── apps/                   # Application sources
│   │   └── infrastructure/         # Infrastructure sources
│   └── kustomize/                  # Kustomization files
│       ├── base/                   # Base configurations
│       └── overlays/               # Environment overlays
├── automation/                     # Automation scripts
│   ├── ci-cd/                      # CI/CD pipelines
│   │   ├── github-actions/         # GitHub Actions
│   │   ├── gitlab-ci/              # GitLab CI
│   │   └── jenkins/                # Jenkins pipelines
│   ├── drift-detection/            # Drift detection
│   │   ├── terraform-drift.sh      # Terraform drift
│   │   ├── kubernetes-drift.py     # K8s drift
│   │   └── cloud-drift.py          # Cloud drift
│   ├── cost-optimization/          # Cost optimization
│   │   ├── unused-resources.py     # Find unused resources
│   │   ├── rightsizing.py          # Rightsizing recommendations
│   │   └── reserved-instances.py   # RI recommendations
│   └── compliance/                 # Compliance automation
│       ├── security-scan.py        # Security scanning
│       ├── compliance-check.py     # Compliance checking
│       └── audit-report.py         # Audit reporting
├── templates/                      # IaC templates
│   ├── terraform/                  # Terraform templates
│   ├── pulumi/                     # Pulumi templates
│   └── cdk/                        # CDK templates
├── docs/                           # Documentation
│   ├── architecture/               # Architecture docs
│   ├── runbooks/                   # Operational runbooks
│   ├── disaster-recovery/          # DR procedures
│   └── best-practices/             # Best practices
└── tests/                          # Infrastructure tests
    ├── unit/                       # Unit tests
    ├── integration/                # Integration tests
    └── compliance/                 # Compliance tests
\`\`\`

## Advanced Terraform Implementation

### Modular VPC with Advanced Networking
\`\`\`hcl
# terraform/modules/networking/vpc/main.tf
# Advanced VPC module with multi-AZ, private/public subnets, and flow logs

locals {
  max_availability_zones = 3
  private_subnet_count   = var.enable_database_subnets ? 3 : 2
  
  vpc_cidr_blocks = cidrsubnets(
    var.vpc_cidr,
    [for i in range(local.max_availability_zones * local.private_subnet_count) : 4]...
  )
  
  public_subnets   = slice(local.vpc_cidr_blocks, 0, local.max_availability_zones)
  private_subnets  = slice(local.vpc_cidr_blocks, local.max_availability_zones, local.max_availability_zones * 2)
  database_subnets = var.enable_database_subnets ? slice(local.vpc_cidr_blocks, local.max_availability_zones * 2, local.max_availability_zones * 3) : []
}

# Data source for available AZs
data "aws_availability_zones" "available" {
  state = "available"
  
  filter {
    name   = "opt-in-status"
    values = ["opt-in-not-required"]
  }
}

# VPC
resource "aws_vpc" "main" {
  cidr_block                       = var.vpc_cidr
  enable_dns_hostnames             = true
  enable_dns_support               = true
  assign_generated_ipv6_cidr_block = var.enable_ipv6
  
  tags = merge(var.tags, {
    Name = format("%s-vpc", var.name_prefix)
    Type = "vpc"
  })
}

# VPC Flow Logs
resource "aws_flow_log" "main" {
  count = var.enable_flow_logs ? 1 : 0
  
  iam_role_arn    = aws_iam_role.flow_logs[0].arn
  log_destination = aws_cloudwatch_log_group.flow_logs[0].arn
  traffic_type    = "ALL"
  vpc_id          = aws_vpc.main.id
  
  tags = merge(var.tags, {
    Name = format("%s-flow-logs", var.name_prefix)
  })
}

# Public Subnets
resource "aws_subnet" "public" {
  count = local.max_availability_zones
  
  vpc_id                  = aws_vpc.main.id
  cidr_block              = local.public_subnets[count.index]
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true
  
  ipv6_cidr_block                 = var.enable_ipv6 ? cidrsubnet(aws_vpc.main.ipv6_cidr_block, 8, count.index) : null
  assign_ipv6_address_on_creation = var.enable_ipv6
  
  tags = merge(var.tags, {
    Name = format("%s-public-%s", var.name_prefix, data.aws_availability_zones.available.zone_ids[count.index])
    Type = "public"
    Tier = "public"
    "kubernetes.io/role/elb" = "1"
  })
}

# Private Subnets
resource "aws_subnet" "private" {
  count = local.max_availability_zones
  
  vpc_id            = aws_vpc.main.id
  cidr_block        = local.private_subnets[count.index]
  availability_zone = data.aws_availability_zones.available.names[count.index]
  
  ipv6_cidr_block                 = var.enable_ipv6 ? cidrsubnet(aws_vpc.main.ipv6_cidr_block, 8, count.index + local.max_availability_zones) : null
  assign_ipv6_address_on_creation = var.enable_ipv6
  
  tags = merge(var.tags, {
    Name = format("%s-private-%s", var.name_prefix, data.aws_availability_zones.available.zone_ids[count.index])
    Type = "private"
    Tier = "private"
    "kubernetes.io/role/internal-elb" = "1"
  })
}

# Database Subnets
resource "aws_subnet" "database" {
  count = var.enable_database_subnets ? local.max_availability_zones : 0
  
  vpc_id            = aws_vpc.main.id
  cidr_block        = local.database_subnets[count.index]
  availability_zone = data.aws_availability_zones.available.names[count.index]
  
  tags = merge(var.tags, {
    Name = format("%s-database-%s", var.name_prefix, data.aws_availability_zones.available.zone_ids[count.index])
    Type = "database"
    Tier = "database"
  })
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  
  tags = merge(var.tags, {
    Name = format("%s-igw", var.name_prefix)
  })
}

# Elastic IPs for NAT Gateways
resource "aws_eip" "nat" {
  count = var.enable_nat_gateway ? (var.single_nat_gateway ? 1 : local.max_availability_zones) : 0
  
  domain = "vpc"
  
  tags = merge(var.tags, {
    Name = format("%s-nat-eip-%d", var.name_prefix, count.index + 1)
  })
  
  depends_on = [aws_internet_gateway.main]
}

# NAT Gateways
resource "aws_nat_gateway" "main" {
  count = var.enable_nat_gateway ? (var.single_nat_gateway ? 1 : local.max_availability_zones) : 0
  
  allocation_id = aws_eip.nat[count.index].id
  subnet_id     = aws_subnet.public[var.single_nat_gateway ? 0 : count.index].id
  
  tags = merge(var.tags, {
    Name = format("%s-nat-%d", var.name_prefix, count.index + 1)
  })
  
  depends_on = [aws_internet_gateway.main]
}

# Public Route Table
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  
  tags = merge(var.tags, {
    Name = format("%s-public-rt", var.name_prefix)
    Type = "public"
  })
}

# Public Routes
resource "aws_route" "public_internet" {
  route_table_id         = aws_route_table.public.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.main.id
}

resource "aws_route" "public_ipv6" {
  count = var.enable_ipv6 ? 1 : 0
  
  route_table_id              = aws_route_table.public.id
  destination_ipv6_cidr_block = "::/0"
  gateway_id                  = aws_internet_gateway.main.id
}

# Private Route Tables
resource "aws_route_table" "private" {
  count = local.max_availability_zones
  
  vpc_id = aws_vpc.main.id
  
  tags = merge(var.tags, {
    Name = format("%s-private-rt-%s", var.name_prefix, data.aws_availability_zones.available.zone_ids[count.index])
    Type = "private"
  })
}

# Private Routes
resource "aws_route" "private_nat" {
  count = var.enable_nat_gateway ? local.max_availability_zones : 0
  
  route_table_id         = aws_route_table.private[count.index].id
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.main[var.single_nat_gateway ? 0 : count.index].id
}

# Route Table Associations
resource "aws_route_table_association" "public" {
  count = local.max_availability_zones
  
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private" {
  count = local.max_availability_zones
  
  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private[count.index].id
}

resource "aws_route_table_association" "database" {
  count = var.enable_database_subnets ? local.max_availability_zones : 0
  
  subnet_id      = aws_subnet.database[count.index].id
  route_table_id = aws_route_table.private[count.index].id
}

# VPC Endpoints for AWS Services
resource "aws_vpc_endpoint" "s3" {
  count = var.enable_vpc_endpoints ? 1 : 0
  
  vpc_id            = aws_vpc.main.id
  service_name      = "com.amazonaws.${data.aws_region.current.name}.s3"
  vpc_endpoint_type = "Gateway"
  
  route_table_ids = concat(
    [aws_route_table.public.id],
    aws_route_table.private[*].id
  )
  
  tags = merge(var.tags, {
    Name = format("%s-s3-endpoint", var.name_prefix)
  })
}

resource "aws_vpc_endpoint" "dynamodb" {
  count = var.enable_vpc_endpoints ? 1 : 0
  
  vpc_id            = aws_vpc.main.id
  service_name      = "com.amazonaws.${data.aws_region.current.name}.dynamodb"
  vpc_endpoint_type = "Gateway"
  
  route_table_ids = concat(
    [aws_route_table.public.id],
    aws_route_table.private[*].id
  )
  
  tags = merge(var.tags, {
    Name = format("%s-dynamodb-endpoint", var.name_prefix)
  })
}

# Interface VPC Endpoints
resource "aws_vpc_endpoint" "interface_endpoints" {
  for_each = var.enable_vpc_endpoints ? toset(var.interface_vpc_endpoints) : []
  
  vpc_id              = aws_vpc.main.id
  service_name        = "com.amazonaws.${data.aws_region.current.name}.${each.value}"
  vpc_endpoint_type   = "Interface"
  private_dns_enabled = true
  
  subnet_ids         = aws_subnet.private[*].id
  security_group_ids = [aws_security_group.vpc_endpoints.id]
  
  tags = merge(var.tags, {
    Name = format("%s-%s-endpoint", var.name_prefix, each.value)
  })
}

# Security Group for VPC Endpoints
resource "aws_security_group" "vpc_endpoints" {
  name_prefix = "${var.name_prefix}-vpc-endpoints-"
  description = "Security group for VPC endpoints"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  tags = merge(var.tags, {
    Name = format("%s-vpc-endpoints-sg", var.name_prefix)
  })
}

# Network ACLs with custom rules
resource "aws_network_acl" "public" {
  vpc_id     = aws_vpc.main.id
  subnet_ids = aws_subnet.public[*].id
  
  dynamic "ingress" {
    for_each = var.public_nacl_ingress_rules
    content {
      protocol   = ingress.value.protocol
      rule_no    = ingress.value.rule_no
      action     = ingress.value.action
      cidr_block = ingress.value.cidr_block
      from_port  = ingress.value.from_port
      to_port    = ingress.value.to_port
    }
  }
  
  dynamic "egress" {
    for_each = var.public_nacl_egress_rules
    content {
      protocol   = egress.value.protocol
      rule_no    = egress.value.rule_no
      action     = egress.value.action
      cidr_block = egress.value.cidr_block
      from_port  = egress.value.from_port
      to_port    = egress.value.to_port
    }
  }
  
  tags = merge(var.tags, {
    Name = format("%s-public-nacl", var.name_prefix)
  })
}

# VPC Peering (if required)
resource "aws_vpc_peering_connection" "peers" {
  for_each = var.vpc_peering_connections
  
  vpc_id        = aws_vpc.main.id
  peer_vpc_id   = each.value.peer_vpc_id
  peer_region   = each.value.peer_region
  auto_accept   = each.value.auto_accept
  
  accepter {
    allow_remote_vpc_dns_resolution = true
  }
  
  requester {
    allow_remote_vpc_dns_resolution = true
  }
  
  tags = merge(var.tags, {
    Name = format("%s-peering-%s", var.name_prefix, each.key)
  })
}

# Data source for current region
data "aws_region" "current" {}

# CloudWatch Log Group for Flow Logs
resource "aws_cloudwatch_log_group" "flow_logs" {
  count = var.enable_flow_logs ? 1 : 0
  
  name              = "/aws/vpc/flowlogs/${var.name_prefix}"
  retention_in_days = var.flow_logs_retention_days
  kms_key_id        = var.flow_logs_kms_key_id
  
  tags = var.tags
}

# IAM Role for Flow Logs
resource "aws_iam_role" "flow_logs" {
  count = var.enable_flow_logs ? 1 : 0
  
  name_prefix = "${var.name_prefix}-flow-logs-"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "vpc-flow-logs.amazonaws.com"
        }
      }
    ]
  })
  
  tags = var.tags
}

# IAM Policy for Flow Logs
resource "aws_iam_role_policy" "flow_logs" {
  count = var.enable_flow_logs ? 1 : 0
  
  name_prefix = "${var.name_prefix}-flow-logs-"
  role        = aws_iam_role.flow_logs[0].id
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
          "logs:DescribeLogGroups",
          "logs:DescribeLogStreams"
        ]
        Effect = "Allow"
        Resource = "*"
      }
    ]
  })
}
\`\`\`

### Advanced EKS Cluster Module
\`\`\`hcl
# terraform/modules/compute/eks/main.tf
# Production-ready EKS cluster with advanced features

locals {
  cluster_version = var.cluster_version != null ? var.cluster_version : data.aws_eks_addon_version.latest_vpc_cni.version
  
  # OIDC issuer without https://
  oidc_issuer = replace(aws_eks_cluster.main.identity[0].oidc[0].issuer, "https://", "")
  
  # Common tags for all resources
  common_tags = merge(var.tags, {
    "kubernetes.io/cluster/${var.cluster_name}" = "owned"
    "ManagedBy" = "Terraform"
  })
}

# KMS key for EKS encryption
resource "aws_kms_key" "eks" {
  description             = "EKS Secret Encryption Key for ${var.cluster_name}"
  deletion_window_in_days = var.kms_key_deletion_window
  enable_key_rotation     = true
  
  tags = merge(local.common_tags, {
    Name = "${var.cluster_name}-eks-key"
  })
}

resource "aws_kms_alias" "eks" {
  name          = "alias/${var.cluster_name}-eks"
  target_key_id = aws_kms_key.eks.key_id
}

# EKS Cluster
resource "aws_eks_cluster" "main" {
  name     = var.cluster_name
  role_arn = aws_iam_role.cluster.arn
  version  = local.cluster_version
  
  vpc_config {
    subnet_ids              = var.subnet_ids
    endpoint_private_access = var.endpoint_private_access
    endpoint_public_access  = var.endpoint_public_access
    public_access_cidrs     = var.public_access_cidrs
    security_group_ids      = [aws_security_group.cluster.id]
  }
  
  encryption_config {
    provider {
      key_arn = aws_kms_key.eks.arn
    }
    resources = ["secrets"]
  }
  
  enabled_cluster_log_types = var.enabled_cluster_log_types
  
  tags = local.common_tags
  
  depends_on = [
    aws_iam_role_policy_attachment.cluster_AmazonEKSClusterPolicy,
    aws_iam_role_policy_attachment.cluster_AmazonEKSVPCResourceController,
    aws_cloudwatch_log_group.eks,
  ]
}

# CloudWatch Log Group for EKS
resource "aws_cloudwatch_log_group" "eks" {
  name              = "/aws/eks/${var.cluster_name}/cluster"
  retention_in_days = var.log_retention_days
  kms_key_id        = aws_kms_key.eks.arn
  
  tags = local.common_tags
}

# OIDC Provider for IRSA
resource "aws_iam_openid_connect_provider" "eks" {
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = [data.tls_certificate.eks.certificates[0].sha1_fingerprint]
  url             = aws_eks_cluster.main.identity[0].oidc[0].issuer
  
  tags = local.common_tags
}

# Data source to fetch OIDC provider certificate
data "tls_certificate" "eks" {
  url = aws_eks_cluster.main.identity[0].oidc[0].issuer
}

# Security Group for EKS Cluster
resource "aws_security_group" "cluster" {
  name_prefix = "${var.cluster_name}-cluster-"
  description = "Security group for ${var.cluster_name} EKS cluster"
  vpc_id      = var.vpc_id
  
  tags = merge(local.common_tags, {
    Name = "${var.cluster_name}-cluster-sg"
  })
}

# Security Group Rules
resource "aws_security_group_rule" "cluster_ingress_workstation_https" {
  description       = "Allow workstation to communicate with the cluster API Server"
  type              = "ingress"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  cidr_blocks       = var.allowed_cidr_blocks
  security_group_id = aws_security_group.cluster.id
}

resource "aws_security_group_rule" "cluster_egress" {
  description       = "Allow cluster egress to the Internet"
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.cluster.id
}

# IAM Role for EKS Cluster
resource "aws_iam_role" "cluster" {
  name_prefix = "${var.cluster_name}-cluster-"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "eks.amazonaws.com"
        }
      }
    ]
  })
  
  tags = local.common_tags
}

# Attach required policies to cluster role
resource "aws_iam_role_policy_attachment" "cluster_AmazonEKSClusterPolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.cluster.name
}

resource "aws_iam_role_policy_attachment" "cluster_AmazonEKSVPCResourceController" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSVPCResourceController"
  role       = aws_iam_role.cluster.name
}

# EKS Node Groups
resource "aws_eks_node_group" "main" {
  for_each = var.node_groups
  
  cluster_name    = aws_eks_cluster.main.name
  node_group_name = each.key
  node_role_arn   = aws_iam_role.node_group[each.key].arn
  subnet_ids      = each.value.subnet_ids != null ? each.value.subnet_ids : var.subnet_ids
  
  instance_types = each.value.instance_types
  capacity_type  = each.value.capacity_type
  
  scaling_config {
    desired_size = each.value.desired_size
    max_size     = each.value.max_size
    min_size     = each.value.min_size
  }
  
  update_config {
    max_unavailable_percentage = each.value.max_unavailable_percentage
  }
  
  launch_template {
    id      = aws_launch_template.node_group[each.key].id
    version = aws_launch_template.node_group[each.key].latest_version
  }
  
  dynamic "taint" {
    for_each = each.value.taints != null ? each.value.taints : []
    content {
      key    = taint.value.key
      value  = taint.value.value
      effect = taint.value.effect
    }
  }
  
  labels = each.value.labels
  
  tags = merge(local.common_tags, each.value.tags, {
    Name = "${var.cluster_name}-${each.key}"
  })
  
  lifecycle {
    create_before_destroy = true
    ignore_changes        = [scaling_config[0].desired_size]
  }
  
  depends_on = [
    aws_iam_role_policy_attachment.node_group_AmazonEKSWorkerNodePolicy,
    aws_iam_role_policy_attachment.node_group_AmazonEKS_CNI_Policy,
    aws_iam_role_policy_attachment.node_group_AmazonEC2ContainerRegistryReadOnly,
    aws_iam_role_policy_attachment.node_group_AmazonSSMManagedInstanceCore,
  ]
}

# Launch Template for Node Groups
resource "aws_launch_template" "node_group" {
  for_each = var.node_groups
  
  name_prefix = "${var.cluster_name}-${each.key}-"
  
  block_device_mappings {
    device_name = "/dev/xvda"
    
    ebs {
      volume_size           = each.value.disk_size
      volume_type           = each.value.disk_type
      encrypted             = true
      kms_key_id            = aws_kms_key.eks.arn
      delete_on_termination = true
    }
  }
  
  metadata_options {
    http_endpoint               = "enabled"
    http_tokens                 = "required"
    http_put_response_hop_limit = 2
    instance_metadata_tags      = "enabled"
  }
  
  monitoring {
    enabled = var.enable_monitoring
  }
  
  network_interfaces {
    associate_public_ip_address = false
    delete_on_termination       = true
    security_groups             = [aws_security_group.node.id]
  }
  
  tag_specifications {
    resource_type = "instance"
    
    tags = merge(local.common_tags, {
      Name = "${var.cluster_name}-${each.key}-node"
    })
  }
  
  tag_specifications {
    resource_type = "volume"
    
    tags = merge(local.common_tags, {
      Name = "${var.cluster_name}-${each.key}-volume"
    })
  }
  
  user_data = base64encode(templatefile("${path.module}/user_data.sh", {
    cluster_name        = var.cluster_name
    cluster_endpoint    = aws_eks_cluster.main.endpoint
    cluster_ca          = aws_eks_cluster.main.certificate_authority[0].data
    bootstrap_arguments = each.value.bootstrap_arguments
  }))
  
  tags = local.common_tags
}

# Security Group for Nodes
resource "aws_security_group" "node" {
  name_prefix = "${var.cluster_name}-node-"
  description = "Security group for ${var.cluster_name} EKS nodes"
  vpc_id      = var.vpc_id
  
  tags = merge(local.common_tags, {
    Name = "${var.cluster_name}-node-sg"
  })
}

# Security Group Rules for Nodes
resource "aws_security_group_rule" "node_ingress_self" {
  description              = "Allow nodes to communicate with each other"
  type                     = "ingress"
  from_port                = 0
  to_port                  = 65535
  protocol                 = "-1"
  source_security_group_id = aws_security_group.node.id
  security_group_id        = aws_security_group.node.id
}

resource "aws_security_group_rule" "node_ingress_cluster" {
  description              = "Allow worker Kubelets and pods to receive communication from the cluster control plane"
  type                     = "ingress"
  from_port                = 1025
  to_port                  = 65535
  protocol                 = "tcp"
  source_security_group_id = aws_security_group.cluster.id
  security_group_id        = aws_security_group.node.id
}

resource "aws_security_group_rule" "node_egress" {
  description       = "Allow nodes all egress"
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.node.id
}

# IAM Roles for Node Groups
resource "aws_iam_role" "node_group" {
  for_each = var.node_groups
  
  name_prefix = "${var.cluster_name}-${each.key}-node-"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
  
  tags = local.common_tags
}

# Attach required policies to node group roles
resource "aws_iam_role_policy_attachment" "node_group_AmazonEKSWorkerNodePolicy" {
  for_each = var.node_groups
  
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
  role       = aws_iam_role.node_group[each.key].name
}

resource "aws_iam_role_policy_attachment" "node_group_AmazonEKS_CNI_Policy" {
  for_each = var.node_groups
  
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
  role       = aws_iam_role.node_group[each.key].name
}

resource "aws_iam_role_policy_attachment" "node_group_AmazonEC2ContainerRegistryReadOnly" {
  for_each = var.node_groups
  
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
  role       = aws_iam_role.node_group[each.key].name
}

resource "aws_iam_role_policy_attachment" "node_group_AmazonSSMManagedInstanceCore" {
  for_each = var.node_groups
  
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
  role       = aws_iam_role.node_group[each.key].name
}

# EKS Add-ons
resource "aws_eks_addon" "vpc_cni" {
  cluster_name             = aws_eks_cluster.main.name
  addon_name               = "vpc-cni"
  addon_version            = var.vpc_cni_version
  resolve_conflicts        = "OVERWRITE"
  service_account_role_arn = module.vpc_cni_irsa.iam_role_arn
  
  tags = local.common_tags
}

resource "aws_eks_addon" "coredns" {
  cluster_name      = aws_eks_cluster.main.name
  addon_name        = "coredns"
  addon_version     = var.coredns_version
  resolve_conflicts = "OVERWRITE"
  
  tags = local.common_tags
}

resource "aws_eks_addon" "kube_proxy" {
  cluster_name      = aws_eks_cluster.main.name
  addon_name        = "kube-proxy"
  addon_version     = var.kube_proxy_version
  resolve_conflicts = "OVERWRITE"
  
  tags = local.common_tags
}

resource "aws_eks_addon" "ebs_csi_driver" {
  cluster_name             = aws_eks_cluster.main.name
  addon_name               = "aws-ebs-csi-driver"
  addon_version            = var.ebs_csi_driver_version
  resolve_conflicts        = "OVERWRITE"
  service_account_role_arn = module.ebs_csi_driver_irsa.iam_role_arn
  
  tags = local.common_tags
}

# IRSA for VPC CNI
module "vpc_cni_irsa" {
  source = "../irsa"
  
  cluster_name              = var.cluster_name
  oidc_provider_arn         = aws_iam_openid_connect_provider.eks.arn
  service_account_name      = "aws-vpc-cni"
  service_account_namespace = "kube-system"
  
  policy_arns = [
    "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
  ]
  
  tags = local.common_tags
}

# IRSA for EBS CSI Driver
module "ebs_csi_driver_irsa" {
  source = "../irsa"
  
  cluster_name              = var.cluster_name
  oidc_provider_arn         = aws_iam_openid_connect_provider.eks.arn
  service_account_name      = "ebs-csi-controller-sa"
  service_account_namespace = "kube-system"
  
  policy_arns = [
    "arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy"
  ]
  
  tags = local.common_tags
}

# Data source for latest addon versions
data "aws_eks_addon_version" "latest_vpc_cni" {
  addon_name         = "vpc-cni"
  kubernetes_version = var.cluster_version
  most_recent        = true
}

# AWS Auth ConfigMap
resource "kubernetes_config_map_v1_data" "aws_auth" {
  count = var.manage_aws_auth ? 1 : 0
  
  metadata {
    name      = "aws-auth"
    namespace = "kube-system"
  }
  
  data = {
    mapRoles = yamlencode(concat(
      [
        for group_name, group in var.node_groups : {
          rolearn  = aws_iam_role.node_group[group_name].arn
          username = "system:node:{{EC2PrivateDNSName}}"
          groups   = ["system:bootstrappers", "system:nodes"]
        }
      ],
      var.map_roles
    ))
    
    mapUsers    = yamlencode(var.map_users)
    mapAccounts = yamlencode(var.map_accounts)
  }
  
  depends_on = [aws_eks_cluster.main]
}
\`\`\`

## Advanced Pulumi Implementation

### Multi-Cloud Infrastructure with Pulumi
\`\`\`typescript
// pulumi/infrastructure/core/index.ts
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as azure from "@pulumi/azure-native";
import * as gcp from "@pulumi/gcp";
import * as k8s from "@pulumi/kubernetes";
import { NetworkComponent } from "../../components/network";
import { SecurityComponent } from "../../components/security";
import { MonitoringStack } from "./monitoring";

// Configuration
const config = new pulumi.Config();
const environment = pulumi.getStack();
const projectName = config.require("projectName");
const multiCloud = config.getBoolean("multiCloud") || false;

// Tags for all resources
const commonTags = {
    Environment: environment,
    ManagedBy: "Pulumi",
    Project: projectName,
    CreatedBy: "IaC",
    CostCenter: config.get("costCenter") || "engineering",
};

// AWS Provider Configuration
const awsProvider = new aws.Provider("aws-primary", {
    region: config.get("awsRegion") || "us-east-1",
    defaultTags: {
        tags: commonTags,
    },
});

// Create Network Infrastructure
const network = new NetworkComponent("network", {
    vpcCidr: config.get("vpcCidr") || "10.0.0.0/16",
    availabilityZones: config.getNumber("azCount") || 3,
    enableNatGateway: true,
    singleNatGateway: environment !== "production",
    enableVpcEndpoints: true,
    enableFlowLogs: environment === "production",
    tags: commonTags,
}, { provider: awsProvider });

// Create Security Infrastructure
const security = new SecurityComponent("security", {
    vpcId: network.vpc.id,
    enableWaf: environment === "production",
    enableGuardDuty: true,
    enableSecurityHub: environment === "production",
    enableConfigRules: true,
    tags: commonTags,
}, { provider: awsProvider });

// Create EKS Cluster
const eksCluster = new aws.eks.Cluster("eks-cluster", {
    name: \`\${projectName}-\${environment}\`,
    roleArn: security.eksRole.arn,
    version: config.get("eksVersion") || "1.27",
    vpcConfig: {
        subnetIds: network.privateSubnetIds,
        endpointPrivateAccess: true,
        endpointPublicAccess: environment !== "production",
        publicAccessCidrs: environment !== "production" ? ["0.0.0.0/0"] : [],
        securityGroupIds: [security.eksSecurityGroup.id],
    },
    encryptionConfig: {
        provider: {
            keyArn: security.kmsKey.arn,
        },
        resources: ["secrets"],
    },
    enabledClusterLogTypes: [
        "api",
        "audit",
        "authenticator",
        "controllerManager",
        "scheduler",
    ],
    tags: commonTags,
}, {
    provider: awsProvider,
    dependsOn: [network, security],
});

// Node Groups Configuration
interface NodeGroupConfig {
    name: string;
    instanceTypes: string[];
    desiredSize: number;
    minSize: number;
    maxSize: number;
    labels?: Record<string, string>;
    taints?: aws.types.input.eks.NodeGroupTaint[];
    spotInstance?: boolean;
}

const nodeGroups: NodeGroupConfig[] = [
    {
        name: "system",
        instanceTypes: ["t3.medium"],
        desiredSize: 2,
        minSize: 2,
        maxSize: 4,
        labels: {
            workload: "system",
        },
    },
    {
        name: "application",
        instanceTypes: ["t3.large", "t3.xlarge"],
        desiredSize: 3,
        minSize: 3,
        maxSize: 10,
        labels: {
            workload: "application",
        },
        spotInstance: environment !== "production",
    },
];

// Create Node Groups
const eksNodeGroups = nodeGroups.map(ngConfig => {
    const launchTemplate = new aws.ec2.LaunchTemplate(\`\${ngConfig.name}-lt\`, {
        namePrefix: \`\${eksCluster.name}-\${ngConfig.name}-\`,
        blockDeviceMappings: [{
            deviceName: "/dev/xvda",
            ebs: {
                volumeSize: 100,
                volumeType: "gp3",
                encrypted: true,
                kmsKeyId: security.kmsKey.arn,
                deleteOnTermination: true,
            },
        }],
        metadataOptions: {
            httpEndpoint: "enabled",
            httpTokens: "required",
            httpPutResponseHopLimit: 2,
            instanceMetadataTags: "enabled",
        },
        monitoring: {
            enabled: true,
        },
        networkInterfaces: [{
            associatePublicIpAddress: false,
            deleteOnTermination: true,
            securityGroups: [security.nodeSecurityGroup.id],
        }],
        tagSpecifications: [
            {
                resourceType: "instance",
                tags: {
                    ...commonTags,
                    Name: \`\${eksCluster.name}-\${ngConfig.name}-node\`,
                },
            },
            {
                resourceType: "volume",
                tags: {
                    ...commonTags,
                    Name: \`\${eksCluster.name}-\${ngConfig.name}-volume\`,
                },
            },
        ],
        userData: pulumi.all([eksCluster.endpoint, eksCluster.certificateAuthority, eksCluster.name]).apply(
            ([endpoint, ca, clusterName]) => {
                return Buffer.from(\`#!/bin/bash
/etc/eks/bootstrap.sh \${clusterName} \\
    --b64-cluster-ca '\${ca.data}' \\
    --apiserver-endpoint '\${endpoint}' \\
    --dns-cluster-ip '10.100.0.10' \\
    --kubelet-extra-args '--node-labels=workload=\${ngConfig.labels?.workload || "general"}'
\`).toString("base64");
            }
        ),
        tags: commonTags,
    }, { provider: awsProvider });

    const nodeGroupRole = new aws.iam.Role(\`\${ngConfig.name}-role\`, {
        namePrefix: \`\${eksCluster.name}-\${ngConfig.name}-\`,
        assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
            Service: "ec2.amazonaws.com",
        }),
        tags: commonTags,
    }, { provider: awsProvider });

    // Attach required policies
    const policies = [
        "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy",
        "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy",
        "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly",
        "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore",
    ];

    policies.forEach((policyArn, index) => {
        new aws.iam.RolePolicyAttachment(\`\${ngConfig.name}-policy-\${index}\`, {
            role: nodeGroupRole.name,
            policyArn: policyArn,
        }, { provider: awsProvider });
    });

    return new aws.eks.NodeGroup(\`\${ngConfig.name}-ng\`, {
        clusterName: eksCluster.name,
        nodeGroupName: ngConfig.name,
        nodeRoleArn: nodeGroupRole.arn,
        subnetIds: network.privateSubnetIds,
        instanceTypes: ngConfig.instanceTypes,
        capacityType: ngConfig.spotInstance ? "SPOT" : "ON_DEMAND",
        scalingConfig: {
            desiredSize: ngConfig.desiredSize,
            maxSize: ngConfig.maxSize,
            minSize: ngConfig.minSize,
        },
        updateConfig: {
            maxUnavailablePercentage: 33,
        },
        launchTemplate: {
            id: launchTemplate.id,
            version: launchTemplate.latestVersion.apply(v => v.toString()),
        },
        labels: ngConfig.labels,
        taints: ngConfig.taints,
        tags: {
            ...commonTags,
            Name: \`\${eksCluster.name}-\${ngConfig.name}\`,
        },
    }, {
        provider: awsProvider,
        dependsOn: [eksCluster],
    });
});

// Create Kubernetes Provider
const k8sProvider = new k8s.Provider("k8s-provider", {
    kubeconfig: pulumi.all([
        eksCluster.name,
        eksCluster.endpoint,
        eksCluster.certificateAuthority,
    ]).apply(([clusterName, endpoint, ca]) => {
        const cluster = {
            server: endpoint,
            "certificate-authority-data": ca.data,
        };
        const user = {
            exec: {
                apiVersion: "client.authentication.k8s.io/v1beta1",
                command: "aws",
                args: [
                    "eks",
                    "get-token",
                    "--cluster-name",
                    clusterName,
                ],
            },
        };
        const context = {
            cluster: clusterName,
            user: clusterName,
        };
        return JSON.stringify({
            apiVersion: "v1",
            clusters: [{ cluster, name: clusterName }],
            contexts: [{ context, name: clusterName }],
            "current-context": clusterName,
            kind: "Config",
            users: [{ name: clusterName, user }],
        });
    }),
});

// Install EKS Add-ons
const addons = [
    { name: "vpc-cni", version: "v1.12.6-eksbuild.2" },
    { name: "coredns", version: "v1.10.1-eksbuild.1" },
    { name: "kube-proxy", version: "v1.27.3-eksbuild.1" },
    { name: "aws-ebs-csi-driver", version: "v1.20.0-eksbuild.1" },
];

const eksAddons = addons.map(addon => {
    return new aws.eks.Addon(\`\${addon.name}-addon\`, {
        clusterName: eksCluster.name,
        addonName: addon.name,
        addonVersion: addon.version,
        resolveConflicts: "OVERWRITE",
        tags: commonTags,
    }, {
        provider: awsProvider,
        dependsOn: [eksCluster, ...eksNodeGroups],
    });
});

// Install Monitoring Stack
const monitoring = new MonitoringStack("monitoring", {
    clusterName: eksCluster.name,
    namespace: "monitoring",
    enablePrometheus: true,
    enableGrafana: true,
    enableAlertManager: true,
    retentionDays: environment === "production" ? 30 : 7,
    storageClass: "gp3",
    ingress: {
        enabled: true,
        domain: config.get("domain") || "example.com",
        certificateArn: config.get("certificateArn"),
    },
}, {
    provider: k8sProvider,
    dependsOn: [eksAddons],
});

// Multi-Cloud Resources (if enabled)
if (multiCloud) {
    // Azure Resources
    const azureResourceGroup = new azure.resources.ResourceGroup("azure-rg", {
        resourceGroupName: \`\${projectName}-\${environment}-rg\`,
        location: config.get("azureLocation") || "eastus",
        tags: commonTags,
    });

    const azureVnet = new azure.network.VirtualNetwork("azure-vnet", {
        virtualNetworkName: \`\${projectName}-\${environment}-vnet\`,
        resourceGroupName: azureResourceGroup.name,
        location: azureResourceGroup.location,
        addressSpace: {
            addressPrefixes: ["10.1.0.0/16"],
        },
        tags: commonTags,
    });

    // GCP Resources
    const gcpProject = new gcp.organizations.Project("gcp-project", {
        projectId: \`\${projectName}-\${environment}\`.substring(0, 30),
        name: \`\${projectName}-\${environment}\`,
        labels: commonTags,
    });

    const gcpNetwork = new gcp.compute.Network("gcp-network", {
        name: \`\${projectName}-\${environment}-network\`,
        autoCreateSubnetworks: false,
        project: gcpProject.projectId,
    });

    // Cross-Cloud VPN Connections
    const vpnConnections = [
        {
            name: "aws-to-azure",
            source: "aws",
            destination: "azure",
        },
        {
            name: "aws-to-gcp",
            source: "aws",
            destination: "gcp",
        },
    ];

    // Export multi-cloud resources
    pulumi.export("azureResourceGroup", azureResourceGroup.name);
    pulumi.export("azureVnetId", azureVnet.id);
    pulumi.export("gcpProjectId", gcpProject.projectId);
    pulumi.export("gcpNetworkId", gcpNetwork.id);
}

// Component Resource for Network
class NetworkComponent extends pulumi.ComponentResource {
    public readonly vpc: aws.ec2.Vpc;
    public readonly publicSubnetIds: pulumi.Output<string>[];
    public readonly privateSubnetIds: pulumi.Output<string>[];
    public readonly databaseSubnetIds: pulumi.Output<string>[];

    constructor(name: string, args: NetworkComponentArgs, opts?: pulumi.ComponentResourceOptions) {
        super("custom:infrastructure:Network", name, {}, opts);

        const cidrBlocks = this.calculateSubnets(args.vpcCidr, args.availabilityZones);

        // Create VPC
        this.vpc = new aws.ec2.Vpc(\`\${name}-vpc\`, {
            cidrBlock: args.vpcCidr,
            enableDnsHostnames: true,
            enableDnsSupport: true,
            tags: {
                ...args.tags,
                Name: \`\${name}-vpc\`,
            },
        }, { parent: this });

        // Get availability zones
        const azs = aws.getAvailabilityZones({
            state: "available",
        });

        // Create subnets
        this.publicSubnetIds = [];
        this.privateSubnetIds = [];
        this.databaseSubnetIds = [];

        for (let i = 0; i < args.availabilityZones; i++) {
            const az = azs.then(z => z.names[i]);

            // Public subnet
            const publicSubnet = new aws.ec2.Subnet(\`\${name}-public-\${i}\`, {
                vpcId: this.vpc.id,
                cidrBlock: cidrBlocks.public[i],
                availabilityZone: az,
                mapPublicIpOnLaunch: true,
                tags: {
                    ...args.tags,
                    Name: \`\${name}-public-\${i}\`,
                    Type: "public",
                    "kubernetes.io/role/elb": "1",
                },
            }, { parent: this });
            this.publicSubnetIds.push(publicSubnet.id);

            // Private subnet
            const privateSubnet = new aws.ec2.Subnet(\`\${name}-private-\${i}\`, {
                vpcId: this.vpc.id,
                cidrBlock: cidrBlocks.private[i],
                availabilityZone: az,
                tags: {
                    ...args.tags,
                    Name: \`\${name}-private-\${i}\`,
                    Type: "private",
                    "kubernetes.io/role/internal-elb": "1",
                },
            }, { parent: this });
            this.privateSubnetIds.push(privateSubnet.id);

            // Database subnet
            const databaseSubnet = new aws.ec2.Subnet(\`\${name}-database-\${i}\`, {
                vpcId: this.vpc.id,
                cidrBlock: cidrBlocks.database[i],
                availabilityZone: az,
                tags: {
                    ...args.tags,
                    Name: \`\${name}-database-\${i}\`,
                    Type: "database",
                },
            }, { parent: this });
            this.databaseSubnetIds.push(databaseSubnet.id);
        }

        // Create Internet Gateway
        const igw = new aws.ec2.InternetGateway(\`\${name}-igw\`, {
            vpcId: this.vpc.id,
            tags: {
                ...args.tags,
                Name: \`\${name}-igw\`,
            },
        }, { parent: this });

        // Create NAT Gateways
        if (args.enableNatGateway) {
            const natCount = args.singleNatGateway ? 1 : args.availabilityZones;
            
            for (let i = 0; i < natCount; i++) {
                const eip = new aws.ec2.Eip(\`\${name}-nat-eip-\${i}\`, {
                    domain: "vpc",
                    tags: {
                        ...args.tags,
                        Name: \`\${name}-nat-eip-\${i}\`,
                    },
                }, { parent: this });

                const natGateway = new aws.ec2.NatGateway(\`\${name}-nat-\${i}\`, {
                    allocationId: eip.id,
                    subnetId: this.publicSubnetIds[args.singleNatGateway ? 0 : i],
                    tags: {
                        ...args.tags,
                        Name: \`\${name}-nat-\${i}\`,
                    },
                }, { parent: this, dependsOn: [igw] });
            }
        }

        // VPC Endpoints
        if (args.enableVpcEndpoints) {
            this.createVpcEndpoints(args.tags);
        }

        // Flow Logs
        if (args.enableFlowLogs) {
            this.createFlowLogs(args.tags);
        }

        this.registerOutputs({
            vpc: this.vpc,
            publicSubnetIds: this.publicSubnetIds,
            privateSubnetIds: this.privateSubnetIds,
            databaseSubnetIds: this.databaseSubnetIds,
        });
    }

    private calculateSubnets(vpcCidr: string, azCount: number): {
        public: string[];
        private: string[];
        database: string[];
    } {
        // Simplified subnet calculation
        const baseOctet = parseInt(vpcCidr.split('.')[2]);
        const subnets = {
            public: [] as string[],
            private: [] as string[],
            database: [] as string[],
        };

        for (let i = 0; i < azCount; i++) {
            subnets.public.push(\`10.0.\${baseOctet + i}.0/24\`);
            subnets.private.push(\`10.0.\${baseOctet + 10 + i}.0/24\`);
            subnets.database.push(\`10.0.\${baseOctet + 20 + i}.0/24\`);
        }

        return subnets;
    }

    private createVpcEndpoints(tags: Record<string, string>): void {
        // S3 endpoint
        new aws.ec2.VpcEndpoint(\`\${this.getName()}-s3-endpoint\`, {
            vpcId: this.vpc.id,
            serviceName: \`com.amazonaws.\${aws.getRegion().then(r => r.name)}.s3\`,
            vpcEndpointType: "Gateway",
            routeTableIds: [], // Add route tables here
            tags: {
                ...tags,
                Name: \`\${this.getName()}-s3-endpoint\`,
            },
        }, { parent: this });

        // Interface endpoints
        const interfaceEndpoints = [
            "ec2",
            "ecr.api",
            "ecr.dkr",
            "logs",
            "sts",
            "elasticloadbalancing",
            "autoscaling",
        ];

        const endpointSecurityGroup = new aws.ec2.SecurityGroup(\`\${this.getName()}-endpoint-sg\`, {
            vpcId: this.vpc.id,
            description: "Security group for VPC endpoints",
            ingress: [{
                protocol: "tcp",
                fromPort: 443,
                toPort: 443,
                cidrBlocks: [this.vpc.cidrBlock],
            }],
            egress: [{
                protocol: "-1",
                fromPort: 0,
                toPort: 0,
                cidrBlocks: ["0.0.0.0/0"],
            }],
            tags: {
                ...tags,
                Name: \`\${this.getName()}-endpoint-sg\`,
            },
        }, { parent: this });

        interfaceEndpoints.forEach(endpoint => {
            new aws.ec2.VpcEndpoint(\`\${this.getName()}-\${endpoint}-endpoint\`, {
                vpcId: this.vpc.id,
                serviceName: \`com.amazonaws.\${aws.getRegion().then(r => r.name)}.\${endpoint}\`,
                vpcEndpointType: "Interface",
                privateDnsEnabled: true,
                subnetIds: this.privateSubnetIds,
                securityGroupIds: [endpointSecurityGroup.id],
                tags: {
                    ...tags,
                    Name: \`\${this.getName()}-\${endpoint}-endpoint\`,
                },
            }, { parent: this });
        });
    }

    private createFlowLogs(tags: Record<string, string>): void {
        const flowLogRole = new aws.iam.Role(\`\${this.getName()}-flow-log-role\`, {
            assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
                Service: "vpc-flow-logs.amazonaws.com",
            }),
            tags: tags,
        }, { parent: this });

        const flowLogPolicy = new aws.iam.RolePolicy(\`\${this.getName()}-flow-log-policy\`, {
            role: flowLogRole.id,
            policy: {
                Version: "2012-10-17",
                Statement: [{
                    Effect: "Allow",
                    Action: [
                        "logs:CreateLogGroup",
                        "logs:CreateLogStream",
                        "logs:PutLogEvents",
                        "logs:DescribeLogGroups",
                        "logs:DescribeLogStreams",
                    ],
                    Resource: "*",
                }],
            },
        }, { parent: this });

        const flowLogGroup = new aws.cloudwatch.LogGroup(\`\${this.getName()}-flow-logs\`, {
            name: \`/aws/vpc/flowlogs/\${this.getName()}\`,
            retentionInDays: 30,
            tags: tags,
        }, { parent: this });

        new aws.ec2.FlowLog(\`\${this.getName()}-flow-log\`, {
            iamRoleArn: flowLogRole.arn,
            logDestinationType: "cloud-watch-logs",
            logGroupName: flowLogGroup.name,
            trafficType: "ALL",
            vpcId: this.vpc.id,
            tags: {
                ...tags,
                Name: \`\${this.getName()}-flow-log\`,
            },
        }, { parent: this, dependsOn: [flowLogPolicy] });
    }
}

interface NetworkComponentArgs {
    vpcCidr: string;
    availabilityZones: number;
    enableNatGateway: boolean;
    singleNatGateway: boolean;
    enableVpcEndpoints: boolean;
    enableFlowLogs: boolean;
    tags: Record<string, string>;
}

// Exports
export const clusterName = eksCluster.name;
export const clusterEndpoint = eksCluster.endpoint;
export const clusterCertificateAuthority = eksCluster.certificateAuthority;
export const vpcId = network.vpc.id;
export const publicSubnetIds = network.publicSubnetIds;
export const privateSubnetIds = network.privateSubnetIds;
export const databaseSubnetIds = network.databaseSubnetIds;
export const monitoringEndpoints = {
    prometheus: monitoring.prometheusEndpoint,
    grafana: monitoring.grafanaEndpoint,
    alertManager: monitoring.alertManagerEndpoint,
};
\`\`\`

## Policy as Code with OPA

### Terraform Policy Enforcement
\`\`\`rego
# terraform/policies/opa/terraform.rego
package terraform.security

import future.keywords.contains
import future.keywords.if
import future.keywords.in

# Deny any resource without required tags
deny[msg] {
    resource := input.planned_values.root_module.resources[_]
    required_tags := {"Environment", "Project", "Owner", "CostCenter"}
    missing_tags := required_tags - {tag | resource.values.tags[tag]}
    count(missing_tags) > 0
    msg := sprintf("Resource %s is missing required tags: %v", [resource.address, missing_tags])
}

# Deny public S3 buckets
deny[msg] {
    resource := input.planned_values.root_module.resources[_]
    resource.type == "aws_s3_bucket"
    resource.values.acl == "public-read"
    msg := sprintf("S3 bucket %s has public-read ACL", [resource.address])
}

deny[msg] {
    resource := input.planned_values.root_module.resources[_]
    resource.type == "aws_s3_bucket_public_access_block"
    resource.values.block_public_acls == false
    msg := sprintf("S3 bucket %s allows public ACLs", [resource.address])
}

# Deny unencrypted storage
deny[msg] {
    resource := input.planned_values.root_module.resources[_]
    resource.type == "aws_s3_bucket"
    not resource.values.server_side_encryption_configuration
    msg := sprintf("S3 bucket %s is not encrypted", [resource.address])
}

deny[msg] {
    resource := input.planned_values.root_module.resources[_]
    resource.type == "aws_ebs_volume"
    resource.values.encrypted == false
    msg := sprintf("EBS volume %s is not encrypted", [resource.address])
}

deny[msg] {
    resource := input.planned_values.root_module.resources[_]
    resource.type == "aws_rds_instance"
    resource.values.storage_encrypted == false
    msg := sprintf("RDS instance %s is not encrypted", [resource.address])
}

# Deny weak instance types for production
deny[msg] {
    resource := input.planned_values.root_module.resources[_]
    resource.type == "aws_instance"
    resource.values.tags.Environment == "production"
    startswith(resource.values.instance_type, "t2.")
    msg := sprintf("Instance %s uses t2 instance type in production", [resource.address])
}

# Enforce backup policies
deny[msg] {
    resource := input.planned_values.root_module.resources[_]
    resource.type == "aws_db_instance"
    resource.values.backup_retention_period < 7
    msg := sprintf("RDS instance %s has backup retention less than 7 days", [resource.address])
}

# Cost control policies
deny[msg] {
    resource := input.planned_values.root_module.resources[_]
    resource.type == "aws_instance"
    instance_cost := instance_monthly_cost[resource.values.instance_type]
    instance_cost > 500
    not resource.values.tags.CostApproval
    msg := sprintf("Instance %s costs $%v/month and lacks CostApproval tag", [resource.address, instance_cost])
}

# Instance monthly costs (simplified)
instance_monthly_cost := {
    "t3.micro": 7.5,
    "t3.small": 15,
    "t3.medium": 30,
    "t3.large": 60,
    "t3.xlarge": 120,
    "t3.2xlarge": 240,
    "m5.large": 70,
    "m5.xlarge": 140,
    "m5.2xlarge": 280,
    "m5.4xlarge": 560,
    "c5.large": 62,
    "c5.xlarge": 124,
    "c5.2xlarge": 248,
}

# Network security policies
deny[msg] {
    resource := input.planned_values.root_module.resources[_]
    resource.type == "aws_security_group_rule"
    resource.values.type == "ingress"
    resource.values.from_port == 22
    resource.values.cidr_blocks[_] == "0.0.0.0/0"
    msg := sprintf("Security group rule %s allows SSH from anywhere", [resource.address])
}

deny[msg] {
    resource := input.planned_values.root_module.resources[_]
    resource.type == "aws_security_group_rule"
    resource.values.type == "ingress"
    resource.values.from_port == 3389
    resource.values.cidr_blocks[_] == "0.0.0.0/0"
    msg := sprintf("Security group rule %s allows RDP from anywhere", [resource.address])
}

# IAM policies
deny[msg] {
    resource := input.planned_values.root_module.resources[_]
    resource.type == "aws_iam_policy_document"
    statement := resource.values.statement[_]
    statement.effect == "Allow"
    statement.actions[_] == "*"
    statement.resources[_] == "*"
    msg := sprintf("IAM policy %s grants overly broad permissions", [resource.address])
}

# Compliance checks
deny[msg] {
    resource := input.planned_values.root_module.resources[_]
    resource.type == "aws_s3_bucket"
    not s3_bucket_has_lifecycle_policy(resource.address)
    msg := sprintf("S3 bucket %s lacks lifecycle policy", [resource.address])
}

# Helper functions
s3_bucket_has_lifecycle_policy(bucket_address) {
    lifecycle := input.planned_values.root_module.resources[_]
    lifecycle.type == "aws_s3_bucket_lifecycle_configuration"
    lifecycle.values.bucket == bucket_address
}

# Scoring function for risk assessment
risk_score[resource_address] = score {
    resource := input.planned_values.root_module.resources[_]
    resource_address := resource.address
    
    risks := []
    
    # Add risk factors
    risks := array.concat(risks, ["no_encryption" | not is_encrypted(resource)])
    risks := array.concat(risks, ["public_access" | has_public_access(resource)])
    risks := array.concat(risks, ["no_backup" | not has_backup(resource)])
    risks := array.concat(risks, ["weak_instance" | is_weak_instance(resource)])
    
    score := count(risks) * 25
}

is_encrypted(resource) {
    resource.type == "aws_s3_bucket"
    resource.values.server_side_encryption_configuration
}

is_encrypted(resource) {
    resource.type == "aws_ebs_volume"
    resource.values.encrypted == true
}

is_encrypted(resource) {
    resource.type == "aws_rds_instance"
    resource.values.storage_encrypted == true
}

has_public_access(resource) {
    resource.type == "aws_s3_bucket"
    resource.values.acl == "public-read"
}

has_backup(resource) {
    resource.type == "aws_db_instance"
    resource.values.backup_retention_period >= 7
}

is_weak_instance(resource) {
    resource.type == "aws_instance"
    startswith(resource.values.instance_type, "t2.")
}
\`\`\`

## GitOps with ArgoCD

### ArgoCD Application Configuration
\`\`\`yaml
# gitops/argocd/apps/infrastructure.yaml
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: infrastructure
  namespace: argocd
spec:
  description: Infrastructure applications
  sourceRepos:
  - 'https://github.com/myorg/infrastructure-*'
  destinations:
  - namespace: '*'
    server: https://kubernetes.default.svc
  clusterResourceWhitelist:
  - group: '*'
    kind: '*'
  namespaceResourceWhitelist:
  - group: '*'
    kind: '*'
  roles:
  - name: admin
    policies:
    - p, proj:infrastructure:admin, applications, *, infrastructure/*, allow
    groups:
    - infrastructure-admins
  - name: readonly
    policies:
    - p, proj:infrastructure:readonly, applications, get, infrastructure/*, allow
    groups:
    - infrastructure-developers

---
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: terraform-controller
  namespace: argocd
  finalizers:
  - resources-finalizer.argocd.argoproj.io
spec:
  project: infrastructure
  source:
    repoURL: https://github.com/myorg/infrastructure-gitops
    targetRevision: HEAD
    path: terraform-controller
    helm:
      values: |
        controller:
          image:
            tag: "0.16.0"
          resources:
            requests:
              cpu: 100m
              memory: 128Mi
            limits:
              cpu: 500m
              memory: 512Mi
          metrics:
            enabled: true
          webhook:
            enabled: true
        runner:
          image:
            tag: "0.16.0"
          resources:
            requests:
              cpu: 250m
              memory: 256Mi
            limits:
              cpu: 1000m
              memory: 1Gi
          serviceAccount:
            annotations:
              eks.amazonaws.com/role-arn: arn:aws:iam::123456789012:role/terraform-runner
  destination:
    server: https://kubernetes.default.svc
    namespace: flux-system
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
    - CreateNamespace=true
    retry:
      limit: 5
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m

---
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: crossplane
  namespace: argocd
spec:
  project: infrastructure
  source:
    repoURL: https://charts.crossplane.io/stable
    targetRevision: "1.13.2"
    chart: crossplane
    helm:
      values: |
        replicas: 2
        deploymentStrategy: RollingUpdate
        image:
          repository: crossplane/crossplane
          tag: v1.13.2
        provider:
          packages:
          - xpkg.upbound.io/crossplane-contrib/provider-aws:v0.44.0
          - xpkg.upbound.io/crossplane-contrib/provider-azure:v0.20.0
          - xpkg.upbound.io/crossplane-contrib/provider-gcp:v0.22.0
        resourcesCrossplane:
          limits:
            cpu: 1000m
            memory: 2Gi
          requests:
            cpu: 100m
            memory: 256Mi
        metrics:
          enabled: true
        webhooks:
          enabled: true
  destination:
    server: https://kubernetes.default.svc
    namespace: crossplane-system
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
    - CreateNamespace=true

---
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: external-secrets
  namespace: argocd
spec:
  project: infrastructure
  source:
    repoURL: https://charts.external-secrets.io
    targetRevision: "0.9.5"
    chart: external-secrets
    helm:
      values: |
        replicaCount: 2
        installCRDs: true
        webhook:
          replicaCount: 2
        certController:
          replicaCount: 1
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 500m
            memory: 512Mi
        serviceMonitor:
          enabled: true
        prometheus:
          enabled: true
  destination:
    server: https://kubernetes.default.svc
    namespace: external-secrets
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
    - CreateNamespace=true
\`\`\`

## CI/CD Pipeline for IaC

### GitHub Actions Workflow
\`\`\`yaml
# .github/workflows/terraform-deploy.yml
name: Terraform Infrastructure Deployment

on:
  push:
    branches:
      - main
      - develop
    paths:
      - 'terraform/**'
      - '.github/workflows/terraform-deploy.yml'
  pull_request:
    branches:
      - main
    paths:
      - 'terraform/**'

env:
  TF_VERSION: "1.5.7"
  TF_IN_AUTOMATION: true
  AWS_DEFAULT_REGION: us-east-1
  
permissions:
  contents: read
  pull-requests: write
  id-token: write # For OIDC

jobs:
  terraform-check:
    name: Terraform Validation
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Terraform
      uses: hashicorp/setup-terraform@v2
      with:
        terraform_version: ${{ env.TF_VERSION }}
        
    - name: Configure AWS Credentials
      uses: aws-actions/configure-aws-credentials@v4
      with:
        role-to-assume: ${{ secrets.AWS_TERRAFORM_ROLE_ARN }}
        aws-region: ${{ env.AWS_DEFAULT_REGION }}
        
    - name: Terraform Format Check
      id: fmt
      run: terraform fmt -check -recursive
      continue-on-error: true
      
    - name: Terraform Init
      id: init
      run: |
        cd terraform/environments/${{ github.ref_name == 'main' && 'production' || 'staging' }}
        terraform init -no-color
        
    - name: Terraform Validate
      id: validate
      run: |
        cd terraform/environments/${{ github.ref_name == 'main' && 'production' || 'staging' }}
        terraform validate -no-color
        
    - name: TFLint
      uses: terraform-linters/setup-tflint@v3
      with:
        tflint_version: latest
        
    - name: Run TFLint
      run: |
        cd terraform
        tflint --init
        tflint --recursive
        
    - name: Terraform Security Scan
      uses: aquasecurity/tfsec-action@v1.0.0
      with:
        working_directory: terraform
        
    - name: Checkov Security Scan
      uses: bridgecrewio/checkov-action@master
      with:
        directory: terraform
        framework: terraform
        output_format: sarif
        output_file_path: checkov.sarif
        
    - name: Upload Checkov results
      uses: github/codeql-action/upload-sarif@v2
      if: always()
      with:
        sarif_file: checkov.sarif
        
    - name: Comment PR
      uses: actions/github-script@v6
      if: github.event_name == 'pull_request'
      env:
        FORMAT: ${{ steps.fmt.outcome }}
        INIT: ${{ steps.init.outcome }}
        VALIDATE: ${{ steps.validate.outcome }}
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
        script: |
          const output = \`#### Terraform Validation Results
          * Format: \${{ env.FORMAT }}
          * Initialization: \${{ env.INIT }}
          * Validation: \${{ env.VALIDATE }}
          
          *Pushed by: @${{ github.actor }}, Action: ${{ github.event_name }}*\`;
          
          github.rest.issues.createComment({
            issue_number: context.issue.number,
            owner: context.repo.owner,
            repo: context.repo.repo,
            body: output
          })

  terraform-plan:
    name: Terraform Plan
    runs-on: ubuntu-latest
    needs: terraform-check
    if: github.event_name == 'pull_request' || github.ref == 'refs/heads/develop'
    
    strategy:
      matrix:
        environment: [staging, production]
        
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Terraform
      uses: hashicorp/setup-terraform@v2
      with:
        terraform_version: ${{ env.TF_VERSION }}
        
    - name: Configure AWS Credentials
      uses: aws-actions/configure-aws-credentials@v4
      with:
        role-to-assume: ${{ secrets.AWS_TERRAFORM_ROLE_ARN }}
        aws-region: ${{ env.AWS_DEFAULT_REGION }}
        
    - name: Terraform Init
      run: |
        cd terraform/environments/${{ matrix.environment }}
        terraform init -no-color
        
    - name: Terraform Plan
      id: plan
      run: |
        cd terraform/environments/${{ matrix.environment }}
        terraform plan -no-color -out=tfplan
        terraform show -no-color -json tfplan > plan.json
        
    - name: OPA Policy Check
      run: |
        cd terraform/environments/${{ matrix.environment }}
        opa eval -d ../../policies/opa/terraform.rego -i plan.json "data.terraform.security.deny[x]"
        
    - name: Cost Estimation
      uses: infracost/infracost-action@v2
      with:
        path: terraform/environments/${{ matrix.environment }}
        api_key: ${{ secrets.INFRACOST_API_KEY }}
        
    - name: Upload Plan
      uses: actions/upload-artifact@v3
      with:
        name: tfplan-${{ matrix.environment }}
        path: terraform/environments/${{ matrix.environment }}/tfplan
        
    - name: Comment Plan
      uses: actions/github-script@v6
      if: github.event_name == 'pull_request'
      env:
        PLAN: ${{ steps.plan.outputs.stdout }}
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
        script: |
          const output = \`#### Terraform Plan for ${{ matrix.environment }}
          \\\`\\\`\\\`terraform
          ${{ env.PLAN }}
          \\\`\\\`\\\`
          
          *Pushed by: @${{ github.actor }}, Action: ${{ github.event_name }}*\`;
          
          github.rest.issues.createComment({
            issue_number: context.issue.number,
            owner: context.repo.owner,
            repo: context.repo.repo,
            body: output
          })

  terraform-apply:
    name: Terraform Apply
    runs-on: ubuntu-latest
    needs: terraform-plan
    if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/develop'
    environment:
      name: ${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
      
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Terraform
      uses: hashicorp/setup-terraform@v2
      with:
        terraform_version: ${{ env.TF_VERSION }}
        
    - name: Configure AWS Credentials
      uses: aws-actions/configure-aws-credentials@v4
      with:
        role-to-assume: ${{ secrets.AWS_TERRAFORM_ROLE_ARN }}
        aws-region: ${{ env.AWS_DEFAULT_REGION }}
        
    - name: Download Plan
      uses: actions/download-artifact@v3
      with:
        name: tfplan-${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
        path: terraform/environments/${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
        
    - name: Terraform Apply
      run: |
        cd terraform/environments/${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
        terraform init -no-color
        terraform apply -no-color -auto-approve tfplan
        
    - name: Terraform Output
      id: output
      run: |
        cd terraform/environments/${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
        terraform output -json > outputs.json
        
    - name: Upload Outputs
      uses: actions/upload-artifact@v3
      with:
        name: terraform-outputs-${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
        path: terraform/environments/${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}/outputs.json
        
    - name: Update Infrastructure Documentation
      run: |
        cd terraform
        terraform-docs markdown table . > ../docs/terraform-modules.md
        
    - name: Drift Detection Schedule
      uses: actions/github-script@v6
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
        script: |
          github.rest.actions.createWorkflowDispatch({
            owner: context.repo.owner,
            repo: context.repo.repo,
            workflow_id: 'drift-detection.yml',
            ref: 'main',
            inputs: {
              environment: '${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}'
            }
          })

  post-deployment:
    name: Post Deployment Tasks
    runs-on: ubuntu-latest
    needs: terraform-apply
    if: success()
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Download Outputs
      uses: actions/download-artifact@v3
      with:
        name: terraform-outputs-${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
        path: outputs
        
    - name: Configure kubectl
      run: |
        aws eks update-kubeconfig \
          --name $(jq -r '.cluster_name.value' outputs/outputs.json) \
          --region ${{ env.AWS_DEFAULT_REGION }}
          
    - name: Deploy Initial Resources
      run: |
        kubectl apply -f gitops/argocd/apps/
        
    - name: Health Check
      run: |
        kubectl wait --for=condition=ready --timeout=300s \
          -n argocd pod -l app.kubernetes.io/name=argocd-server
          
    - name: Notify Success
      uses: 8398a7/action-slack@v3
      with:
        status: success
        text: |
          Infrastructure deployment successful!
          Environment: ${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
          Deployed by: ${{ github.actor }}
        webhook_url: ${{ secrets.SLACK_WEBHOOK }}
        
    - name: Create Deployment Record
      uses: actions/github-script@v6
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
        script: |
          github.rest.repos.createDeployment({
            owner: context.repo.owner,
            repo: context.repo.repo,
            ref: context.sha,
            environment: '${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}',
            description: 'Infrastructure deployment',
            auto_merge: false,
            required_contexts: [],
            production_environment: ${{ github.ref == 'refs/heads/main' }}
          })
\`\`\`

## Drift Detection and Remediation

### Automated Drift Detection Script
\`\`\`python
#!/usr/bin/env python3
# automation/drift-detection/terraform-drift.py
import json
import subprocess
import sys
import os
import boto3
import logging
from datetime import datetime
from typing import Dict, List, Any, Tuple
import requests

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class TerraformDriftDetector:
    def __init__(self, environment: str, state_bucket: str, state_key: str):
        self.environment = environment
        self.state_bucket = state_bucket
        self.state_key = state_key
        self.s3_client = boto3.client('s3')
        self.drift_report = {
            'timestamp': datetime.now().isoformat(),
            'environment': environment,
            'resources_checked': 0,
            'resources_with_drift': 0,
            'drift_details': []
        }
        
    def run_terraform_plan(self, working_dir: str) -> Tuple[bool, str]:
        """Run terraform plan and check for drift"""
        try:
            # Initialize Terraform
            logger.info(f"Initializing Terraform in {working_dir}")
            init_cmd = ["terraform", "init", "-input=false", "-no-color"]
            subprocess.run(init_cmd, cwd=working_dir, check=True, capture_output=True)
            
            # Run plan
            logger.info("Running terraform plan to detect drift")
            plan_cmd = ["terraform", "plan", "-detailed-exitcode", "-input=false", "-no-color", "-json"]
            result = subprocess.run(plan_cmd, cwd=working_dir, capture_output=True, text=True)
            
            # Exit codes: 0 = no changes, 1 = error, 2 = changes present
            if result.returncode == 0:
                logger.info("No drift detected")
                return False, ""
            elif result.returncode == 2:
                logger.warning("Drift detected in infrastructure")
                return True, result.stdout
            else:
                logger.error(f"Error running terraform plan: {result.stderr}")
                raise Exception(f"Terraform plan failed: {result.stderr}")
                
        except Exception as e:
            logger.error(f"Error during drift detection: {str(e)}")
            raise
            
    def parse_plan_output(self, plan_output: str) -> List[Dict[str, Any]]:
        """Parse terraform plan JSON output"""
        drift_items = []
        
        for line in plan_output.strip().split('\n'):
            try:
                plan_event = json.loads(line)
                
                if plan_event.get('@level') == 'info' and 'change' in plan_event:
                    change = plan_event['change']
                    resource = change.get('resource', {})
                    
                    if change['action'] in ['update', 'delete', 'create']:
                        drift_item = {
                            'resource_type': resource.get('resource_type'),
                            'resource_name': resource.get('resource_name'),
                            'resource_address': resource.get('resource_address'),
                            'action': change['action'],
                            'before': change.get('before'),
                            'after': change.get('after')
                        }
                        drift_items.append(drift_item)
                        
            except json.JSONDecodeError:
                continue
                
        return drift_items
        
    def analyze_drift(self, drift_items: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Analyze drift and categorize by severity"""
        analysis = {
            'critical': [],
            'high': [],
            'medium': [],
            'low': []
        }
        
        critical_resources = ['aws_iam_role', 'aws_iam_policy', 'aws_security_group', 'aws_s3_bucket_public_access_block']
        high_priority_resources = ['aws_instance', 'aws_db_instance', 'aws_eks_cluster']
        
        for item in drift_items:
            resource_type = item.get('resource_type', '')
            
            if resource_type in critical_resources:
                analysis['critical'].append(item)
            elif resource_type in high_priority_resources:
                analysis['high'].append(item)
            elif item['action'] == 'delete':
                analysis['high'].append(item)
            elif item['action'] == 'create':
                analysis['medium'].append(item)
            else:
                analysis['low'].append(item)
                
        return analysis
        
    def generate_remediation_plan(self, drift_analysis: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Generate remediation recommendations"""
        remediation_plans = []
        
        for severity in ['critical', 'high', 'medium', 'low']:
            for drift_item in drift_analysis.get(severity, []):
                plan = {
                    'severity': severity,
                    'resource': drift_item['resource_address'],
                    'action': drift_item['action'],
                    'recommendation': self.get_remediation_recommendation(drift_item, severity)
                }
                remediation_plans.append(plan)
                
        return remediation_plans
        
    def get_remediation_recommendation(self, drift_item: Dict[str, Any], severity: str) -> str:
        """Get specific remediation recommendation based on drift type"""
        action = drift_item['action']
        resource_type = drift_item.get('resource_type', '')
        
        if severity == 'critical':
            if action == 'delete':
                return "IMMEDIATE ACTION: Critical resource will be deleted. Review and apply immediately or update code."
            elif action == 'update':
                return "URGENT: Critical security resource modified. Review changes and apply within 24 hours."
                
        if action == 'delete':
            return f"Resource {resource_type} will be deleted. Verify this is intentional before applying."
        elif action == 'create':
            return f"New {resource_type} detected in state. Update Terraform code to match actual state."
        else:
            return f"Configuration drift in {resource_type}. Review and apply changes or update configuration."
            
    def store_drift_report(self, report: Dict[str, Any]) -> None:
        """Store drift report in S3"""
        try:
            report_key = f"drift-reports/{self.environment}/{datetime.now().strftime('%Y/%m/%d')}/drift-report-{datetime.now().strftime('%H%M%S')}.json"
            
            self.s3_client.put_object(
                Bucket=self.state_bucket,
                Key=report_key,
                Body=json.dumps(report, indent=2),
                ContentType='application/json'
            )
            
            logger.info(f"Drift report stored at s3://{self.state_bucket}/{report_key}")
            
        except Exception as e:
            logger.error(f"Failed to store drift report: {str(e)}")
            
    def send_notifications(self, has_drift: bool, drift_analysis: Dict[str, Any]) -> None:
        """Send notifications about drift detection results"""
        if not has_drift:
            logger.info("No notifications needed - no drift detected")
            return
            
        # Determine notification urgency
        if drift_analysis['critical']:
            self.send_critical_alert(drift_analysis)
        elif drift_analysis['high']:
            self.send_high_priority_notification(drift_analysis)
        else:
            self.send_standard_notification(drift_analysis)
            
    def send_critical_alert(self, drift_analysis: Dict[str, Any]) -> None:
        """Send critical alerts for security-related drift"""
        webhook_url = os.environ.get('SLACK_CRITICAL_WEBHOOK')
        if not webhook_url:
            logger.warning("No critical webhook configured")
            return
            
        message = {
            "text": f"🚨 CRITICAL Infrastructure Drift Detected in {self.environment}!",
            "attachments": [{
                "color": "danger",
                "fields": [
                    {
                        "title": "Critical Resources Affected",
                        "value": len(drift_analysis['critical']),
                        "short": True
                    },
                    {
                        "title": "Environment",
                        "value": self.environment,
                        "short": True
                    },
                    {
                        "title": "Affected Resources",
                        "value": "\n".join([item['resource_address'] for item in drift_analysis['critical'][:5]])
                    }
                ]
            }]
        }
        
        try:
            response = requests.post(webhook_url, json=message)
            response.raise_for_status()
            logger.info("Critical alert sent successfully")
        except Exception as e:
            logger.error(f"Failed to send critical alert: {str(e)}")
            
    def run(self, working_dir: str) -> Dict[str, Any]:
        """Main drift detection workflow"""
        try:
            # Run terraform plan
            has_drift, plan_output = self.run_terraform_plan(working_dir)
            
            if has_drift:
                # Parse and analyze drift
                drift_items = self.parse_plan_output(plan_output)
                self.drift_report['resources_checked'] = len(drift_items)
                self.drift_report['resources_with_drift'] = len([d for d in drift_items if d['action'] != 'no-op'])
                
                # Analyze drift severity
                drift_analysis = self.analyze_drift(drift_items)
                self.drift_report['drift_analysis'] = drift_analysis
                
                # Generate remediation plan
                remediation_plans = self.generate_remediation_plan(drift_analysis)
                self.drift_report['remediation_plans'] = remediation_plans
                
                # Send notifications
                self.send_notifications(True, drift_analysis)
            else:
                self.drift_report['drift_analysis'] = {
                    'critical': [],
                    'high': [],
                    'medium': [],
                    'low': []
                }
                
            # Store report
            self.store_drift_report(self.drift_report)
            
            return self.drift_report
            
        except Exception as e:
            logger.error(f"Drift detection failed: {str(e)}")
            self.drift_report['error'] = str(e)
            self.store_drift_report(self.drift_report)
            raise

def main():
    """Main entry point"""
    environment = os.environ.get('ENVIRONMENT', 'staging')
    state_bucket = os.environ.get('TF_STATE_BUCKET')
    state_key = os.environ.get('TF_STATE_KEY')
    working_dir = os.environ.get('TF_WORKING_DIR', './terraform/environments/' + environment)
    
    if not all([state_bucket, state_key]):
        logger.error("Missing required environment variables: TF_STATE_BUCKET, TF_STATE_KEY")
        sys.exit(1)
        
    detector = TerraformDriftDetector(environment, state_bucket, state_key)
    
    try:
        report = detector.run(working_dir)
        
        # Exit with appropriate code
        if report.get('resources_with_drift', 0) > 0:
            if report['drift_analysis']['critical']:
                sys.exit(2)  # Critical drift
            else:
                sys.exit(1)  # Non-critical drift
        else:
            sys.exit(0)  # No drift
            
    except Exception as e:
        logger.error(f"Drift detection failed: {str(e)}")
        sys.exit(3)  # Error

if __name__ == "__main__":
    main()
\`\`\`

This comprehensive Infrastructure as Code configuration provides enterprise-grade IaC capabilities with multiple tools, GitOps workflows, policy enforcement, and automated management for building and maintaining complex cloud infrastructure at scale.`,
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  }
];