import axios from 'axios';
import { BiasAnalysisRequest, BiasAnalysisResult } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function analyzeBias(text: string): Promise<BiasAnalysisResult> {
  try {
    const request: BiasAnalysisRequest = { text };
    // The backend now returns the full analysis result including LLM-generated rationale
    const response = await api.post<BiasAnalysisResult>('/predict', request);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Failed to analyze bias. Please ensure the backend API is running.');
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
