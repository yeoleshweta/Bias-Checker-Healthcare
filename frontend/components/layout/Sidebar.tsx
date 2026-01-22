"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileSearch,
  Activity,
  History,
  BookOpen,
  Shield,
} from "lucide-react";

const navItems = [
  { name: "Research Overview", href: "/", icon: Home },
  { name: "Analyze Artifact", href: "/analyze", icon: FileSearch },
  { name: "Robustness Engine", href: "/robustness", icon: Activity },
  { name: "Audit History", href: "/history", icon: History },
  { name: "Taxonomy Guide", href: "/taxonomy", icon: BookOpen },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-50 border-r border-neutral-200 z-50">
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-8 border-b border-neutral-200 bg-white">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-smooth">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-neutral-900 leading-none">
                BiasGuard
              </h1>
              <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-1">
                Research Platform
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto font-sans">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-smooth group ${
                  isActive
                    ? "bg-white text-primary font-bold shadow-md shadow-primary/5 border border-primary/10"
                    : "text-neutral-500 hover:bg-white hover:text-neutral-900 border border-transparent"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive
                      ? "text-primary"
                      : "text-neutral-400 group-hover:text-neutral-600"
                  }`}
                />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-200 bg-white">
          <div className="bg-slate-50 rounded-2xl p-4 text-center border border-neutral-100">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
              v2.0 Premium
            </p>
            <p className="text-[11px] text-neutral-600 mt-1 font-semibold italic">
              Advanced AI Engine Active
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
