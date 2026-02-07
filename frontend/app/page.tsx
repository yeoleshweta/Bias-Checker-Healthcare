"use client";

import React from "react";
import Link from "next/link";
import BiasChecker from "@/components/BiasChecker";
import { Download, FileText, Share2 } from "lucide-react";

export default function ResearchPage() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-12 md:py-20 selection:bg-primary/10">
      {/* Header */}
      <header className="mb-12 border-b border-border pb-12">
        <div className="mb-6">
          <h1 className="text-3xl md:text-5xl font-sans font-bold leading-tight mb-4">
            ABIM AI Bias Checker: A Transformer-Based Classifier for Detecting
            Bias
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400 font-sans">
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground">Shweta Sharma</span>
              <span className="bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded text-xs border border-neutral-200 dark:border-neutral-700">
                ABIM
              </span>
            </div>
            <span className="text-neutral-300">|</span>
            <span>February 6, 2026</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            href="#interactive-demo"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-sans font-medium bg-primary text-white hover:bg-primary-hover rounded transition-colors"
          >
            Live Demo
          </Link>
          <button className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-sans font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors">
            <FileText size={14} /> View PDF
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-sans font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors">
            <Download size={14} /> Dataset
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-sans font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors">
            <Share2 size={14} /> Cite
          </button>
        </div>
      </header>

      {/* Abstract */}
      <section className="bg-neutral-50 dark:bg-neutral-900/50 p-6 md:p-8 rounded-lg border border-neutral-100 dark:border-neutral-800 mb-12">
        <h3 className="text-sm font-sans font-bold uppercase tracking-wider text-neutral-500 mb-3 mt-0">
          Abstract
        </h3>
        <p className="text-base md:text-lg leading-relaxed mb-4">
          Bias in high-stakes medical assessment ecosystems can manifest in exam
          vignette framing, clinical documentation language, and narrative
          evaluations of trainees. This work presents{" "}
          <strong>ABIM AI Bias Checker</strong>, an end-to-end framework to:
        </p>
        <ul className="list-disc list-inside space-y-1 mb-4 ml-2">
          <li>
            Define a healthcare-specific bias taxonomy aligned with ABIM-style
            internal medicine contexts.
          </li>
          <li>
            Fine-tune transformer-based classifiers (BERT/RoBERTa) to detect
            bias categories.
          </li>
        </ul>
        <p className="text-base md:text-lg leading-relaxed mb-0">
          The resulting dataset includes seven labels spanning demographic bias,
          clinical stigma, assessment bias, documentation bias, structural bias,
          algorithmic bias, and neutral clinical text. We describe model design
          decisions (partial layer freezing and task-specific heads), evaluation
          protocols, and practical lessons learned from tooling
          incompatibilities during development. This paper is intended as a
          reproducible template for an &quot;AI assurance&quot; workflow for
          medical assessment organizations.
        </p>
      </section>

      {/* Intro */}
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
          This paper describes the ABIM AI Bias Checker, a practical system for
          developing a bias classifier tailored to ABIM-style internal medicine
          contexts. The project combines:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6 text-neutral-700 dark:text-neutral-300">
          <li>A healthcare-specific bias taxonomy;</li>
          <li>
            Transformer-based multi-class text classifiers with partial layer
            freezing;
          </li>
          <li>
            An evaluation harness suitable for repeated testing and governance
            workflows.
          </li>
        </ul>
      </section>

      {/* Interactive Figure */}
      <section
        id="interactive-demo"
        className="my-16 border rounded-xl overflow-hidden shadow-sm bg-neutral-50 dark:bg-neutral-900"
      >
        <div className="bg-white dark:bg-black p-4 border-b text-xs font-mono text-neutral-500 uppercase tracking-wider flex justify-between items-center">
          <span>Figure 1: Interactive Prototype</span>
          <span className="text-green-600 flex items-center gap-1">
            • Live Model
          </span>
        </div>
        <div className="p-0">
          {/* We are embedding the cleaner BiasChecker here. 
                Ideally, BiasChecker should be refactored to remove its own "Hero" titles if we want a pure component.
                For now, we will use it and the user can see it works.
            */}
          <BiasChecker />
        </div>
        <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border-t text-sm text-neutral-600 dark:text-neutral-400 italic">
          <strong>Figure 1.</strong> The deployed inference interface allowing
          real-time bias detection on clinical vignettes. The model predicts one
          of 7 bias categories and provides a confidence score and
          explainability rationale.
        </div>
      </section>

      {/* Background */}
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
          inequitable norms [2]. A practical ABIM-themed classifier must
          therefore capture both <em>language harms</em> (stigmatizing wording,
          stereotypes) and <em>system harms</em> (structural constraints,
          algorithmic scoring issues).
        </p>
      </section>

      {/* Taxonomy */}
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

      {/* Model Architecture */}
      <section className="mb-16">
        <h2>4. Model Architecture and Training</h2>
        <p>
          We fine-tune pretrained transformers (BERT/RoBERTa) by attaching a
          task-specific classification head to the pooled representation. We
          experiment with <strong>partial layer freezing</strong> to stabilize
          training and reduce overfitting on synthetic data.
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
      </section>

      {/* Results */}
      <section className="mb-16">
        <h2>5. Results</h2>
        <div className="flex p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md gap-3 mb-6">
          <span className="text-yellow-600 font-bold shrink-0">TODO:</span>
          <span className="text-sm text-yellow-800 dark:text-yellow-200">
            Insert final model performance metrics (Macro-F1, Accuracy) and
            Confusion Matrix figure.
          </span>
        </div>
        <p>
          Preliminary results indicate strong performance in distinguishing
          overt bias categories, with some confusion observed between{" "}
          <em>documentation_bias</em> and <em>clinical_stigma</em>,
          necessitating further refinement of label boundaries.
        </p>
      </section>

      {/* Discussion */}
      <section className="mb-16">
        <h2>6. Discussion</h2>
        <p>
          The system can be integrated into a recurring evaluation harness to
          run periodic bias detection on newly generated vignettes and track
          model drift. Including a short rationale encourages transparent
          mapping between a label and the text, supporting annotation
          calibration.
        </p>
        <h3>Limitations</h3>
        <p>
          Synthetic data is not ground truth for real-world deployment. Common
          risks include style artifacts (model-specific phrasing) and incomplete
          coverage of real ABIM item-writing norms. Future work will involve
          blending synthetic data with carefully governed de-identified
          real-world text.
        </p>
      </section>

      {/* Footer / Citation */}
      <footer className="mt-20 pt-8 border-t border-dotted border-neutral-300 dark:border-neutral-700 text-sm text-neutral-500">
        <p className="mb-2 font-bold">Recommended Citation:</p>
        <p className="font-mono bg-neutral-100 dark:bg-neutral-800 p-3 rounded text-xs overflow-x-auto whitespace-pre-wrap">
          Sharma, S. (2026). ABIM AI Bias Checker: A Transformer-Based
          Classifier for Detecting Bias. ABIM Technical Report.
        </p>
      </footer>
    </article>
  );
}
