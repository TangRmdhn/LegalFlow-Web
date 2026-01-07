"use client";

import { useState } from "react";
import { ShieldCheck, BookOpen, BrainCircuit, ChevronRight, Zap } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";

const KNOWLEDGE_BASE = [
  { id: 1, title: "UU ITE & Perubahannya", desc: "UU No 11/2008, 19/2016, 1/2024" },
  { id: 2, title: "Pelindungan Data Pribadi", desc: "UU No 27/2022 (PDP)" },
  { id: 3, title: "Hak Cipta Software", desc: "UU No 28/2014" },
  { id: 4, title: "Penyelenggaraan Sistem Elektronik", desc: "PP No 71/2019 (PSTE)" },
  { id: 5, title: "Perdagangan Sistem Elektronik", desc: "PP No 80/2019 (PMSE)" },
  { id: 6, title: "PSE Lingkup Privat", desc: "Permenkominfo No 5/2020" },
];

export default function Home() {
  const [isChatting, setIsChatting] = useState(false);

  if (isChatting) {
    return <ChatInterface />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-legal-bg text-legal-text font-sans selection:bg-legal-gold/20">

      {/* Navbar / Header */}
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center max-w-7xl mx-auto z-10">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-legal-primary">
          <ShieldCheck className="h-6 w-6" />
          <span>LegalFlow</span>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-legal-gold/10 border border-legal-gold/20 text-xs font-medium text-legal-primary/80">
          <Zap className="h-3 w-3 fill-legal-gold text-legal-gold" />
          AI Agent Active
        </div>
      </nav>

      <div className="max-w-5xl px-6 py-20 w-full space-y-16 animate-in fade-in slide-in-from-bottom-5 duration-700">

        {/* Hero Section */}
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-legal-primary/5 border border-legal-primary/10 text-sm font-medium text-legal-primary mb-2">
            <BrainCircuit className="h-4 w-4" />
            <span>AI Software Compliance Agent</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-legal-text leading-[1.1]">
            Ensure Your Software is <br />
            <span className="text-legal-primary">Legally Compliant</span> in Indonesia.
          </h1>

          <p className="text-lg md:text-xl text-legal-text/70 leading-relaxed max-w-2xl mx-auto">
            An autonomous agent specialized in UU ITE, PDP, and PSE regulations.
            Validate your product features against Indonesian law before release.
          </p>

          <div className="pt-4">
            <button
              onClick={() => setIsChatting(true)}
              className="group relative inline-flex items-center justify-center gap-3 rounded-lg bg-legal-primary px-8 py-4 text-base font-semibold text-white transition-all hover:bg-[#5D4037] hover:shadow-lg hover:shadow-legal-primary/20 active:translate-y-0.5"
            >
              Start Compliance Check
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Knowledge Base Section */}
        <div className="border-t border-legal-text/10 pt-16">
          <div className="text-center mb-10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-legal-text/40 mb-2">
              Active Regulatory Knowledge
            </h3>
            <p className="text-legal-text/60">Verified sources scanned by the agent.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {KNOWLEDGE_BASE.map((item) => (
              <div key={item.id} className="flex items-start gap-4 p-5 rounded-xl border border-legal-text/5 bg-white/50 hover:bg-white hover:border-legal-gold/30 hover:shadow-md transition-all group">
                <div className="mt-1 p-2 rounded-lg bg-legal-bg text-legal-primary group-hover:bg-legal-primary group-hover:text-white transition-colors">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-legal-text group-hover:text-legal-primary transition-colors">{item.title}</h4>
                  <p className="text-sm text-legal-text/60 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
