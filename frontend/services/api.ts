import axios from 'axios';
import { BiasAnalysisRequest, BiasAnalysisResponse, BiasAnalysisResult, BiasLabel } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Rationale templates based on bias type
const rationaleTemplates: Record<BiasLabel, string> = {
  no_bias: 'This text uses neutral, patient-centered language without stereotypes or stigmatizing descriptors. The clinical information is presented objectively.',
  demographic_bias: 'The vignette attributes medical non-adherence or clinical outcomes to the patient\'s demographic background (race, ethnicity, nationality, or cultural group) and makes generalized assumptions about behavior based on these demographic stereotypes, which is a form of negative profiling.',
  clinical_stigma_bias: 'This text contains stigmatizing language about the patient\'s condition, behavior, or circumstances. Such language can negatively influence clinical judgment and perpetuate harmful stereotypes.',
  assessment_bias: 'This evaluation uses biased framing that may unfairly penalize the trainee or candidate. The language suggests subjective judgment rather than objective, constructive feedback.',
  algorithmic_bias: 'This text reflects potential bias from algorithmic or automated systems, such as biased scoring logic, unfair risk stratification, or inequitable resource allocation patterns.',
  documentation_bias: 'The documentation contains unnecessary negative descriptors or judgmental language that goes beyond clinically relevant information and may reflect implicit bias.',
  structural_bias: 'This text attributes individual blame for issues that are actually rooted in systemic barriers, healthcare access inequities, or resource limitations beyond the patient\'s control.',
};

// Flag detection patterns
const flagPatterns: Record<BiasLabel, string[]> = {
  no_bias: [],
  demographic_bias: ['cultural dietary preferences common in this demographic', 'likely due to cultural', 'Hispanic background', 'immigration status', 'given the background'],
  clinical_stigma_bias: ['drug-seeking', 'non-compliant', 'failure to adhere', 'refuses to', 'difficult patient'],
  assessment_bias: ['unprofessional', 'lacks competence', 'poor judgment', 'inadequate'],
  algorithmic_bias: ['risk score indicates', 'algorithmic assessment', 'automated flagging'],
  documentation_bias: ['appears unmotivated', 'seems uninterested', 'claims to have', 'alleges'],
  structural_bias: ['lives in a high-crime area', 'limited resources in neighborhood', 'lack of access'],
};

// Recommended revisions
const revisionTemplates: Record<BiasLabel, (text: string) => string> = {
  no_bias: (text) => text,
  demographic_bias: (text) => text.replace(/cultural dietary preferences common in this demographic/gi, 'dietary preferences').replace(/Hispanic background/gi, 'background'),
  clinical_stigma_bias: (text) => text.replace(/non-compliant/gi, 'having difficulty with adherence').replace(/drug-seeking/gi, 'expressing pain-related concerns'),
  assessment_bias: (text) => 'The trainee demonstrated [specific observable behavior]. Recommend focusing on [specific skill development area] to strengthen competency.',
  algorithmic_bias: (text) => text.replace(/algorithmic/gi, 'clinical').replace(/automated/gi, 'clinical'),
  documentation_bias: (text) => text.replace(/appears/gi, 'reports').replace(/claims/gi, 'states').replace(/alleges/gi, 'reports'),
  structural_bias: (text) => text.replace(/high-crime area/gi, 'community').replace(/limited resources/gi, 'healthcare access challenges'),
};

// Generate audit score based on bias type and confidence
function calculateAuditScore(label: BiasLabel, confidence: number): number {
  if (label === 'no_bias') {
    return Math.min(10, Math.round(8 + confidence * 2));
  }
  // Higher confidence in bias = lower compliance score
  return Math.max(1, Math.round((1 - confidence) * 10));
}

// Get compliance rating
function getComplianceRating(score: number): string {
  if (score >= 9) return 'Excellent';
  if (score >= 7) return 'Good';
  if (score >= 5) return 'Fair';
  if (score >= 3) return 'Needs Improvement';
  return 'High Risk';
}

// Enrich the API response with generated content
function enrichResponse(response: BiasAnalysisResponse): BiasAnalysisResult {
  const { predicted_label, confidence, text } = response;
  
  const rationale = rationaleTemplates[predicted_label];
  const flags = flagPatterns[predicted_label] || [];
  const recommended_revision = revisionTemplates[predicted_label](text);
  const audit_score = calculateAuditScore(predicted_label, confidence);
  const compliance_rating = getComplianceRating(audit_score);

  return {
    ...response,
    rationale,
    flags,
    recommended_revision,
    audit_score,
    compliance_rating,
  };
}

export async function analyzeBias(text: string): Promise<BiasAnalysisResult> {
  try {
    const request: BiasAnalysisRequest = { text };
    const response = await api.post<BiasAnalysisResponse>('/predict', request);
    return enrichResponse(response.data);
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
