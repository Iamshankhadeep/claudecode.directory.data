import { ClaudeMdConfig } from '../types';

export const dataScienceConfigs: ClaudeMdConfig[] = [
  {
    id: 'jupyter-ml-project',
    title: 'Jupyter ML Project + Python',
    slug: 'jupyter-ml-project-python',
    description: 'Complete machine learning project setup with Jupyter notebooks, data analysis, and model development workflows.',
    category: 'Claude.md Configurations',
    tags: ['python', 'jupyter', 'machine-learning', 'pandas', 'scikit-learn'],
    difficulty: 'INTERMEDIATE',
    language: 'Python',
    framework: 'Jupyter',
    content: `# Claude.md - Jupyter ML Project + Python

## Project Overview

This is a comprehensive machine learning project setup using Jupyter notebooks, pandas for data manipulation, scikit-learn for modeling, and modern Python data science practices.

## Technology Stack

- **Language**: Python 3.9+
- **Environment**: Jupyter Lab/Notebook
- **Data Processing**: Pandas, NumPy
- **Visualization**: Matplotlib, Seaborn, Plotly
- **ML Library**: Scikit-learn, XGBoost
- **Model Deployment**: MLflow, FastAPI
- **Version Control**: DVC (Data Version Control)

## Project Structure

\`\`\`
├── data/
│   ├── raw/             # Original, immutable data
│   ├── interim/         # Intermediate data (cleaned)
│   ├── processed/       # Final datasets for modeling
│   └── external/        # External data sources
├── notebooks/
│   ├── exploratory/     # EDA notebooks
│   ├── modeling/        # Model development
│   └── reporting/       # Final analysis
├── src/
│   ├── data/           # Data processing scripts
│   ├── features/       # Feature engineering
│   ├── models/         # Model training/prediction
│   └── visualization/ # Plotting utilities
├── models/             # Trained model artifacts
├── reports/            # Analysis reports
└── requirements.txt    # Python dependencies
\`\`\`

## Development Guidelines

### Code Style
- Follow PEP 8 style guidelines
- Use type hints for functions
- Document functions with docstrings
- Keep notebooks clean and well-documented
- Use meaningful variable names

### Data Science Workflow
- Start with exploratory data analysis (EDA)
- Follow the CRISP-DM methodology
- Version control data with DVC
- Validate data quality at each step
- Document assumptions and decisions

### Reproducibility
- Set random seeds for reproducible results
- Use environment.yml for dependencies
- Document data sources and preprocessing steps
- Create automated pipelines where possible
- Track experiments with MLflow

## Key Commands

- \`jupyter lab\` - Start Jupyter Lab
- \`jupyter notebook\` - Start Jupyter Notebook
- \`python -m pip install -r requirements.txt\` - Install dependencies
- \`python src/data/make_dataset.py\` - Process raw data
- \`python src/models/train_model.py\` - Train model
- \`mlflow ui\` - View experiment tracking

## Environment Setup

Create a \`requirements.txt\` file:
\`\`\`
# Core data science stack
pandas==2.1.4
numpy==1.24.3
matplotlib==3.7.2
seaborn==0.12.2
plotly==5.17.0

# Machine learning
scikit-learn==1.3.2
xgboost==2.0.2
lightgbm==4.1.0

# Jupyter environment
jupyter==1.0.0
jupyterlab==4.0.9
ipykernel==6.27.1
ipywidgets==8.1.1

# Model tracking and deployment
mlflow==2.8.1
fastapi==0.104.1
uvicorn==0.24.0

# Data version control
dvc==3.30.1

# Utilities
python-dotenv==1.0.0
requests==2.31.0
tqdm==4.66.1
\`\`\`

## Common Patterns

### Data Loading and Exploration
\`\`\`python
# notebooks/exploratory/01_data_exploration.ipynb
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from pathlib import Path
import warnings
warnings.filterwarnings('ignore')

# Set up plotting
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")

# Load data
def load_data(filepath: str) -> pd.DataFrame:
    """Load dataset from CSV file."""
    data_path = Path(filepath)
    if not data_path.exists():
        raise FileNotFoundError(f"Data file not found: {filepath}")
    
    df = pd.read_csv(data_path)
    print(f"Data loaded: {df.shape[0]} rows, {df.shape[1]} columns")
    return df

# Basic data exploration
def explore_data(df: pd.DataFrame) -> None:
    """Perform basic data exploration."""
    print("=== Dataset Overview ===")
    print(f"Shape: {df.shape}")
    print(f"Memory usage: {df.memory_usage(deep=True).sum() / 1024**2:.2f} MB")
    
    print("\\n=== Data Types ===")
    print(df.dtypes.value_counts())
    
    print("\\n=== Missing Values ===")
    missing = df.isnull().sum()
    missing_pct = (missing / len(df)) * 100
    missing_df = pd.DataFrame({
        'Missing Count': missing,
        'Missing %': missing_pct
    })
    print(missing_df[missing_df['Missing Count'] > 0])
    
    print("\\n=== Numerical Summary ===")
    print(df.describe())

# Load and explore data
df = load_data('../data/raw/dataset.csv')
explore_data(df)

# Visualize distributions
def plot_distributions(df: pd.DataFrame, columns: list, figsize: tuple = (15, 10)):
    """Plot distributions for numerical columns."""
    n_cols = len(columns)
    n_rows = (n_cols + 2) // 3
    
    fig, axes = plt.subplots(n_rows, 3, figsize=figsize)
    axes = axes.flatten() if n_rows > 1 else [axes]
    
    for i, col in enumerate(columns):
        if i < len(axes):
            df[col].hist(bins=30, ax=axes[i], alpha=0.7)
            axes[i].set_title(f'Distribution of {col}')
            axes[i].set_xlabel(col)
            axes[i].set_ylabel('Frequency')
    
    # Hide empty subplots
    for i in range(len(columns), len(axes)):
        axes[i].hide()
    
    plt.tight_layout()
    plt.show()

# Plot numerical distributions
numerical_cols = df.select_dtypes(include=[np.number]).columns.tolist()
plot_distributions(df, numerical_cols[:9])  # Plot first 9 numerical columns
\`\`\`

### Feature Engineering
\`\`\`python
# src/features/build_features.py
import pandas as pd
import numpy as np
from sklearn.preprocessing import (
    StandardScaler, 
    MinMaxScaler, 
    LabelEncoder, 
    OneHotEncoder
)
from sklearn.feature_selection import SelectKBest, f_classif
from typing import List, Tuple, Dict, Any

class FeatureEngineer:
    """Feature engineering pipeline for ML projects."""
    
    def __init__(self):
        self.scalers = {}
        self.encoders = {}
        self.feature_selectors = {}
    
    def create_datetime_features(self, df: pd.DataFrame, date_col: str) -> pd.DataFrame:
        """Extract datetime features from date column."""
        df = df.copy()
        df[date_col] = pd.to_datetime(df[date_col])
        
        # Extract datetime components
        df[f'{date_col}_year'] = df[date_col].dt.year
        df[f'{date_col}_month'] = df[date_col].dt.month
        df[f'{date_col}_day'] = df[date_col].dt.day
        df[f'{date_col}_dayofweek'] = df[date_col].dt.dayofweek
        df[f'{date_col}_quarter'] = df[date_col].dt.quarter
        df[f'{date_col}_is_weekend'] = df[date_col].dt.dayofweek.isin([5, 6]).astype(int)
        
        return df
    
    def create_interaction_features(self, df: pd.DataFrame, col_pairs: List[Tuple[str, str]]) -> pd.DataFrame:
        """Create interaction features between column pairs."""
        df = df.copy()
        
        for col1, col2 in col_pairs:
            if col1 in df.columns and col2 in df.columns:
                # Multiplication interaction
                df[f'{col1}_{col2}_mult'] = df[col1] * df[col2]
                
                # Division interaction (avoid division by zero)
                df[f'{col1}_{col2}_div'] = df[col1] / (df[col2] + 1e-8)
                
                # Difference
                df[f'{col1}_{col2}_diff'] = df[col1] - df[col2]
        
        return df
    
    def encode_categorical_features(self, df: pd.DataFrame, categorical_cols: List[str], 
                                  method: str = 'onehot') -> pd.DataFrame:
        """Encode categorical features."""
        df = df.copy()
        
        for col in categorical_cols:
            if col not in df.columns:
                continue
                
            if method == 'onehot':
                encoder = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
                encoded = encoder.fit_transform(df[[col]])
                
                # Create column names
                feature_names = [f'{col}_{val}' for val in encoder.categories_[0]]
                encoded_df = pd.DataFrame(encoded, columns=feature_names, index=df.index)
                
                # Store encoder and merge
                self.encoders[col] = encoder
                df = pd.concat([df.drop(col, axis=1), encoded_df], axis=1)
                
            elif method == 'label':
                encoder = LabelEncoder()
                df[col] = encoder.fit_transform(df[col].astype(str))
                self.encoders[col] = encoder
        
        return df
    
    def scale_numerical_features(self, df: pd.DataFrame, numerical_cols: List[str], 
                                method: str = 'standard') -> pd.DataFrame:
        """Scale numerical features."""
        df = df.copy()
        
        if method == 'standard':
            scaler = StandardScaler()
        elif method == 'minmax':
            scaler = MinMaxScaler()
        else:
            raise ValueError("Method must be 'standard' or 'minmax'")
        
        df[numerical_cols] = scaler.fit_transform(df[numerical_cols])
        self.scalers['numerical'] = scaler
        
        return df
    
    def select_features(self, X: pd.DataFrame, y: pd.Series, k: int = 10) -> pd.DataFrame:
        """Select top k features using univariate selection."""
        selector = SelectKBest(score_func=f_classif, k=k)
        X_selected = selector.fit_transform(X, y)
        
        # Get selected feature names
        selected_features = X.columns[selector.get_support()].tolist()
        self.feature_selectors['univariate'] = selector
        
        return pd.DataFrame(X_selected, columns=selected_features, index=X.index)

# Usage example
def create_features(df: pd.DataFrame) -> pd.DataFrame:
    """Complete feature engineering pipeline."""
    engineer = FeatureEngineer()
    
    # Create datetime features if date column exists
    if 'date' in df.columns:
        df = engineer.create_datetime_features(df, 'date')
    
    # Create interaction features
    numerical_cols = df.select_dtypes(include=[np.number]).columns.tolist()
    if len(numerical_cols) >= 2:
        interactions = [(numerical_cols[i], numerical_cols[i+1]) 
                       for i in range(min(3, len(numerical_cols)-1))]
        df = engineer.create_interaction_features(df, interactions)
    
    # Encode categorical features
    categorical_cols = df.select_dtypes(include=['object']).columns.tolist()
    if categorical_cols:
        df = engineer.encode_categorical_features(df, categorical_cols, method='onehot')
    
    return df, engineer
\`\`\`

### Model Training and Evaluation
\`\`\`python
# src/models/train_model.py
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score
import xgboost as xgb
import mlflow
import mlflow.sklearn
from typing import Dict, Any, Tuple
import joblib
from pathlib import Path

class ModelTrainer:
    """ML model training and evaluation pipeline."""
    
    def __init__(self, experiment_name: str = "ml_experiment"):
        self.models = {}
        self.best_model = None
        self.experiment_name = experiment_name
        mlflow.set_experiment(experiment_name)
    
    def prepare_models(self) -> Dict[str, Any]:
        """Initialize different models for comparison."""
        models = {
            'logistic_regression': LogisticRegression(random_state=42),
            'random_forest': RandomForestClassifier(n_estimators=100, random_state=42),
            'gradient_boosting': GradientBoostingClassifier(random_state=42),
            'xgboost': xgb.XGBClassifier(random_state=42)
        }
        return models
    
    def train_evaluate_model(self, model, X_train: pd.DataFrame, X_test: pd.DataFrame,
                           y_train: pd.Series, y_test: pd.Series, model_name: str) -> Dict[str, float]:
        """Train and evaluate a single model."""
        with mlflow.start_run(run_name=model_name):
            # Train model
            model.fit(X_train, y_train)
            
            # Predictions
            y_pred = model.predict(X_test)
            y_pred_proba = model.predict_proba(X_test)[:, 1] if hasattr(model, 'predict_proba') else None
            
            # Calculate metrics
            accuracy = model.score(X_test, y_test)
            auc_score = roc_auc_score(y_test, y_pred_proba) if y_pred_proba is not None else 0
            
            # Cross-validation
            cv_scores = cross_val_score(model, X_train, y_train, cv=5)
            cv_mean = cv_scores.mean()
            cv_std = cv_scores.std()
            
            # Log metrics
            mlflow.log_metric("accuracy", accuracy)
            mlflow.log_metric("auc_score", auc_score)
            mlflow.log_metric("cv_mean", cv_mean)
            mlflow.log_metric("cv_std", cv_std)
            
            # Log model
            mlflow.sklearn.log_model(model, model_name)
            
            # Print results
            print(f"\\n{model_name.upper()} Results:")
            print(f"Accuracy: {accuracy:.4f}")
            print(f"AUC Score: {auc_score:.4f}")
            print(f"CV Mean: {cv_mean:.4f} (+/- {cv_std * 2:.4f})")
            print("\\nClassification Report:")
            print(classification_report(y_test, y_pred))
            
            return {
                'model': model,
                'accuracy': accuracy,
                'auc_score': auc_score,
                'cv_mean': cv_mean,
                'cv_std': cv_std
            }
    
    def hyperparameter_tuning(self, model, param_grid: Dict[str, list], 
                            X_train: pd.DataFrame, y_train: pd.Series) -> Any:
        """Perform hyperparameter tuning using GridSearchCV."""
        grid_search = GridSearchCV(
            model, param_grid, cv=5, scoring='accuracy', n_jobs=-1, verbose=1
        )
        grid_search.fit(X_train, y_train)
        
        print(f"Best parameters: {grid_search.best_params_}")
        print(f"Best CV score: {grid_search.best_score_:.4f}")
        
        return grid_search.best_estimator_
    
    def train_all_models(self, X_train: pd.DataFrame, X_test: pd.DataFrame,
                        y_train: pd.Series, y_test: pd.Series) -> Dict[str, Dict[str, Any]]:
        """Train and compare multiple models."""
        models = self.prepare_models()
        results = {}
        
        for name, model in models.items():
            print(f"\\nTraining {name}...")
            result = self.train_evaluate_model(model, X_train, X_test, y_train, y_test, name)
            results[name] = result
        
        # Find best model
        best_model_name = max(results.keys(), key=lambda x: results[x]['accuracy'])
        self.best_model = results[best_model_name]['model']
        
        print(f"\\nBest model: {best_model_name} with accuracy: {results[best_model_name]['accuracy']:.4f}")
        
        return results
    
    def save_model(self, model, filepath: str) -> None:
        """Save trained model to disk."""
        Path(filepath).parent.mkdir(parents=True, exist_ok=True)
        joblib.dump(model, filepath)
        print(f"Model saved to {filepath}")

# Usage example
def main():
    """Main training pipeline."""
    # Load processed data
    df = pd.read_csv('../data/processed/features.csv')
    
    # Separate features and target
    X = df.drop('target', axis=1)
    y = df['target']
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    print(f"Training set size: {X_train.shape}")
    print(f"Test set size: {X_test.shape}")
    
    # Train models
    trainer = ModelTrainer("house_price_prediction")
    results = trainer.train_all_models(X_train, X_test, y_train, y_test)
    
    # Save best model
    trainer.save_model(trainer.best_model, '../models/best_model.joblib')
    
    return results

if __name__ == "__main__":
    results = main()
\`\`\`

### Model Deployment
\`\`\`python
# src/models/predict_model.py
import joblib
import pandas as pd
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load trained model
model = joblib.load('../models/best_model.joblib')

# FastAPI app
app = FastAPI(title="ML Model API", version="1.0.0")

class PredictionInput(BaseModel):
    features: List[float]

class PredictionOutput(BaseModel):
    prediction: float
    probability: List[float]

@app.post("/predict", response_model=PredictionOutput)
async def predict(input_data: PredictionInput):
    """Make prediction using trained model."""
    try:
        # Convert input to numpy array
        features = np.array(input_data.features).reshape(1, -1)
        
        # Make prediction
        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0].tolist()
        
        logger.info(f"Prediction made: {prediction}")
        
        return PredictionOutput(
            prediction=float(prediction),
            probability=probability
        )
    
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}

# Run with: uvicorn predict_model:app --reload
\`\`\`

## Data Version Control

- Use DVC for data versioning
- Track large datasets and model artifacts
- Create reproducible data pipelines
- Share data across team members
- Maintain data lineage

## Model Tracking

- Use MLflow for experiment tracking
- Log hyperparameters and metrics
- Compare model performance
- Store model artifacts
- Enable model deployment

## Best Practices

- Always validate data quality
- Use cross-validation for model evaluation
- Document data sources and transformations
- Create automated testing for data pipelines
- Monitor model performance in production`,
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  },
  {
    id: 'pytorch-deep-learning',
    title: 'PyTorch Deep Learning + GPU',
    slug: 'pytorch-deep-learning-gpu',
    description: 'Deep learning project setup with PyTorch, GPU acceleration, and modern ML practices for neural network development.',
    category: 'Claude.md Configurations',
    tags: ['python', 'pytorch', 'deep-learning', 'neural-networks', 'gpu'],
    difficulty: 'ADVANCED',
    language: 'Python',
    framework: 'PyTorch',
    content: `# Claude.md - PyTorch Deep Learning + GPU

## Project Overview

This is a comprehensive deep learning project setup using PyTorch with GPU acceleration, modern neural network architectures, and MLOps practices for scalable deep learning development.

## Technology Stack

- **Deep Learning**: PyTorch 2.0+
- **Language**: Python 3.9+
- **GPU**: CUDA 11.8+ / ROCm (AMD)
- **Data Processing**: torchvision, albumentations
- **Visualization**: TensorBoard, wandb
- **Model Serving**: TorchServe, ONNX
- **Containers**: Docker with CUDA support

## Project Structure

\`\`\`
├── data/
│   ├── raw/             # Original datasets
│   ├── processed/       # Preprocessed datasets
│   └── splits/          # Train/val/test splits
├── src/
│   ├── data/           # Data loading and preprocessing
│   ├── models/         # Model architectures
│   ├── training/       # Training loops and utilities
│   ├── evaluation/     # Evaluation and metrics
│   └── utils/          # Utility functions
├── configs/            # Configuration files
├── notebooks/          # Jupyter notebooks
├── experiments/        # Experiment logs and outputs
├── checkpoints/        # Model checkpoints
└── docker/            # Docker configurations
\`\`\`

## Development Guidelines

### Code Style
- Follow PyTorch Lightning patterns
- Use type hints and docstrings
- Implement proper error handling
- Use configuration files for hyperparameters
- Follow modular design principles

### Deep Learning Best Practices
- Use proper data augmentation
- Implement learning rate scheduling
- Use gradient clipping when needed
- Monitor training with visualizations
- Implement early stopping

### GPU Optimization
- Use mixed precision training
- Optimize data loading with multiple workers
- Use compiled models when possible
- Monitor GPU utilization
- Implement distributed training for large models

## Key Commands

- \`python train.py --config configs/config.yaml\` - Start training
- \`python evaluate.py --checkpoint path/to/model.pth\` - Evaluate model
- \`tensorboard --logdir experiments/\` - View training logs
- \`python -m torch.distributed.launch --nproc_per_node=2 train.py\` - Multi-GPU training

## Environment Setup

Create a \`requirements.txt\` file:
\`\`\`
# Core PyTorch stack
torch==2.1.1
torchvision==0.16.1
torchaudio==2.1.1
pytorch-lightning==2.1.2

# Data processing
albumentations==1.3.1
opencv-python==4.8.1.78
pillow==10.1.0
numpy==1.24.3
pandas==2.1.4

# Visualization and logging
tensorboard==2.15.1
wandb==0.16.0
matplotlib==3.7.2
seaborn==0.12.2

# Model optimization
torchmetrics==1.2.0
timm==0.9.12
transformers==4.36.0

# Deployment
onnx==1.15.0
onnxruntime-gpu==1.16.3
torchserve==0.8.2

# Development
jupyter==1.0.0
black==23.11.0
pytest==7.4.3
\`\`\`

## Common Patterns

### Data Loading and Preprocessing
\`\`\`python
# src/data/dataset.py
import torch
from torch.utils.data import Dataset, DataLoader
import torchvision.transforms as transforms
import albumentations as A
from albumentations.pytorch import ToTensorV2
import cv2
import pandas as pd
from pathlib import Path
from typing import Tuple, Optional, Callable

class CustomDataset(Dataset):
    """Custom dataset class for image classification."""
    
    def __init__(self, 
                 data_dir: str,
                 csv_file: str,
                 transform: Optional[Callable] = None,
                 mode: str = 'train'):
        self.data_dir = Path(data_dir)
        self.df = pd.read_csv(csv_file)
        self.transform = transform
        self.mode = mode
        
    def __len__(self) -> int:
        return len(self.df)
    
    def __getitem__(self, idx: int) -> Tuple[torch.Tensor, torch.Tensor]:
        row = self.df.iloc[idx]
        
        # Load image
        img_path = self.data_dir / row['image_path']
        image = cv2.imread(str(img_path))
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        
        # Load label
        label = torch.tensor(row['label'], dtype=torch.long)
        
        # Apply transforms
        if self.transform:
            if isinstance(self.transform, A.Compose):
                transformed = self.transform(image=image)
                image = transformed['image']
            else:
                image = self.transform(image)
        
        return image, label

def get_transforms(image_size: int = 224, mode: str = 'train') -> A.Compose:
    """Get image transforms for training or validation."""
    if mode == 'train':
        transform = A.Compose([
            A.Resize(image_size, image_size),
            A.HorizontalFlip(p=0.5),
            A.VerticalFlip(p=0.2),
            A.Rotate(limit=30, p=0.5),
            A.RandomBrightnessContrast(p=0.5),
            A.HueSaturationValue(p=0.3),
            A.GaussNoise(p=0.2),
            A.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            ),
            ToTensorV2()
        ])
    else:
        transform = A.Compose([
            A.Resize(image_size, image_size),
            A.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            ),
            ToTensorV2()
        ])
    
    return transform

def create_data_loaders(train_dataset: Dataset, 
                       val_dataset: Dataset,
                       batch_size: int = 32,
                       num_workers: int = 4) -> Tuple[DataLoader, DataLoader]:
    """Create training and validation data loaders."""
    train_loader = DataLoader(
        train_dataset,
        batch_size=batch_size,
        shuffle=True,
        num_workers=num_workers,
        pin_memory=True,
        persistent_workers=True
    )
    
    val_loader = DataLoader(
        val_dataset,
        batch_size=batch_size,
        shuffle=False,
        num_workers=num_workers,
        pin_memory=True,
        persistent_workers=True
    )
    
    return train_loader, val_loader
\`\`\`

### Model Architecture
\`\`\`python
# src/models/cnn_model.py
import torch
import torch.nn as nn
import torch.nn.functional as F
import timm
from typing import Optional

class CNNModel(nn.Module):
    """Custom CNN model with pretrained backbone."""
    
    def __init__(self, 
                 model_name: str = 'resnet50',
                 num_classes: int = 10,
                 pretrained: bool = True,
                 dropout: float = 0.2):
        super(CNNModel, self).__init__()
        
        # Load pretrained backbone
        self.backbone = timm.create_model(
            model_name,
            pretrained=pretrained,
            num_classes=0,  # Remove classification head
            global_pool=''  # Remove global pooling
        )
        
        # Get feature size
        with torch.no_grad():
            dummy_input = torch.randn(1, 3, 224, 224)
            features = self.backbone(dummy_input)
            feature_size = features.view(features.size(0), -1).size(1)
        
        # Custom classification head
        self.classifier = nn.Sequential(
            nn.AdaptiveAvgPool2d((1, 1)),
            nn.Flatten(),
            nn.Dropout(dropout),
            nn.Linear(feature_size, 512),
            nn.ReLU(inplace=True),
            nn.Dropout(dropout),
            nn.Linear(512, num_classes)
        )
        
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        features = self.backbone(x)
        output = self.classifier(features)
        return output

class AttentionBlock(nn.Module):
    """Self-attention block for improved feature representation."""
    
    def __init__(self, in_channels: int):
        super(AttentionBlock, self).__init__()
        self.query_conv = nn.Conv2d(in_channels, in_channels // 8, 1)
        self.key_conv = nn.Conv2d(in_channels, in_channels // 8, 1)
        self.value_conv = nn.Conv2d(in_channels, in_channels, 1)
        self.softmax = nn.Softmax(dim=-2)
        self.gamma = nn.Parameter(torch.zeros(1))
        
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        batch_size, channels, height, width = x.size()
        
        # Generate query, key, value
        query = self.query_conv(x).view(batch_size, -1, height * width)
        key = self.key_conv(x).view(batch_size, -1, height * width)
        value = self.value_conv(x).view(batch_size, -1, height * width)
        
        # Compute attention
        attention = torch.bmm(query.permute(0, 2, 1), key)
        attention = self.softmax(attention)
        
        # Apply attention to values
        out = torch.bmm(value, attention.permute(0, 2, 1))
        out = out.view(batch_size, channels, height, width)
        
        # Add residual connection
        out = self.gamma * out + x
        return out

class ResidualBlock(nn.Module):
    """Residual block with batch normalization."""
    
    def __init__(self, in_channels: int, out_channels: int, stride: int = 1):
        super(ResidualBlock, self).__init__()
        
        self.conv1 = nn.Conv2d(in_channels, out_channels, 3, stride, 1, bias=False)
        self.bn1 = nn.BatchNorm2d(out_channels)
        self.conv2 = nn.Conv2d(out_channels, out_channels, 3, 1, 1, bias=False)
        self.bn2 = nn.BatchNorm2d(out_channels)
        
        self.shortcut = nn.Sequential()
        if stride != 1 or in_channels != out_channels:
            self.shortcut = nn.Sequential(
                nn.Conv2d(in_channels, out_channels, 1, stride, bias=False),
                nn.BatchNorm2d(out_channels)
            )
    
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        residual = self.shortcut(x)
        
        out = F.relu(self.bn1(self.conv1(x)))
        out = self.bn2(self.conv2(out))
        out += residual
        out = F.relu(out)
        
        return out
\`\`\`

### Training Loop
\`\`\`python
# src/training/trainer.py
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torch.cuda.amp import GradScaler, autocast
from torch.utils.tensorboard import SummaryWriter
import numpy as np
from tqdm import tqdm
from typing import Dict, List, Optional, Tuple
import wandb
from pathlib import Path

class Trainer:
    """Training class with modern PyTorch features."""
    
    def __init__(self,
                 model: nn.Module,
                 train_loader: DataLoader,
                 val_loader: DataLoader,
                 criterion: nn.Module,
                 optimizer: optim.Optimizer,
                 scheduler: Optional[optim.lr_scheduler._LRScheduler] = None,
                 device: str = 'cuda',
                 mixed_precision: bool = True,
                 gradient_clip: float = 1.0,
                 experiment_name: str = 'experiment'):
        
        self.model = model.to(device)
        self.train_loader = train_loader
        self.val_loader = val_loader
        self.criterion = criterion
        self.optimizer = optimizer
        self.scheduler = scheduler
        self.device = device
        self.mixed_precision = mixed_precision
        self.gradient_clip = gradient_clip
        
        # Initialize scaler for mixed precision
        self.scaler = GradScaler() if mixed_precision else None
        
        # Initialize logging
        self.writer = SummaryWriter(f'experiments/{experiment_name}')
        self.best_val_acc = 0.0
        self.train_losses = []
        self.val_losses = []
        self.val_accuracies = []
        
        # Compile model for better performance (PyTorch 2.0+)
        if hasattr(torch, 'compile'):
            self.model = torch.compile(self.model)
    
    def train_epoch(self) -> float:
        """Train for one epoch."""
        self.model.train()
        running_loss = 0.0
        num_batches = len(self.train_loader)
        
        progress_bar = tqdm(self.train_loader, desc='Training')
        
        for batch_idx, (data, targets) in enumerate(progress_bar):
            data, targets = data.to(self.device), targets.to(self.device)
            
            self.optimizer.zero_grad()
            
            if self.mixed_precision:
                with autocast():
                    outputs = self.model(data)
                    loss = self.criterion(outputs, targets)
                
                self.scaler.scale(loss).backward()
                
                # Gradient clipping
                if self.gradient_clip > 0:
                    self.scaler.unscale_(self.optimizer)
                    torch.nn.utils.clip_grad_norm_(self.model.parameters(), self.gradient_clip)
                
                self.scaler.step(self.optimizer)
                self.scaler.update()
            else:
                outputs = self.model(data)
                loss = self.criterion(outputs, targets)
                loss.backward()
                
                # Gradient clipping
                if self.gradient_clip > 0:
                    torch.nn.utils.clip_grad_norm_(self.model.parameters(), self.gradient_clip)
                
                self.optimizer.step()
            
            running_loss += loss.item()
            
            # Update progress bar
            progress_bar.set_postfix({
                'Loss': f'{loss.item():.4f}',
                'LR': f'{self.optimizer.param_groups[0]["lr"]:.6f}'
            })
        
        return running_loss / num_batches
    
    def validate_epoch(self) -> Tuple[float, float]:
        """Validate for one epoch."""
        self.model.eval()
        running_loss = 0.0
        correct = 0
        total = 0
        
        with torch.no_grad():
            for data, targets in tqdm(self.val_loader, desc='Validation'):
                data, targets = data.to(self.device), targets.to(self.device)
                
                if self.mixed_precision:
                    with autocast():
                        outputs = self.model(data)
                        loss = self.criterion(outputs, targets)
                else:
                    outputs = self.model(data)
                    loss = self.criterion(outputs, targets)
                
                running_loss += loss.item()
                
                # Calculate accuracy
                _, predicted = torch.max(outputs, 1)
                total += targets.size(0)
                correct += (predicted == targets).sum().item()
        
        val_loss = running_loss / len(self.val_loader)
        val_acc = 100 * correct / total
        
        return val_loss, val_acc
    
    def train(self, epochs: int, save_dir: str = 'checkpoints') -> Dict[str, List[float]]:
        """Complete training loop."""
        Path(save_dir).mkdir(exist_ok=True)
        
        for epoch in range(epochs):
            print(f'\\nEpoch {epoch+1}/{epochs}')
            print('-' * 50)
            
            # Training phase
            train_loss = self.train_epoch()
            
            # Validation phase
            val_loss, val_acc = self.validate_epoch()
            
            # Update learning rate
            if self.scheduler:
                if isinstance(self.scheduler, optim.lr_scheduler.ReduceLROnPlateau):
                    self.scheduler.step(val_loss)
                else:
                    self.scheduler.step()
            
            # Log metrics
            self.writer.add_scalar('Loss/Train', train_loss, epoch)
            self.writer.add_scalar('Loss/Validation', val_loss, epoch)
            self.writer.add_scalar('Accuracy/Validation', val_acc, epoch)
            self.writer.add_scalar('Learning_Rate', self.optimizer.param_groups[0]['lr'], epoch)
            
            # Log to wandb if available
            if wandb.run:
                wandb.log({
                    'epoch': epoch,
                    'train_loss': train_loss,
                    'val_loss': val_loss,
                    'val_acc': val_acc,
                    'lr': self.optimizer.param_groups[0]['lr']
                })
            
            # Save best model
            if val_acc > self.best_val_acc:
                self.best_val_acc = val_acc
                torch.save({
                    'epoch': epoch,
                    'model_state_dict': self.model.state_dict(),
                    'optimizer_state_dict': self.optimizer.state_dict(),
                    'val_acc': val_acc,
                    'val_loss': val_loss
                }, f'{save_dir}/best_model.pth')
                print(f'New best model saved with validation accuracy: {val_acc:.2f}%')
            
            # Store metrics
            self.train_losses.append(train_loss)
            self.val_losses.append(val_loss)
            self.val_accuracies.append(val_acc)
            
            print(f'Train Loss: {train_loss:.4f}')
            print(f'Val Loss: {val_loss:.4f}, Val Acc: {val_acc:.2f}%')
        
        self.writer.close()
        
        return {
            'train_losses': self.train_losses,
            'val_losses': self.val_losses,
            'val_accuracies': self.val_accuracies
        }

# Usage example
def create_trainer(model, train_loader, val_loader, num_classes, device):
    """Create trainer with optimized settings."""
    criterion = nn.CrossEntropyLoss(label_smoothing=0.1)
    
    optimizer = optim.AdamW(
        model.parameters(),
        lr=1e-3,
        weight_decay=1e-4,
        betas=(0.9, 0.999)
    )
    
    scheduler = optim.lr_scheduler.CosineAnnealingWarmRestarts(
        optimizer,
        T_0=10,
        T_mult=2,
        eta_min=1e-6
    )
    
    trainer = Trainer(
        model=model,
        train_loader=train_loader,
        val_loader=val_loader,
        criterion=criterion,
        optimizer=optimizer,
        scheduler=scheduler,
        device=device,
        mixed_precision=True,
        gradient_clip=1.0
    )
    
    return trainer
\`\`\`

### Model Deployment
\`\`\`python
# src/deployment/inference.py
import torch
import torch.nn as nn
import torchvision.transforms as transforms
import onnx
import onnxruntime as ort
import numpy as np
from PIL import Image
from typing import List, Dict, Any
import json

class ModelInference:
    """Model inference class supporting PyTorch and ONNX."""
    
    def __init__(self, model_path: str, model_type: str = 'pytorch'):
        self.model_type = model_type
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        
        if model_type == 'pytorch':
            self.load_pytorch_model(model_path)
        elif model_type == 'onnx':
            self.load_onnx_model(model_path)
        else:
            raise ValueError("Model type must be 'pytorch' or 'onnx'")
    
    def load_pytorch_model(self, model_path: str):
        """Load PyTorch model."""
        checkpoint = torch.load(model_path, map_location=self.device)
        
        # Assuming model architecture is saved or can be reconstructed
        from src.models.cnn_model import CNNModel
        self.model = CNNModel(num_classes=10)  # Adjust based on your model
        self.model.load_state_dict(checkpoint['model_state_dict'])
        self.model.to(self.device)
        self.model.eval()
    
    def load_onnx_model(self, model_path: str):
        """Load ONNX model."""
        providers = ['CUDAExecutionProvider', 'CPUExecutionProvider']
        self.ort_session = ort.InferenceSession(model_path, providers=providers)
        self.input_name = self.ort_session.get_inputs()[0].name
        self.output_name = self.ort_session.get_outputs()[0].name
    
    def preprocess(self, image: Image.Image) -> torch.Tensor:
        """Preprocess image for inference."""
        transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            )
        ])
        
        return transform(image).unsqueeze(0)
    
    def predict(self, image: Image.Image) -> Dict[str, Any]:
        """Make prediction on single image."""
        input_tensor = self.preprocess(image)
        
        if self.model_type == 'pytorch':
            with torch.no_grad():
                input_tensor = input_tensor.to(self.device)
                outputs = self.model(input_tensor)
                probabilities = torch.softmax(outputs, dim=1)
                predicted_class = torch.argmax(probabilities, dim=1).item()
                confidence = probabilities[0][predicted_class].item()
        
        elif self.model_type == 'onnx':
            input_array = input_tensor.numpy()
            outputs = self.ort_session.run([self.output_name], {self.input_name: input_array})
            probabilities = torch.softmax(torch.tensor(outputs[0]), dim=1)
            predicted_class = torch.argmax(probabilities, dim=1).item()
            confidence = probabilities[0][predicted_class].item()
        
        return {
            'predicted_class': predicted_class,
            'confidence': confidence,
            'probabilities': probabilities[0].tolist()
        }
    
    def batch_predict(self, images: List[Image.Image]) -> List[Dict[str, Any]]:
        """Make predictions on batch of images."""
        results = []
        for image in images:
            result = self.predict(image)
            results.append(result)
        return results

def export_to_onnx(model: nn.Module, input_shape: tuple, output_path: str):
    """Export PyTorch model to ONNX format."""
    model.eval()
    dummy_input = torch.randn(1, *input_shape)
    
    torch.onnx.export(
        model,
        dummy_input,
        output_path,
        export_params=True,
        opset_version=11,
        do_constant_folding=True,
        input_names=['input'],
        output_names=['output'],
        dynamic_axes={
            'input': {0: 'batch_size'},
            'output': {0: 'batch_size'}
        }
    )
    
    print(f"Model exported to {output_path}")
\`\`\`

## GPU Optimization

- Use CUDA for GPU acceleration
- Implement mixed precision training
- Optimize data loading with pin_memory
- Use multiple GPUs with DataParallel/DistributedDataParallel
- Monitor GPU memory usage

## Experiment Tracking

- Use TensorBoard for training visualization
- Integrate with Weights & Biases
- Log hyperparameters and metrics
- Track model checkpoints
- Compare experiment results

## Model Deployment

- Export models to ONNX format
- Use TorchServe for production serving
- Implement proper model versioning
- Add monitoring and logging
- Use containerization with Docker`,
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  }
];