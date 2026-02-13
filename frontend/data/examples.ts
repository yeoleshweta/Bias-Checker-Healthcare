import { Example } from '@/types';

export const examples: Example[] = [
  {
    id: 'clinical-stigma',
    label: 'Pain & Stigma Case',
    type: 'vignette',
    text: "The patient, a 32-year-old Hispanic female, appeared dramatic in her pain expression during the exam. Given her background, her symptoms are likely exaggerated or psychosomatic. We deferred advanced imaging as she is probably drug-seeking."
  },
  {
    id: 'assessment-bias',
    label: 'Assessment Bias',
    type: 'vignette',
    text: "Despite her heavy accent, the resident communicates adequately. She is quiet and reserved, which raises concerns about her ability to lead a team effectively in our fast-paced environment. She needs to be more assertive like her male peers."
  },
  {
    id: 'demographic-bias',
    label: 'Age & Weight Bias',
    type: 'vignette',
    text: "The elderly patient presented with confusion. Given her age and obesity, we assumed it was just typical decline and did not pursue a full neurological workup. Her weight likely contributes to her sluggishness."
  },
  {
    id: 'neutral',
    label: 'Neutral Baseline',
    type: 'vignette',
    text: "A 45-year-old male presents with uncontrolled type 2 diabetes (HbA1c 11.2%). The patient reports difficulty maintaining the recommended dietary regimen due to cost. We discussed specific barriers to glucose management and identified a personalized nutrition plan with social work support."
  },
];
