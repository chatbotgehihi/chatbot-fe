"use client";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/api/chat';
const MAX_INPUT_HEIGHT = 200;

type Message = {
    id: string;
    role: 'user' | 'ai';
    content: string;
    error?: string;
};

const STARTERS = [
    { title: 'Giải thích dễ hiểu', prompt: 'Giải thích blockchain hoạt động thế nào bằng một ví dụ đời thường.' },
    { title: 'Viết code', prompt: 'Viết hàm JavaScript kiểm tra một chuỗi có phải số điện thoại di động Việt Nam hợp lệ không.' },
    { title: 'Soạn thư', prompt: 'Soạn email xin nghỉ phép 2 ngày gửi quản lý, giọng lịch sự và ngắn gọn.' },
    { title: 'Lên kế hoạch', prompt: 'Gợi ý lịch trình 3 ngày ở Đà Lạt cho nhóm 4 người, chi phí vừa phải.' },
];

const newId = () => Math.random().toString(36).slice(2, 10);

async function askModel(message: string): Promise<string> {
    let res: Response;
    try {
        res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });
    } catch {
        throw new Error('Chưa gửi được. Không kết nối được máy chủ, kiểm tra mạng rồi thử lại.');
    }

    let data: { message?: unknown; error?: unknown } = {};
    try {
        data = await res.json();
    } catch {
        // Máy chủ trả về nội dung không phải JSON
    }
    if (!res.ok) {
        throw new Error(`Không nhận được câu trả lời. ${typeof data.error === 'string' ? data.error : `Máy chủ báo lỗi (${res.status}).`}`);
    }
    if (typeof data.message !== 'string' || !data.message.trim()) {
        throw new Error('Không nhận được câu trả lời. Gemini chưa trả về nội dung hợp lệ.');
    }
    return data.message;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const mainRef = useRef<HTMLElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Tự động cuộn xuống khi có tin nhắn mới
    useEffect(() => {
        const el = mainRef.current;
        if (!el) return;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const frame = requestAnimationFrame(() => el.scrollTo({ top: el.scrollHeight, behavior: reduced ? 'auto' : 'smooth' }));
        return () => cancelAnimationFrame(frame);
    }, [messages, isLoading]);

    // Ô nhập tự giãn theo nội dung
    useEffect(() => {
        const el = inputRef.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = `${Math.min(el.scrollHeight, MAX_INPUT_HEIGHT)}px`;
    }, [input]);

    const request = useCallback(async (userMsgId: string, text: string) => {
        setIsLoading(true);
        try {
            const reply = await askModel(text);
            // Đặt câu trả lời ngay dưới câu hỏi của nó (quan trọng khi thử lại tin cũ)
            setMessages((prev) => {
                const at = prev.findIndex((m) => m.id === userMsgId) + 1;
                return [...prev.slice(0, at), { id: newId(), role: 'ai', content: reply }, ...prev.slice(at)];
            });
        } catch (error) {
            const errorText = error instanceof Error ? error.message : 'Đã có lỗi xảy ra.';
            setMessages((prev) => prev.map((m) => (m.id === userMsgId ? { ...m, error: errorText } : m)));
        } finally {
            setIsLoading(false);
            inputRef.current?.focus();
        }
    }, []);

    const send = (text: string) => {
        const content = text.trim();
        if (!content || isLoading) return;
        const id = newId();
        setMessages((prev) => [...prev, { id, role: 'user', content }]);
        setInput('');
        request(id, content);
    };

    const retry = (msg: Message) => {
        if (isLoading) return;
        setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, error: undefined } : m)));
        request(msg.id, msg.content);
    };

    const reset = () => {
        setMessages([]);
        setInput('');
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        // Bỏ qua Enter khi bộ gõ tiếng Việt đang ghép dấu
        if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
            e.preventDefault();
            send(input);
        }
    };

    const isEmpty = messages.length === 0;

    return (
        <div className="flex h-dvh flex-col bg-bg text-fg">
            <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-line px-4 md:px-6">
                <div className="flex min-w-0 items-baseline gap-2.5">
                    <h1 className="truncate text-[15px] font-semibold tracking-[-0.01em]">Gemini AI Studio</h1>
                    <span className="hidden truncate text-[13px] text-fg-muted sm:inline">3.1 Flash-Lite</span>
                </div>
                <button
                    type="button"
                    onClick={reset}
                    disabled={isEmpty || isLoading}
                    className="flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg disabled:pointer-events-none disabled:opacity-40"
                >
                    <Icon><path d="M12 20h9" /><path d="M16.4 3.6a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></Icon>
                    <span className="hidden sm:inline">Cuộc trò chuyện mới</span>
                    <span className="sr-only sm:hidden">Cuộc trò chuyện mới</span>
                </button>
            </header>

            <main ref={mainRef} className="flex-1 overflow-y-auto [scrollbar-gutter:stable_both-edges]" aria-live="polite">
                {isEmpty ? (
                    <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col justify-center px-4 py-8 md:px-6 md:py-10">
                        <Mark className="mb-5 size-8 text-accent" />
                        <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-semibold leading-tight tracking-[-0.025em] text-balance">
                            Hôm nay bạn cần gì?
                        </h2>
                        <p className="mt-2 text-base text-fg-muted">
                            Hỏi bất cứ điều gì, Gemini 3.1 Flash-Lite sẽ trả lời bạn.
                        </p>
                        <div className="mt-8 grid gap-2.5 sm:grid-cols-2">
                            {STARTERS.map((s) => (
                                <button
                                    key={s.title}
                                    type="button"
                                    onClick={() => send(s.prompt)}
                                    className="flex flex-col items-start justify-start rounded-xl border border-line bg-surface px-4 py-3 text-left transition-colors hover:border-line-strong hover:bg-surface-2 sm:py-3.5"
                                >
                                    <span className="block text-sm font-medium">{s.title}</span>
                                    <span className="mt-1 line-clamp-2 text-sm leading-relaxed text-fg-muted">{s.prompt}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="mx-auto w-full max-w-3xl px-4 pb-8 pt-8 md:px-6">
                        <ol className="flex flex-col gap-8">
                            {messages.map((msg) =>
                                msg.role === 'user' ? (
                                    <UserTurn key={msg.id} msg={msg} onRetry={() => retry(msg)} disabled={isLoading} />
                                ) : (
                                    <AiTurn key={msg.id} msg={msg} />
                                ),
                            )}
                            {isLoading && (
                                <li className="turn-in flex items-center gap-3" role="status">
                                    <Mark className="mark-thinking size-5 shrink-0 text-accent" />
                                    <span className="text-breathe text-sm text-fg-muted">Đang soạn câu trả lời…</span>
                                </li>
                            )}
                        </ol>
                    </div>
                )}
            </main>

            <footer className="shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        send(input);
                    }}
                    className="mx-auto w-full max-w-3xl px-4 md:px-6"
                >
                    <div className="flex items-end gap-2 rounded-2xl border border-line bg-surface p-2 pl-4 shadow-composer transition-colors focus-within:border-line-strong">
                        <label htmlFor="chat-input" className="sr-only">Tin nhắn</label>
                        <textarea
                            id="chat-input"
                            ref={inputRef}
                            rows={1}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Nhắn cho Gemini…"
                            autoFocus
                            className="max-h-[200px] min-h-10 flex-1 resize-none bg-transparent py-2 text-[15px] leading-6 outline-none placeholder:text-fg-faint focus-visible:outline-none"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            aria-label="Gửi"
                            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-fg transition-[background-color,transform] duration-150 hover:bg-accent-hover active:scale-95 disabled:bg-surface-2 disabled:text-fg-faint"
                        >
                            <Icon className="size-[18px]" strokeWidth={2.25}><path d="M12 19V5" /><path d="m5 12 7-7 7 7" /></Icon>
                        </button>
                    </div>
                    <p className="py-2.5 text-center text-xs text-balance text-fg-faint">
                        Gemini không nhớ các tin nhắn trước và có thể trả lời sai. Hãy kiểm tra lại thông tin quan trọng.
                    </p>
                </form>
            </footer>
        </div>
    );
}

