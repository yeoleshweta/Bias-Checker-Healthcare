import React from "react";
import Link from "next/link";
import { ArrowRight, Shield, Target, Zap } from "lucide-react";
import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 bg-slate-50 section-boundary">
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center p-3 mb-10 rounded-2xl bg-white shadow-xl border border-neutral-200 animate-fade-in">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-6xl sm:text-7xl font-display font-extrabold text-neutral-900 mb-8 tracking-tighter animate-fade-in">
            Healthcare Assessment <br />{" "}
            <span className="text-primary italic">Perfected.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-neutral-600 mb-12 leading-relaxed max-w-3xl mx-auto font-medium animate-fade-in">
            ABIM BiasGuard deploys advanced AI to ensure fairness and
            professionalism in clinical vignettes and feedback narratives.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center animate-fade-in">
            <Link href="/analyze">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto px-10 h-14"
              >
                Analyze Content Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/research">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-10 h-14 bg-white"
              >
                View Research Data
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24 sm:py-32">
        <div className="text-center mb-24">
          <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4">
            The Platform
          </h2>
          <h3 className="text-4xl sm:text-6xl font-display font-extrabold text-neutral-900 leading-none">
            Built for Integrity.
          </h3>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Feature 1 */}
          <div className="soft-card p-12 group">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-primary transition-smooth border border-neutral-100 shadow-sm">
              <Target className="w-8 h-8 text-primary group-hover:text-white transition-smooth" />
            </div>
            <h4 className="text-3xl font-display font-bold text-neutral-900 mb-6 tracking-tight">
              Bias Taxonomy
            </h4>
            <p className="text-neutral-500 leading-relaxed text-lg font-medium">
              Mapping demographic stigma and documentation inconsistency through
              7 distinct clinical bias categories.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="soft-card p-12 group">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-emerald-600 transition-smooth border border-neutral-100 shadow-sm">
              <Zap className="w-8 h-8 text-emerald-600 group-hover:text-white transition-smooth" />
            </div>
            <h4 className="text-3xl font-display font-bold text-neutral-900 mb-6 tracking-tight">
              Explainable AI
            </h4>
            <p className="text-neutral-500 leading-relaxed text-lg font-medium">
              Transparent analysis with evidence-based rationale. Understand
              exactly why phrases are flagged.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="soft-card p-12 group">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-violet-600 transition-smooth border border-neutral-100 shadow-sm">
              <Shield className="w-8 h-8 text-violet-600 group-hover:text-white transition-smooth" />
            </div>
            <h4 className="text-3xl font-display font-bold text-neutral-900 mb-6 tracking-tight">
              Clinical Context
            </h4>
            <p className="text-neutral-500 leading-relaxed text-lg font-medium">
              Engineered for internal medicine certification, preserving
              professional assessment standards.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section with Clear Separation */}
      <section className="bg-slate-50 border-y border-neutral-200 py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16 text-center">
            <div>
              <div className="text-6xl font-display font-extrabold text-neutral-900 mb-4 tracking-tighter">
                3.5k+
              </div>
              <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">
                Clinical Samples
              </p>
            </div>
            <div>
              <div className="text-6xl font-display font-extrabold text-neutral-900 mb-4 tracking-tighter">
                7
              </div>
              <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">
                Bias Categories
              </p>
            </div>
            <div>
              <div className="text-6xl font-display font-extrabold text-neutral-900 mb-4 tracking-tighter">
                100%
              </div>
              <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">
                ABIM Alignment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-6 py-32 text-center">
        <h2 className="text-5xl font-display font-extrabold text-neutral-900 mb-10 tracking-tight">
          Ensure Fairness Today.
        </h2>
        <Link href="/analyze">
          <Button variant="primary" size="lg" className="px-16 h-16 text-xl">
            Go to Analyzer <ArrowRight className="ml-3 w-6 h-6" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
