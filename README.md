# ABIM Bias Checker - Healthcare Equity AI

An AI-powered system designed to detect and mitigate bias in medical clinical vignettes, case studies, and evaluation assessments. This project combines fine-tuned transformer models (RoBERTa) with few-shot prompting pipelines (GPT-4o) to provide a robust explainability layer for medical AI governance.

## 🚀 Quick Links

- **Research Paper/UI**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [https://abim-bias-checker-backend.fly.dev](https://abim-bias-checker-backend.fly.dev)
- **Documentation**: [backend/README.md](./backend/README.md)

## 📁 Project Structure

- `frontend/`: Next.js web application (Research platform & Interactive Demo)
- `backend/`: Flask API servingRoBERTa classification and LLM explainability
- `backend/models/`: Contains the fine-tuned RoBERTa-base model with LoRA adapters

## 🛠️ Installation & Setup

### 1. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python src/app.py
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🚢 Deployment (Fly.io)

The backend is deployed to Fly.io. To deploy updates:

1. **Navigate to backend**:

   ```bash
   cd backend
   ```

2. **Deploy via flyctl**:

   ```bash
   fly deploy
   ```

3. **Set Secrets**:
   Ensure your OpenAI API key is set for the explainability pipeline:
   ```bash
   fly secrets set OPENAI_API_KEY=your_key_here
   ```

## 🔗 Internal Resources

- [Taxonomy of Medical Bias](./frontend/app/taxonomy/page.tsx)
- [Few-Shot Prompting Examples](./backend/data/few_shot_examples.json)

## 📜 License

This project is developed for ABIM standards and medical research purposes.