function UserTurn({ msg, onRetry, disabled }: { msg: Message; onRetry: () => void; disabled: boolean }) {
    return (
        <li className="turn-in flex flex-col items-end gap-2">
            <p className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl bg-surface-2 px-4 py-2.5 text-[15px] leading-relaxed md:max-w-[75%]">
                {msg.content}
            </p>
            {msg.error && (
                <div className="flex max-w-[85%] flex-wrap items-center justify-end gap-x-3 gap-y-1.5 text-sm md:max-w-[75%]" role="alert">
                    <span className="flex items-start gap-1.5 text-danger">
                        <Icon className="mt-0.5 size-4 shrink-0"><circle cx="12" cy="12" r="9" /><path d="M12 8v4.5" /><path d="M12 16h.01" /></Icon>
                        <span>{msg.error}</span>
                    </span>
                    <button
                        type="button"
                        onClick={onRetry}
                        disabled={disabled}
                        className="flex h-8 items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 font-medium transition-colors hover:bg-surface-2 disabled:opacity-40"
                    >
                        <Icon className="size-3.5"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></Icon>
                        Thử lại
                    </button>
                </div>
            )}
        </li>
    );
}

function AiTurn({ msg }: { msg: Message }) {
    const { copied, copy } = useCopy(msg.content);

    return (
        <li className="turn-in group flex gap-3 md:gap-4">
            <Mark className="mt-1 size-5 shrink-0 text-accent" />
            <div className="min-w-0 flex-1">
                <div className="flex max-w-[68ch] flex-col gap-4 text-[15px] leading-7">
                    {splitFences(msg.content).map((part, i) =>
                        part.code === undefined ? (
                            <p key={i} className="whitespace-pre-wrap break-words">{part.text}</p>
                        ) : (
                            <CodeBlock key={i} lang={part.lang} code={part.code} />
                        ),
                    )}
                </div>
                <div className="mt-2 flex h-8 items-center opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:focus-within:opacity-100">
                    <button
                        type="button"
                        onClick={copy}
                        className="flex h-8 items-center gap-1.5 rounded-lg px-2 text-[13px] text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
                    >
                        {copied ? (
                            <Icon className="size-3.5"><path d="m5 12.5 4.5 4.5L19 7.5" /></Icon>
                        ) : (
                            <Icon className="size-3.5"><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></Icon>
                        )}
                        {copied ? 'Đã chép' : 'Sao chép'}
                    </button>
                </div>
            </div>
        </li>
    );
}

