import React from "react";
import { BookOpen } from "lucide-react";

const biasTypes = [
  {
    name: "No Bias",
    color: "bg-green-100 border-green-300 text-green-800",
    description:
      "Neutral, patient-centered language without stereotypes or stigmatizing descriptors.",
    examples: [
      "The patient declined the procedure after a discussion of risks.",
      "We will review current eating patterns and identify specific barriers to glucose management.",
    ],
    impact:
      "Represents the gold standard for professional, equitable clinical documentation and assessment language.",
  },
  {
    name: "Demographic Bias",
    color: "bg-red-100 border-red-300 text-red-800",
    description:
      "Stereotypes or assumptions tied to race, ethnicity, nationality, cultural background, or other demographic characteristics.",
    examples: [
      "Non-adherence is likely due to cultural dietary preferences common in this demographic.",
      "Given the patient's Hispanic background, success is unlikely.",
    ],
    impact:
      "Perpetuates harmful stereotypes and can lead to differential treatment and health inequities.",
  },
  {
    name: "Clinical Stigma Bias",
    color: "bg-orange-100 border-orange-300 text-orange-800",
    description:
      "Stigmatizing language about mental health conditions, obesity, pain management, substance use, or insurance status.",
    examples: [
      "Drug-seeking behavior is evident.",
      "The patient is non-compliant with recommended treatment.",
    ],
    impact:
      "Undermines therapeutic relationships and may discourage patients from seeking care.",
  },
  {
    name: "Assessment Bias",
    color: "bg-purple-100 border-purple-300 text-purple-800",
    description:
      "Biased evaluation framing in clinical assessments or case reviews that lacks objectivity.",
    examples: [
      "Resident showed unprofessional behavior and poor judgment.",
      "Candidate lacks competence in all areas.",
    ],
    impact:
      "Can unfairly penalize trainees and undermine professional development pathways.",
  },
  {
    name: "Algorithmic Bias",
    color: "bg-blue-100 border-blue-300 text-blue-800",
    description:
      "Bias introduced through AI/automated systems, biased scoring logic, or unfair risk stratification.",
    examples: [
      "Algorithmic risk score indicates high likelihood of non-adherence.",
      "Automated flagging system identifies patient as high-risk resource user.",
    ],
    impact:
      "Can systematically disadvantage certain patient populations through opaque, biased computational processes.",
  },
  {
    name: "Documentation Bias",
    color: "bg-yellow-100 border-yellow-300 text-yellow-800",
    description:
      "Biased charting language or unnecessary negative descriptors that go beyond clinically relevant information.",
    examples: [
      "Patient appears unmotivated and seems uninterested in improving health.",
      "Patient claims to have pain but physical exam is unremarkable.",
    ],
    impact:
      "Influences subsequent clinicians' perceptions and may lead to suboptimal care decisions.",
  },
  {
    name: "Structural Bias",
    color: "bg-pink-100 border-pink-300 text-pink-800",
    description:
      "Attributes individual blame for systemic barriers, healthcare access inequities, or resource limitations.",
    examples: [
      "Patient lives in a high-crime area with limited resources.",
      "Lack of access to healthy food options in the neighborhood contributes to obesity.",
    ],
    impact:
      "Obscures systemic solutions by framing structural problems as individual failings.",
  },
];

export default function TaxonomyPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-neutral-50">
              Bias Taxonomy Guide
            </h1>
          </div>
          <p className="text-gray-600 dark:text-neutral-400">
            Understanding the bias categories in clinical documentation. While
            the model classifies into 4 categories (No Bias, Demographic,
            Clinical Stigma, Assessment), this guide covers extended bias types
            for educational purposes.
          </p>
        </div>

        {/* Taxonomy Cards */}
        <div className="space-y-6">
          {biasTypes.map((bias, index) => (
            <div
              key={index}
              className="bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-gray-200 dark:border-neutral-700 overflow-hidden hover:shadow-lg transition-smooth"
            >
              <div
                className={`${bias.color} px-6 py-4 border-l-4 border-current`}
              >
                <h2 className="text-xl font-bold">{bias.name}</h2>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-neutral-200 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 dark:text-neutral-400">
                    {bias.description}
                  </p>
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-neutral-200 mb-2">
                    Examples
                  </h3>
                  <ul className="space-y-2">
                    {bias.examples.map((example, idx) => (
                      <li
                        key={idx}
                        className="text-gray-600 dark:text-neutral-400 italic pl-4 border-l-2 border-gray-300 dark:border-neutral-600"
                      >
                        &quot;{example}&quot;
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-neutral-200 mb-2">
                    Why It Matters
                  </h3>
                  <p className="text-gray-600 dark:text-neutral-400">
                    {bias.impact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
