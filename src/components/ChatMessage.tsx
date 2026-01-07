import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { User, ShieldCheck, Copy } from "lucide-react";

interface ChatMessageProps {
    role: "user" | "ai";
    content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
    const isUser = role === "user";

    return (
        <div
            className={cn(
                "flex w-full gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
                isUser ? "flex-row-reverse" : "flex-row"
            )}
        >
            {/* Avatar */}
            <div
                className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border shadow-sm",
                    isUser
                        ? "bg-legal-text border-legal-text text-white"
                        : "bg-white border-legal-gold/40 text-legal-primary shadow-legal-gold/10"
                )}
            >
                {isUser ? <User className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
            </div>

            {/* Bubble */}
            <div
                className={cn(
                    "relative max-w-[90%] md:max-w-[80%] rounded-xl px-5 py-4 shadow-sm text-sm leading-relaxed",
                    isUser
                        ? "bg-legal-text text-white rounded-tr-none"
                        : "bg-white text-legal-text border border-legal-text/5 rounded-tl-none ring-1 ring-legal-text/5"
                )}
            >
                {/* Label only for AI */}
                {!isUser && (
                    <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-legal-primary/60 flex items-center gap-1">
                        AI Compliance Analysis
                    </div>
                )}

                {isUser ? (
                    <p className="whitespace-pre-wrap">{content}</p>
                ) : (
                    <div className="markdown prose prose-sm prose-p:leading-relaxed prose-headings:font-bold prose-headings:text-legal-primary prose-a:text-legal-primary prose-a:font-semibold prose-strong:text-legal-text hover:prose-a:underline max-w-none">
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
}
