"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Sparkles, AlertCircle, Ban, ArrowLeft, ShieldCheck, Zap } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { sendMessage } from "@/lib/api";
import { cn } from "@/lib/utils";

const LOADING_STEPS = [
    "Scanning UU ITE & PDP...",
    "Analyzing regulatory context...",
    "Cross-referencing Permenkominfo...",
    "Formulating compliance advice...",
];

export default function ChatInterface() {
    const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loadingStep, setLoadingStep] = useState(0);
    const [threadId, setThreadId] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Generate or load thread ID
        let stored = localStorage.getItem("legalflow_thread_id");
        if (!stored) {
            if (typeof crypto !== 'undefined' && crypto.randomUUID) {
                stored = crypto.randomUUID();
            } else {
                stored = Date.now().toString(); // Fallback
            }
            localStorage.setItem("legalflow_thread_id", stored);
        }
        setThreadId(stored);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    // Loading Step Cycler
    useEffect(() => {
        if (!isLoading) {
            setLoadingStep(0);
            return;
        }
        const interval = setInterval(() => {
            setLoadingStep((prev) => (prev + 1) % LOADING_STEPS.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [isLoading]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
        setIsLoading(true);

        try {
            const data = await sendMessage(userMsg, threadId);
            setMessages((prev) => [...prev, { role: "ai", content: data.response }]);
            if (data.thread_id) {
                setThreadId(data.thread_id);
                localStorage.setItem("legalflow_thread_id", data.thread_id);
            }
        } catch (error) {
            setMessages((prev) => [...prev, { role: "ai", content: "⚠️ **Connection Error**: Unable to connect to LegalFlow Agent. Please ensure your query is specific and try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[100dvh] bg-legal-bg w-full max-w-5xl mx-auto shadow-2xl overflow-hidden border-x border-legal-text/5 relative font-sans">
            {/* Agent Header */}
            <div className="flex items-center justify-between p-4 bg-white/90 backdrop-blur-md border-b border-legal-text/10 z-10 sticky top-0 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    <div>
                        <h2 className="text-sm font-bold text-legal-text uppercase tracking-wide flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-legal-primary" />
                            Compliance Agent <span className="text-[10px] bg-legal-gold/20 text-legal-primary px-1.5 py-0.5 rounded border border-legal-gold/30">BETA</span>
                        </h2>
                    </div>
                </div>
                <button onClick={() => window.location.reload()} className="text-xs font-semibold text-legal-text/40 hover:text-legal-primary uppercase tracking-wider transition-colors">
                    New Session
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 scrollbar-hide bg-[#FCFBFA]">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-legal-text/30 space-y-4 animate-in fade-in duration-500">
                        <div className="p-4 bg-legal-bg rounded-full border border-legal-text/5 mb-2">
                            <Zap className="h-8 w-8 text-legal-gold" />
                        </div>
                        <p className="text-sm font-medium">Ready to analyze your software compliance.</p>
                    </div>
                )}
                {messages.map((m, i) => (
                    <ChatMessage key={i} role={m.role} content={m.content} />
                ))}

                {/* Agentic Loading State */}
                {isLoading && (
                    <div className="flex gap-4 p-4 items-start w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white border border-legal-gold/50 shadow-sm">
                            <Sparkles className="h-4 w-4 text-legal-gold animate-pulse" />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <span className="text-sm font-semibold text-legal-primary animate-pulse">
                                {LOADING_STEPS[loadingStep]}
                            </span>
                            <div className="h-1 w-24 bg-legal-text/5 rounded-full overflow-hidden">
                                <div className="h-full bg-legal-gold animate-[loading_2s_ease-in-out_infinite]" style={{ width: '100%' }} />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 md:p-6 bg-white border-t border-legal-text/10">
                <div className="flex gap-3 items-end relative">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder="Describe your software feature (e.g., 'I am building a fintech app with facial recognition...')"
                        className="flex-1 min-h-[56px] max-h-[200px] resize-none rounded-lg border border-legal-text/20 p-4 text-legal-text placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-legal-primary/20 focus:border-legal-primary transition-all bg-gray-50/50 text-sm font-medium"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="h-[56px] px-6 flex items-center justify-center rounded-lg bg-legal-primary text-white transition-all hover:bg-[#5D4037] hover:shadow-lg hover:shadow-legal-primary/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                    >
                        {isLoading ? (
                            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Send className="h-5 w-5" />
                        )}
                    </button>
                </div>
                <div className="text-center mt-3 flex justify-center gap-4 text-[10px] text-legal-text/30 font-medium tracking-wide">
                    <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Encrypted Session</span>
                    <span className="flex items-center gap-1">Not Legal Advice</span>
                </div>
            </div>
        </div>
    );
}
