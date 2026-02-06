"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Target,
  Zap,
  BarChart3,
  Database,
  FileText,
  Stethoscope,
  Users,
  Globe,
  BrainCircuit,
  MessageSquareWarning,
  Scale,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  FlaskConical,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Navbar from "@/components/Navbar";
import BiasChecker from "@/components/BiasChecker";

export default function OnePageWebsite() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-success/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/5 border border-primary/20 backdrop-blur-sm mb-8">
              <Sparkles size={16} className="text-primary" />
              <span className="text-sm font-bold tracking-wide text-neutral-700 dark:text-neutral-300">
                Next-Generation Fairness Audit
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-extrabold tracking-tight mb-8 leading-[1.05]">
              Exposing Bias in <br />
              <span className="gradient-text drop-shadow-sm">
                Healthcare Assessment.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
              ABIM BiasGuard leverages task-specific AI to ensure fairness and
              professionalism in clinical vignettes and trainee evaluation
              narratives.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="#analyzer">
                <Button
                  variant="primary"
                  size="lg"
                  className="px-12 h-16 text-lg rounded-2xl shadow-xl shadow-primary/20"
                >
                  Analyze Content <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
              <a href="#research">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-12 h-16 text-lg rounded-2xl bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700"
                >
                  Read the Research
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Analyzer CTA Section */}
      <section
        id="analyzer"
        className="py-24 bg-neutral-50/50 dark:bg-neutral-900/20 border-y border-neutral-200 dark:border-neutral-800 scroll-mt-24"
      >
        <div className="container max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">
              Ready to{" "}
              <span className="gradient-text">Audit Your Assessment?</span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
              Launch our advanced diagnostic tool to detect implicit bias in
              your clinical narratives with real-time feedback.
            </p>
            <Link href="/analyze">
              <Button
                variant="primary"
                size="lg"
                className="px-16 h-20 text-xl rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
              >
                <Zap className="mr-3 w-6 h-6" />
                Launch Analyzer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Research & Stats Section */}
      <section id="research" className="py-32 scroll-mt-24">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4">
                The Evidence
              </h2>
              <h3 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">
                Data-Driven <br />
                Assessment Fairness.
              </h3>
              <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-10 leading-relaxed font-medium">
                Research shows that pediatric and internal medicine narratives
                often carry implicit bias. Our model was trained on thousands of
                validated clinical samples to identify these subtle patterns
                that traditional manual reviews often miss.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: <Database className="text-blue-500" />,
                    title: "3.5k+ Validated Samples",
                    desc: "Trained on peer-reviewed clinical vignettes and feedback narratives.",
                  },
                  {
                    icon: <CheckCircle2 className="text-success" />,
                    title: "98.6% Classification Accuracy",
                    desc: "State-of-the-art performance in bias category assignment.",
                  },
                  {
                    icon: <FlaskConical className="text-violet-500" />,
                    title: "Explainable Methodology",
                    desc: "Beyond labels—we provide clinical rationales for every flag.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-neutral-950/80 border border-neutral-100 dark:border-neutral-800 shadow-xl shadow-neutral-200/50 dark:shadow-none backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group"
                  >
                    <div className="shrink-0 p-3 rounded-xl bg-primary/5 dark:bg-white/10 h-fit group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-neutral-800 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              className="relative aspect-square lg:aspect-auto h-full min-h-[500px] rounded-[40px] overflow-hidden bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950 border border-white/50 dark:border-neutral-800 shadow-2xl"
            >
              {/* Dark Gradient Background (Dark Mode Only) */}
              <div className="absolute inset-0 bg-transparent dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] dark:from-neutral-800/50 dark:via-neutral-950 dark:to-neutral-950 pointer-events-none transition-colors duration-300" />

              {/* Ambient Glows */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 dark:bg-primary/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-normal" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/20 dark:bg-secondary/10 rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-normal" />

              <div className="absolute inset-0 p-12 flex flex-col justify-center gap-12 z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8 rounded-3xl text-center bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 backdrop-blur-md shadow-lg dark:shadow-inner">
                    <div className="text-5xl font-extrabold mb-2 font-display gradient-text dark:bg-gradient-to-br dark:from-white dark:to-neutral-400 dark:bg-clip-text dark:text-transparent">
                      92%
                    </div>
                    <div className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                      Precision
                    </div>
                  </div>
                  <div className="p-8 rounded-3xl text-center bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 backdrop-blur-md shadow-lg dark:shadow-inner">
                    <div className="text-5xl font-extrabold mb-2 font-display gradient-text dark:bg-gradient-to-br dark:from-white dark:to-neutral-400 dark:bg-clip-text dark:text-transparent">
                      89%
                    </div>
                    <div className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                      Recall
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-3xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 backdrop-blur-md shadow-xl dark:shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-bold text-neutral-800 dark:text-white">
                      Benchmarking Performance
                    </span>
                    <BarChart3 size={20} className="text-primary" />
                  </div>
                  <div className="space-y-5">
                    {[
                      { l: "RoBERTa (Ours)", v: "100%", p: "98.6%" },
                      { l: "BERT-Base", v: "82%", p: "82.1%" },
                      { l: "Human Review", v: "65%", p: "65.4%" },
                    ].map((row, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-neutral-600 dark:text-neutral-300">
                          <span>{row.l}</span>
                          <span className="font-mono text-neutral-800 dark:text-white">
                            {row.p}
                          </span>
                        </div>
                        <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden shadow-inner">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{
                              width: row.v,
                            }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-gradient-to-r from-primary to-secondary shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Taxonomy Section */}
      <section
        id="taxonomy"
        className="py-32 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:bg-none dark:bg-neutral-950 text-neutral-900 dark:text-white overflow-hidden relative transition-colors duration-500"
      >
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="container max-w-7xl mx-auto px-6 relative">
          <div className="max-w-3xl mb-24">
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4">
              Bias Taxonomy
            </h2>
            <h3 className="text-4xl md:text-7xl font-extrabold mb-8 tracking-tight italic text-neutral-900 dark:text-white">
              A Comprehensive <br />
              Multidimensional Grid.
            </h3>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
              Our framework identifies 7 distinct types of bias used by
              clinicians and academic evaluators, categorized across
              patient-facing narratives and professional assessments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Users className="text-blue-400" />,
                title: "Demographic Bias",
                desc: "Attributing behavior or health outcomes to race, ethnicity, or culture through generalized assumptions.",
              },
              {
                icon: <MessageSquareWarning className="text-amber-400" />,
                title: "Clinical Stigma",
                desc: "Using judgmental language ('non-compliant', 'drug-seeking') that obscures clinical truth.",
              },
              {
                icon: <GraduationCap className="text-success" />,
                title: "Assessment Bias",
                desc: "Subjective framing of trainee behavior that lacks objective, observable evidence.",
              },
              {
                icon: <FileText className="text-violet-400" />,
                title: "Documentation",
                desc: "Inconsistent recording of facts filtered through the evaluator's implicit perception.",
              },
              {
                icon: <BrainCircuit className="text-pink-400" />,
                title: "Algorithmic Bias",
                desc: "Systemic bias mirrored in score reporting or automated risk stratification logic.",
              },
              {
                icon: <Scale className="text-emerald-400" />,
                title: "Structural Bias",
                desc: "Blaming individuals for outcomes rooted in systemic healthcare access limitations.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-[32px] bg-white dark:bg-white/5 border border-neutral-100 dark:border-white/10 shadow-xl shadow-neutral-200/50 dark:shadow-none backdrop-blur-sm group hover:border-primary/20 dark:hover:bg-white/10 dark:hover:border-white/20 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/5 dark:bg-white/10 flex items-center justify-center mb-8 border border-primary/10 dark:border-white/10 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">
                  {item.title}
                </h4>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </motion.div>
            ))}

            {/* CTA Card for Taxonomy */}
            <div className="p-8 rounded-[32px] bg-primary flex flex-col justify-end lg:col-span-2 group cursor-pointer relative overflow-hidden">
              <Shield className="absolute top-8 right-8 w-32 h-32 text-white opacity-10 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
              <div>
                <h4 className="text-3xl font-extrabold mb-4 text-white leading-tight">
                  View Full Research <br />
                  Taxonomy Paper
                </h4>
                <Link
                  href="/taxonomy"
                  className="inline-flex items-center text-sm font-bold text-white uppercase tracking-widest gap-2"
                >
                  Open Documentation <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="py-32 scroll-mt-24">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4">
                Integrity & Standard
              </h2>
              <h3 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                The ABIM Alignment.
              </h3>
            </div>

            <div className="relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20" />

              <div className="grid md:grid-cols-3 gap-12 relative">
                {[
                  {
                    title: "Neutral Description",
                    desc: "Language must remain objective and descriptive of behavior, avoiding adjectives like 'unprofessional' without context.",
                  },
                  {
                    title: "Evidence-Based",
                    desc: "Observations must be rooted in direct encounters, preventing secondary hearsay from influencing formal assessments.",
                  },
                  {
                    title: "Equitable Metrics",
                    desc: "Metrics are calibrated to ensure demographic background does not correlate with negative assessment markers.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="space-y-6 relative pt-4"
                  >
                    <div className="w-16 h-16 mx-auto bg-background rounded-full border-4 border-primary flex items-center justify-center font-display font-bold text-xl text-primary relative z-10 shadow-[0_0_0_8px_rgba(var(--background-rgb))]">
                      0{i + 1}
                    </div>
                    <div className="text-center px-4">
                      <h4 className="text-2xl font-bold tracking-tight mb-4">
                        {item.title}
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6 group cursor-pointer">
                <div className="bg-primary p-2 rounded-lg group-hover:rotate-12 transition-transform">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold font-display">
                  BiasGuard<span className="text-primary italic">.ai</span>
                </span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">
                Pioneering fairness in medical education through advanced NLP
                diagnostics.
              </p>
              <div className="flex gap-4">
                {/* Social placeholders */}
                <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
                  <Globe size={16} />
                </div>
                <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
                  <Users size={16} />
                </div>
              </div>
            </div>

            {[
              {
                title: "Product",
                links: [
                  "Features",
                  "Integrations",
                  "Enterprise",
                  "Security",
                  "Changelog",
                ],
              },
              {
                title: "Resources",
                links: [
                  "Documentation",
                  "API Reference",
                  "Research Paper",
                  "Community",
                  "Help Center",
                ],
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Blog", "Legal", "Contact"],
              },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-bold mb-6 text-neutral-900 dark:text-white">
                  {col.title}
                </h4>
                <ul className="space-y-4 text-sm text-neutral-500 dark:text-neutral-400">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="hover:text-primary transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-neutral-400 font-medium">
              © 2026 ABIM BiasGuard. Designed for Healthcare Excellence.
            </div>
            <div className="flex gap-8 text-xs font-medium text-neutral-500">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
