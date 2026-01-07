export interface ChatResponse {
    response: string;
    thread_id: string;
}

export async function sendMessage(message: string, threadId: string): Promise<ChatResponse> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 30000); // 30s timeout

    try {
        const res = await fetch("https://samsas-legal-flow.hf.space/api/v1/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message, thread_id: threadId }),
            signal: controller.signal,
        });

        clearTimeout(id);

        if (!res.ok) {
            const errorText = await res.text();

            // Handle Rate Limit specifically
            if (res.status === 429) {
                // Try to parse JSON body for specific message if possible, or use default
                let detail = "Daily limit reached.";
                try {
                    const jsonError = JSON.parse(errorText);
                    if (jsonError.detail) detail = jsonError.detail;
                } catch (e) { /* ignore */ }

                const error = new Error(detail);
                (error as any).status = 429; // Attach status to error object
                throw error;
            }

            throw new Error(`API Error: ${res.status} ${errorText}`);
        }

        const data = await res.json();
        console.log("API Response:", data);
        return data;
    } catch (error) {
        clearTimeout(id);
        console.error("Failed to send message:", error);
        throw error;
    }
}
