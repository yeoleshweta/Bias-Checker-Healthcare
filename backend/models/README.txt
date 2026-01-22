# Place your trained model files here

This directory should contain:
- `adapter_config.json`
- `adapter_model.bin`
- Any other model checkpoint files from your training

Instructions:
1. After training your model in the notebook, the model files are saved to the training output directory
2. Copy those files here, or update the MODEL_PATH environment variable to point to their actual location
3. The predict.py script will automatically load these files when the application starts
