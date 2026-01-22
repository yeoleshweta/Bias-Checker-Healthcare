export type BiasLabel =
  | "no_bias"
  | "demographic_bias"
  | "clinical_stigma_bias"
  | "assessment_bias"
  | "algorithmic_bias"
  | "documentation_bias"
  | "structural_bias";

export interface BiasAnalysisRequest {
  text: string;
}

export interface BiasAnalysisResponse {
  text: string;
  predicted_label: BiasLabel;
  confidence: number;
}

export interface BiasAnalysisResult extends BiasAnalysisResponse {
  rationale: string;
  flags: string[];
  recommended_revision: string;
  audit_score: number;
  compliance_rating: string;
}

export type SourceType = "vignette" | "feedback";

export interface Example {
  id: string;
  label: string;
  text: string;
  type: SourceType;
}