type Part = { text: string; code?: undefined; lang?: undefined } | { text?: undefined; code: string; lang: string };

// Tách khối ```code``` khỏi văn bản thường
function splitFences(content: string): Part[] {
    const parts: Part[] = [];
    const fence = /```([\w+-]*)[^\n]*\n?([\s\S]*?)(?:```|$)/g;
    let last = 0;
    for (const m of content.matchAll(fence)) {
        const before = content.slice(last, m.index).trim();
        if (before) parts.push({ text: before });
        parts.push({ code: m[2].replace(/\n$/, ''), lang: m[1] });
        last = m.index + m[0].length;
    }
    const rest = content.slice(last).trim();
    if (rest) parts.push({ text: rest });
    return parts;
}

function useCopy(text: string) {
    const [copied, setCopied] = useState(false);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
        } catch {
            // Trình duyệt chặn quyền clipboard
        }
    };
    return { copied, copy };
}

function CodeBlock({ lang, code }: { lang: string; code: string }) {
    const { copied, copy } = useCopy(code);
    return (
        <figure className="overflow-hidden rounded-xl border border-line bg-surface">
            <figcaption className="flex h-9 items-center justify-between border-b border-line pl-4 pr-1.5 text-xs text-fg-muted">
                <span className="font-mono">{lang || 'code'}</span>
                <button
                    type="button"
                    onClick={copy}
                    className="flex h-7 items-center gap-1.5 rounded-md px-2 transition-colors hover:bg-surface-2 hover:text-fg"
                >
                    {copied ? 'Đã chép' : 'Sao chép mã'}
                </button>
            </figcaption>
            <pre className="overflow-x-auto px-4 py-3 font-mono text-[13px] leading-6"><code>{code}</code></pre>
        </figure>
    );
}

function Icon({ children, className = 'size-4', strokeWidth = 1.75 }: { children: ReactNode; className?: string; strokeWidth?: number }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {children}
        </svg>
    );
}

function Mark({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2c.5 4.9 3.1 7.5 10 10-6.9 2.5-9.5 5.1-10 10-.5-4.9-3.1-7.5-10-10 6.9-2.5 9.5-5.1 10-10Z" />
        </svg>
    );
}
