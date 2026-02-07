import axios from 'axios';
import { BiasAnalysisRequest, BiasAnalysisResult } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Analyze bias using the few-shot prompting pipeline.
 * Uses GPT-4 with 5 curated medical examples to detect:
 * - 4 Bias Categories: no_bias, demographic_bias, clinical_stigma_bias, assessment_bias
 * - 11 Sub-Types: racial_bias, gender_bias, pain_stigma, etc.
 */
export async function analyzeBias(text: string): Promise<BiasAnalysisResult> {
  try {
    const request: BiasAnalysisRequest = { text };
    // Use the few-shot prompting endpoint for richer analysis
    const response = await api.post<BiasAnalysisResult>('/predict-fewshot', request);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Failed to analyze bias. Please ensure the backend API is running.');
    }
    throw error;
  }
}

/**
 * Analyze bias using the fine-tuned RoBERTa model (legacy endpoint).
 */
export async function analyzeBiasLegacy(text: string): Promise<BiasAnalysisResult> {
  try {
    const request: BiasAnalysisRequest = { text };
    const response = await api.post<BiasAnalysisResult>('/predict', request);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Failed to analyze bias.');
    }
    throw error;
  }
}

export async function checkHealth(): Promise<boolean> {
  try {
    await api.get('/health');
    return true;
  } catch {
    return false;
  }
}

export async function getModelInfo(): Promise<{
  model: string;
  categories: string[];
  total_sub_types: number;
  total_examples: number;
}> {
  try {
    const response = await api.get('/model-info');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch model info');
  }
}
