export type BiasLabel =
  | "no_bias"
  | "demographic_bias"
  | "clinical_stigma_bias"
  | "assessment_bias"
  | "error";

export type BiasSubType =
  | "racial_bias"
  | "gender_bias"
  | "age_bias"
  | "socioeconomic_bias"
  | "weight_stigma"
  | "pain_stigma"
  | "mental_health_stigma"
  | "lifestyle_stigma"
  | "diagnostic_bias"
  | "competency_assessment_bias"
  | "treatment_decision_bias";

export type BiasLevel = "NONE" | "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

export interface BiasAnalysisRequest {
  text: string;
}

export interface BiasFound {
  category: BiasLabel;
  sub_type: BiasSubType;
  confidence: number;
  evidence: string;
  problematic_text: string;
  recommendation: string;
}

export interface BiasAnalysisResult {
  // Pipeline response format
  bias_detected: boolean;
  primary_category: BiasLabel;
  overall_bias_level: BiasLevel;
  biases_found: BiasFound[];
  bias_free_sections: string[];
  summary: string;
  
  // Backward compatible fields
  text: string;
  predicted_label: BiasLabel;
  confidence: number;
  audit_score: number;
  compliance_rating: string;
  rationale: string;
  flags: string[];
  
  // Metadata
  model_type?: string;
  num_biases?: number;
}

export type SourceType = "vignette";

export interface Example {
  id: string;
  label: string;
  text: string;
  type: SourceType;
}
