"use client";

import React from "react";
import Link from "next/link";
import BiasChecker from "@/components/BiasChecker";
import RoBERTaAnalyzer from "@/components/analyzers/RoBERTaAnalyzer";
import TrainingCurveChart from "@/components/charts/TrainingCurveChart";
import ModelComparisonChart from "@/components/charts/ModelComparisonChart";
import DatasetDistribution from "@/components/charts/DatasetDistribution";
import FewShotPerformance from "@/components/charts/FewShotPerformance";
import ApproachComparisonChart from "@/components/charts/ApproachComparisonChart";
import { Download, FileText, Share2 } from "lucide-react";

export default function ResearchPage() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-12 md:py-20 selection:bg-primary/10">
      {/* ================================================================ */}
      {/* HEADER                                                          */}
      {/* ================================================================ */}
      <header className="mb-12 border-b border-border pb-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-sans font-bold leading-tight mb-6 text-neutral-900 dark:text-neutral-100">
            Development of an AI-Powered Medical Bias Detection and
            Explainability System for Case Studies, Clinical Narratives, and
            Evaluation Assessments
          </h1>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm md:text-base font-sans text-neutral-600 dark:text-neutral-400">
            <span className="font-semibold text-neutral-900 dark:text-neutral-200">
              Shweta Sharma
            </span>
            <span className="text-neutral-300 dark:text-neutral-600">|</span>
            <span className="text-primary font-medium">
              A Data Science Project
            </span>
            <span className="text-neutral-300 dark:text-neutral-600">|</span>
            <span>February 2026</span>
            <span className="text-neutral-300 dark:text-neutral-600">|</span>
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-bold border border-primary/20">
              ABIM Standards
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            href="#experiment-2-analyzer"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-sans font-medium bg-primary text-white hover:bg-primary-hover rounded transition-colors"
          >
            RoBERTa Demo
          </Link>
          <Link
            href="#experiment-3-analyzer"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-sans font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 rounded transition-colors"
          >
            Few-Shot Demo
          </Link>
          <button className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-sans font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors">
            <FileText size={14} /> View PDF
          </button>
          <a
            href="https://github.com/yeoleshweta/Bias-Checker-Healthcare.git"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-sans font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors text-neutral-900 dark:text-neutral-100"
          >
            <Download size={14} /> Synthetic Dataset
          </a>
          <button className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-sans font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors">
            <Share2 size={14} /> Cite
          </button>
        </div>
      </header>

      {/* ================================================================ */}
      {/* ABSTRACT                                                        */}
      {/* ================================================================ */}
      <section className="bg-neutral-50 dark:bg-neutral-900/50 p-6 md:p-8 rounded-lg border border-neutral-100 dark:border-neutral-800 mb-12">
        <h3 className="text-sm font-sans font-bold uppercase tracking-wider text-neutral-500 mb-3 mt-0">
          Abstract
        </h3>
        <p className="text-base md:text-lg leading-relaxed mb-4 italic">
          This research presents the development and evaluation of an AI-powered
          medical bias detection system designed to identify and classify biases
          in medical case studies, clinical narratives, evaluation assessments,
          and healthcare documentation. The study employed a multi-phase
          experimental approach, beginning with the generation of 3,500
          synthetic samples across seven bias categories, followed by
          comparative analysis of fine-tuned transformer models (RoBERTa-base
          and Bio-ClinicalBERT), and culminating in the implementation of a
          few-shot prompting approach using large language models (GPT-4o and
          Gemini). Our findings reveal that while fine-tuned models achieved
          high accuracy (up to 98%), they struggled with semantic overlap and
          domain generalization. Ultimately, the few-shot prompting approach
          demonstrated superior performance and was deployed as an end-to-end
          bias detection pipeline, acting as a core explainability layer for AI
          audits and governance within internal medicine assessment systems.
          This work provides both a comprehensive taxonomy and a practical
          framework for scaling bias mitigation across diverse medical content.
        </p>
        <p className="text-base md:text-lg leading-relaxed mb-0 italic">
          <span className="font-bold">Keywords:</span> Medical bias detection,
          clinical NLP, transformer models, few-shot prompting, algorithmic
          fairness, healthcare AI auditing
        </p>
      </section>

      {/* ================================================================ */}
      {/* 1. INTRODUCTION                                                 */}
      {/* ================================================================ */}
      <section className="mb-16">
        <h2>1. Introduction</h2>
        <p>
          Medical certification and assessment programs increasingly explore
          automation for content generation, feedback drafting, candidate
          support, and workflow triage. In these settings, bias can appear in
          subtle but impactful ways:{" "}
          <strong>
            stereotyping trainees, stigmatizing patients, or embedding
            structural inequities into evaluation criteria.
          </strong>{" "}
          Separately, algorithmic systems can amplify existing inequities
          through proxy features (e.g., accent, grammar, insurance status) or
          biased historical labels.
        </p>
        <p>
          This paper describes the ABIM AI Bias Checker, a robust framework for
          detecting bias in medical narratives and assessments. Beyond clinical
          vignettes, this system is designed to provide an explainability and
          governance layer for:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6 text-neutral-700 dark:text-neutral-300">
          <li>Medical research case studies and documentation;</li>
          <li>Psychometric evaluation and assessment narratives;</li>
          <li>AI-generated feedback and drafting systems;</li>
          <li>
            Cross-organizational AI audits for long-term algorithmic fairness.
          </li>
        </ul>
      </section>

      {/* ================================================================ */}
      {/* 2. BACKGROUND                                                   */}
      {/* ================================================================ */}
      <section className="mb-16">
        <h2>2. Background and Motivation</h2>
        <h3>2.1 Bias in healthcare and medical evaluation</h3>
        <p>
          Bias in healthcare has been documented across clinical decision
          support, risk prediction, documentation practices, and resource
          allocation. Algorithmic bias in population health management has been
          shown to produce systematic racial disparities when cost is used as a
          proxy for need [1]. Bias also appears in narrative evaluations and
          structured assessments through stereotyped expectations and
          inequitable norms [2, 5]. A practical ABIM-themed classifier must
          therefore capture both <em>language harms</em> (stigmatizing wording,
          stereotypes) and <em>system harms</em> (structural constraints,
          algorithmic scoring issues).
        </p>
      </section>

      {/* ================================================================ */}
      {/* 3. TAXONOMY                                                     */}
      {/* ================================================================ */}
      <section className="mb-16">
        <h2>3. ABIM Bias Taxonomy (7 Labels)</h2>
        <p>
          We define seven labels that reflect biases commonly observed in
          healthcare communication, documentation, and assessment, as well as
          algorithmic fairness concerns.
        </p>

        <div className="overflow-x-auto my-8 border rounded-lg shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-sans">
              <tr>
                <th className="p-4 border-b min-w-[140px]">Label</th>
                <th className="p-4 border-b min-w-[200px]">Definition</th>
                <th className="p-4 border-b min-w-[200px]">
                  Common Manifestations
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 bg-white dark:bg-neutral-900">
              <tr>
                <td className="p-4 font-mono text-xs font-bold text-green-700 dark:text-green-400">
                  no_bias
                </td>
                <td className="p-4">
                  Clinically appropriate, neutral language; no stereotypes,
                  stigma, or inequitable assumptions.
                </td>
                <td className="p-4 text-neutral-600 dark:text-neutral-400">
                  Evidence-based reasoning; respectful patient-centered
                  descriptions.
                </td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-xs font-bold text-red-700 dark:text-red-400">
                  demographic_bias
                </td>
                <td className="p-4">
                  Biased assumptions linked to race/ethnicity, gender, age,
                  language, immigration status, training pathway.
                </td>
                <td className="p-4 text-neutral-600 dark:text-neutral-400">
                  Coded language (&quot;from that neighborhood&quot;); lower
                  expectations for IMGs.
                </td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-xs font-bold text-orange-700 dark:text-orange-400">
                  clinical_stigma
                </td>
                <td className="p-4">
                  Biased evaluation framing in trainee or candidate assessment
                  that lacks objectivity.
                </td>
                <td className="p-4 text-neutral-600 dark:text-neutral-400">
                  Blame framing (&quot;lack of motivation&quot;);
                  &quot;drug-seeking&quot; shortcuts.
                </td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-xs font-bold text-purple-700 dark:text-purple-400">
                  assessment_bias
                </td>
                <td className="p-4">
                  Bias in how trainees/candidates are evaluated or scored;
                  unfair norms in rubrics.
                </td>
                <td className="p-4 text-neutral-600 dark:text-neutral-400">
                  Penalizing shared decision-making; accent equated with
                  incompetence.
                </td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-xs font-bold text-blue-700 dark:text-blue-400">
                  algorithmic_bias
                </td>
                <td className="p-4">
                  Bias arising from automated scoring, AI-generated feedback, or
                  data-driven rubrics.
                </td>
                <td className="p-4 text-neutral-600 dark:text-neutral-400">
                  Proxy features drive lower scores; historical label bias in
                  training data.
                </td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-xs font-bold text-yellow-700 dark:text-yellow-400">
                  documentation_bias
                </td>
                <td className="p-4">
                  Biased framing in charting or case descriptions that labels
                  patients without context.
                </td>
                <td className="p-4 text-neutral-600 dark:text-neutral-400">
                  &quot;Non-compliant&quot; without barriers; negative
                  descriptors not clinically necessary.
                </td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-xs font-bold text-pink-700 dark:text-pink-400">
                  structural_bias
                </td>
                <td className="p-4">
                  System-level inequity due to policies, resourcing, or
                  institutional constraints.
                </td>
                <td className="p-4 text-neutral-600 dark:text-neutral-400">
                  Rigid requirements disadvantaging part-time physicians;
                  unequal access to resources.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ================================================================ */}
      {/* EXPERIMENT 1: SYNTHETIC DATASET                                 */}
      {/* ================================================================ */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold font-sans border border-amber-500/20">
            EXPERIMENT 1
          </span>
          <h2 className="mb-0">Synthetic Dataset Generation</h2>
        </div>
        <p>
          We generated <strong>3,500 synthetic clinical vignettes</strong> using
          GPT-4o, balanced across seven bias categories (500 samples each). Each
          sample was designed to reflect realistic ABIM-style internal medicine
          documentation, including patient histories, clinical assessments, and
          feedback narratives.
        </p>

        <div className="my-8 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900/50">
          <h4 className="text-sm font-sans font-bold uppercase tracking-wider text-neutral-500 mb-6">
            Figure 1: Dataset Distribution (7 Categories)
          </h4>
          <DatasetDistribution />
        </div>

        <div className="flex p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg gap-3 my-6">
          <span className="text-amber-600 font-bold shrink-0 font-sans text-sm">
            ⚠️ Finding:
          </span>
          <p className="text-sm text-amber-900 dark:text-amber-200">
            Initial training on all 7 categories revealed{" "}
            <strong>significant semantic overlap</strong> between related
            categories — particularly <em>documentation_bias</em> vs.{" "}
            <em>clinical_stigma</em>, and
            <em> structural_bias</em> vs. <em>algorithmic_bias</em>. This led to
            high confusion rates and motivated the consolidation to{" "}
            <strong>4 categories</strong> in Experiment 2.
          </p>
        </div>
      </section>

      {/* ================================================================ */}
      {/* EXPERIMENT 2: FINE-TUNED TRANSFORMERS                           */}
      {/* ================================================================ */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold font-sans border border-blue-500/20">
            EXPERIMENT 2
          </span>
          <h2 className="mb-0">Fine-Tuned Transformer Models</h2>
        </div>
        <p>
          We fine-tuned pretrained transformers — RoBERTa-base [3] and
          Bio-ClinicalBERT [2] — by attaching a task-specific classification
          head to the pooled representation. We experimented with{" "}
          <strong>partial layer freezing</strong> and{" "}
          <strong>LoRA adapters</strong> to stabilize training and reduce
          overfitting on synthetic data.
        </p>

        <h3>Training Configuration</h3>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            <strong>Max length:</strong> 256 tokens
          </li>
          <li>
            <strong>Batch size:</strong> 16
          </li>
          <li>
            <strong>Epochs:</strong> 3–6 (Early stopping on Macro-F1)
          </li>
          <li>
            <strong>Optimizer:</strong> AdamW
          </li>
          <li>
            <strong>Learning Rate:</strong> 2e-5 to 5e-5
          </li>
        </ul>

        {/* Training Curves Chart */}
        <div className="my-8 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900/50">
          <h4 className="text-sm font-sans font-bold uppercase tracking-wider text-neutral-500 mb-4">
            Figure 2: RoBERTa Training Curves (4-Label, 6 Epochs)
          </h4>
          <TrainingCurveChart />
          <p className="text-xs text-neutral-500 italic mt-3 font-sans">
            Best checkpoint at Epoch 5 — Accuracy: 98.67%, Macro F1: 98.67%.
            Slight degradation in Epoch 6 suggests early stopping was optimal.
          </p>
        </div>

        {/* Model Comparison Chart */}
        <div className="my-8 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900/50">
          <h4 className="text-sm font-sans font-bold uppercase tracking-wider text-neutral-500 mb-6">
            Figure 3: Model Comparison — Accuracy &amp; Macro F1
          </h4>
          <ModelComparisonChart />
        </div>

        <div className="flex p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg gap-3 my-6">
          <span className="text-blue-600 font-bold shrink-0 font-sans text-sm">
            💡 Key Finding:
          </span>
          <p className="text-sm text-blue-900 dark:text-blue-200">
            Consolidating from 7 to <strong>4 bias categories</strong> (no_bias,
            demographic_bias, clinical_stigma_bias, assessment_bias) improved
            RoBERTa accuracy from 91.5% → <strong>98.67%</strong>. The 4-label
            model with LoRA adapters is deployed below for interactive testing.
          </p>
        </div>
      </section>

      {/* ================================================================ */}
      {/* INTERACTIVE: RoBERTa ANALYZER                                   */}
      {/* ================================================================ */}
      <section id="experiment-2-analyzer" className="my-16 scroll-mt-20">
        <div className="border rounded-xl overflow-hidden shadow-sm bg-neutral-50 dark:bg-neutral-900">
          <div className="bg-white dark:bg-black p-4 border-b text-xs font-mono text-neutral-500 uppercase tracking-wider flex justify-between items-center">
            <span>Figure 4: Fine-Tuned RoBERTa Classifier (Interactive)</span>
            <span className="text-blue-600 flex items-center gap-1">
              ● Live Model
            </span>
          </div>
          <div className="p-0">
            <RoBERTaAnalyzer />
          </div>
          <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border-t text-sm text-neutral-600 dark:text-neutral-400 italic">
            <strong>Figure 4.</strong> Interactive fine-tuned RoBERTa classifier
            with LoRA adapters. Classifies clinical text into 4 bias categories
            with confidence scoring and AI-generated explanations.
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* EXPERIMENT 3: FEW-SHOT PROMPTING                                */}
      {/* ================================================================ */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold font-sans border border-purple-500/20">
            EXPERIMENT 3
          </span>
          <h2 className="mb-0">Few-Shot Prompting Approach</h2>
        </div>
        <p>
          Building on the limitations of fine-tuned models (overfitting to
          synthetic patterns, inability to explain predictions), we implemented
          a <strong>few-shot prompting pipeline</strong> [4] using GPT-4o. This
          approach uses 5 curated example pairs spanning all bias categories,
          enabling:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6 text-neutral-700 dark:text-neutral-300">
          <li>
            <strong>4 primary categories</strong> with{" "}
            <strong>11 granular sub-types</strong>
          </li>
          <li>Multi-bias detection (intersectional analysis)</li>
          <li>Evidence-based explanations with exact text citations</li>
          <li>Actionable recommendations for bias mitigation</li>
          <li>Confidence scores and severity ratings (NONE → CRITICAL)</li>
        </ul>

        {/* Few-Shot Performance */}
        <div className="my-8 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900/50">
          <h4 className="text-sm font-sans font-bold uppercase tracking-wider text-neutral-500 mb-6">
            Figure 5: Few-Shot Pipeline — Performance by Bias Category
          </h4>
          <FewShotPerformance />
        </div>

        <div className="flex p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg gap-3 my-6">
          <span className="text-purple-600 font-bold shrink-0 font-sans text-sm">
            🏆 Result:
          </span>
          <p className="text-sm text-purple-900 dark:text-purple-200">
            The few-shot approach demonstrated{" "}
            <strong>superior generalization</strong> over fine-tuned models,
            with the ability to detect <strong>intersectional biases</strong>,
            provide granular sub-type classifications across 11 categories, and
            generate human-readable explanations — making it suitable for
            production AI auditing workflows.
          </p>
        </div>
      </section>

      {/* ================================================================ */}
      {/* INTERACTIVE: FEW-SHOT ANALYZER                                  */}
      {/* ================================================================ */}
      <section id="experiment-3-analyzer" className="my-16 scroll-mt-20">
        <div className="border rounded-xl overflow-hidden shadow-sm bg-neutral-50 dark:bg-neutral-900">
          <div className="bg-white dark:bg-black p-4 border-b text-xs font-mono text-neutral-500 uppercase tracking-wider flex justify-between items-center">
            <span>
              Figure 6: Few-Shot GPT-4o Bias Detection Pipeline (Interactive)
            </span>
            <span className="text-green-600 flex items-center gap-1">
              ● Live Model
            </span>
          </div>
          <div className="p-0">
            <BiasChecker />
          </div>
          <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border-t text-sm text-neutral-600 dark:text-neutral-400 italic">
            <strong>Figure 6.</strong> The deployed few-shot prompting pipeline
            allowing real-time bias detection on clinical vignettes. Detects 4
            bias categories with 11 sub-types, provides evidence,
            recommendations, and audit scoring.
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* DISCUSSION                                                      */}
      {/* ================================================================ */}
      <section className="mb-16">
        <h2>6. Discussion</h2>
        <p>
          The system can be integrated into a recurring evaluation harness to
          run periodic bias detection on newly generated vignettes and track
          model drift. Including a short rationale encourages transparent
          mapping between a label and the text, supporting annotation
          calibration.
        </p>

        <ApproachComparisonChart />

        <h3>Limitations</h3>
        <p>
          Synthetic data is not ground truth for real-world deployment. Common
          risks include style artifacts (model-specific phrasing) and incomplete
          coverage of real ABIM item-writing norms. Future work will involve
          blending synthetic data with carefully governed de-identified
          real-world text.
        </p>
      </section>

      {/* ================================================================ */}
      {/* REFERENCES                                                      */}
      {/* ================================================================ */}
      <section className="mb-16 pt-12 border-t border-neutral-100 dark:border-neutral-800">
        <h2 className="text-xl mb-8">Selected References</h2>
        <div className="space-y-6">
          <div className="flex gap-4 group">
            <span className="text-neutral-400 font-mono text-sm shrink-0">
              [1]
            </span>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors">
              Obermeyer, Z., Powers, B., Vogeli, C., &amp; Mullainathan, S.
              (2019). Dissecting racial bias in an algorithm used to manage the
              health of populations. <em>Science</em>, 366(6464), 447–453.
            </p>
          </div>
          <div className="flex gap-4 group">
            <span className="text-neutral-400 font-mono text-sm shrink-0">
              [2]
            </span>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors">
              Alsentzer, E., Murphy, J., Boag, W., et al. (2019). Publicly
              available clinical BERT embeddings. In{" "}
              <em>Proceedings of the 2nd Clinical NLP Workshop</em> (pp. 72–78).
              ACL.
            </p>
          </div>
          <div className="flex gap-4 group">
            <span className="text-neutral-400 font-mono text-sm shrink-0">
              [3]
            </span>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors">
              Liu, Y., Ott, M., Goyal, N., et al. (2019). RoBERTa: A Robustly
              Optimized BERT Pretraining Approach.{" "}
              <em>arXiv preprint arXiv:1907.11692</em>.
            </p>
          </div>
          <div className="flex gap-4 group">
            <span className="text-neutral-400 font-mono text-sm shrink-0">
              [4]
            </span>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors">
              Brown, T. B., Mann, B., Ryder, N., et al. (2020). Language Models
              are Few-Shot Learners. In{" "}
              <em>Advances in Neural Information Processing Systems</em> (Vol.
              33).
            </p>
          </div>
          <div className="flex gap-4 group">
            <span className="text-neutral-400 font-mono text-sm shrink-0">
              [5]
            </span>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors">
              Rotenstein, L. S., et al. (2021). Differences in Narrative
              Evaluations of Internal Medicine Residents by Gender and Race.{" "}
              <em>JAMA Network Open</em>, 4(9).
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FOOTER / CITATION                                               */}
      {/* ================================================================ */}
      <footer className="mt-20 pt-8 border-t border-dotted border-neutral-300 dark:border-neutral-700 text-sm text-neutral-500">
        <p className="mb-2 font-bold">Recommended Citation For This Paper:</p>
        <p className="font-mono bg-neutral-100 dark:bg-neutral-800 p-3 rounded text-xs overflow-x-auto whitespace-pre-wrap">
          Sharma, S. (2026). ABIM AI Bias Checker: A Scalable Framework for
          Detecting Bias in Medical Assessments. ABIM Technical Report.
        </p>
      </footer>
    </article>
  );
}
