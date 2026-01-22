# Dataset Directory

Place your training dataset here: `abim_bias_balanced_3Bias.csv`

## Required Format

Your CSV file must have these columns:

### 1. `text_clean` (string)

The medical text to analyze for bias.

### 2. `bias_label` (string)

The bias category. Must be one of:

- `no_bias`
- `demographic_bias`
- `clinical_stigma_bias`
- `assessment_bias`

Or one of these (will be automatically mapped):

- `structural_bias` → `demographic_bias`
- `algorithmic_bias` → `demographic_bias`
- `documentation_bias` → `clinical_stigma_bias`

## Example CSV

```csv
text_clean,bias_label
"The patient declined the procedure after a discussion of risks.",no_bias
"The patient's failure to adhere to the diet is likely due to cultural preferences common in Hispanic populations.",demographic_bias
"The patient is a frequent flyer who is non-compliant with all nursing staff.",clinical_stigma_bias
"The resident is abrasive and too confident, often challenging decisions.",assessment_bias
"Physical exam reveals clear lungs bilaterally.",no_bias
```

## Sample Data (for testing)

If you don't have a dataset yet, you can create a small test file:

```bash
cat > abim_bias_balanced_3Bias.csv << 'EOF'
text_clean,bias_label
"The patient declined the procedure after a discussion of risks.",no_bias
"The 45-year-old Black male was readmitted due to inability to afford medication.",demographic_bias
"Patient claims he is in 10/10 pain but appears comfortable.",clinical_stigma_bias
"The resident is abrasive and too confident.",assessment_bias
"Physical exam reveals clear lungs bilaterally.",no_bias
"The patient's failure to adhere is due to cultural preferences common in Hispanic populations.",demographic_bias
"The patient is a frequent flyer who is non-compliant.",clinical_stigma_bias
"The intern lacks confidence in clinical decision-making.",assessment_bias
EOF
```

**Note:** This is just for testing. For production use, you need a properly balanced dataset with 500+ samples per category.

## Where to Get Dataset

According to the notebook, the original dataset should be available at:

- Google Drive location specified in the Colab notebook
- Or recreated following the bias taxonomy from the ABIM framework

## Data Statistics (Expected)

The training expects a balanced dataset:

- ~500 samples of `no_bias`
- ~500 samples of `demographic_bias`
- ~500 samples of `clinical_stigma_bias`
- ~499 samples of `assessment_bias`
- **Total**: ~1999 samples

This will be split:

- Training: 85% (~1699 samples)
- Test: 15% (~300 samples)
