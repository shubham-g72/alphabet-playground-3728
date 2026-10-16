import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { Check, Copy, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

interface Greeting {
  id: string;
  label: string;
  text: string;
  mono?: boolean;
}

const GREETINGS: Greeting[] = [
  { id: "english", label: "English", text: "Hello, World!" },
  { id: "spanish", label: "Español", text: "¡Hola, Mundo!" },
  { id: "japanese", label: "日本語", text: "こんにちは 世界" },
  { id: "french", label: "Français", text: "Bonjour le monde" },
  { id: "python", label: "Python", text: 'print("Hello, World!")', mono: true },
  { id: "rust", label: "Rust", text: 'println!("Hello, world!");', mono: true },
];

const SNIPPET = `export default function App() {
  return <h1>Hello, World!</h1>;
}`;

const STATS = [
  { id: "client", label: "Client", value: "React 19" },
  { id: "bundler", label: "Bundler", value: "Vite" },
  { id: "styles", label: "Styles", value: "Tailwind v4" },
  { id: "status", label: "Status", value: "200 OK" },
];

export default function Home() {
  const [active, setActive] = useState<Greeting>(GREETINGS[0]);
  const [count, setCount] = useState(0);
  const [pulse, setPulse] = useState(0);
  const [copied, setCopied] = useState(false);
  const [logs, setLogs] = useState<string[]>(["> booting hello.world ... ok"]);

  const ping = () => {
    setCount((c) => c + 1);
    setPulse((p) => p + 1);
    setLogs((l) => [`> ping #${count + 1}: ${active.text}`, ...l].slice(0, 5));
    toast.success(active.text, { description: "Greeting dispatched to the world." });
  };

  const copySnippet = async () => {
    try {
      await navigator.clipboard.writeText(SNIPPET);
      setCopied(true);
      toast("Snippet copied to clipboard");
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Clipboard unavailable");
    }
  };

  return (
    <div className="min-h-svh bg-[#0D0E12] text-gray-100">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-[#0D0E12]/80 px-6 py-4 backdrop-blur-xl">
        <span data-testid="brand-mark" className="font-mono text-sm font-semibold tracking-widest text-gray-100">
          <span className="text-sky-400">&gt;_</span> HELLO.WORLD
        </span>
        <span data-testid="status-chip" className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-gray-400">
          <span className="size-1.5 rounded-full bg-emerald-400" /> online
        </span>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-24">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-10 lg:col-span-7"
        >
          <p data-testid="hero-kicker" className="font-mono text-xs uppercase tracking-widest text-sky-400">
            [status: 200 ok] // origin compilation
          </p>
          <h1
            data-testid="hero-heading"
            className="text-shimmer font-heading text-6xl font-extrabold uppercase leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl"
          >
            Hello
            <br />
            World.
          </h1>

          <div className="min-h-16">
            <AnimatePresence mode="wait">
              <motion.p
                key={active.id}
                data-testid="greeting-display"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className={cn("text-2xl text-gray-300 sm:text-3xl", active.mono ? "font-mono text-sky-300" : "font-heading")}
              >
                {active.text}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Choose a language">
            {GREETINGS.map((g) => (
              <button
                key={g.id}
                type="button"
                role="tab"
                aria-selected={active.id === g.id}
                data-testid={`language-select-${g.id}`}
                onClick={() => setActive(g)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm transition-[background-color,color,border-color,transform] duration-200 active:scale-95",
                  active.id === g.id
                    ? "border-sky-400 bg-sky-400 text-gray-950"
                    : "border-white/15 text-gray-300 hover:border-white/40 hover:text-white",
                )}
              >
                {g.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              {pulse > 0 && (
                <span key={pulse} className="animate-sonar pointer-events-none absolute inset-0 rounded-lg border-2 border-sky-400" />
              )}
              <Button
                data-testid="ping-world-button"
                size="lg"
                onClick={ping}
                className="relative h-12 bg-sky-400 px-6 text-base font-semibold text-gray-950 transition-[background-color,transform] hover:bg-sky-300 active:scale-[0.97]"
              >
                <Radio className="size-4" /> Ping the World
              </Button>
            </div>
            <Button
              data-testid="copy-snippet-button"
              variant="outline"
              size="lg"
              onClick={copySnippet}
              className="h-12 border-white/15 px-6 text-base transition-[background-color,transform] active:scale-[0.97]"
            >
              {copied ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
              {copied ? "Copied" : "Copy Snippet"}
            </Button>
          </div>
        </motion.section>

        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="space-y-6 lg:col-span-5 lg:mt-10"
        >
          <div className="overflow-hidden rounded-xl border border-white/10 bg-black/60 shadow-[0_8px_32px_rgba(0,0,0,0.36)] backdrop-blur-xl">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
              <span className="size-2.5 rounded-full bg-red-400/80" />
              <span className="size-2.5 rounded-full bg-amber-400/80" />
              <span className="size-2.5 rounded-full bg-emerald-400/80" />
              <span className="ml-3 font-mono text-xs text-gray-400">App.tsx</span>
            </div>
            <pre data-testid="code-snippet" className="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-sky-300">
              {SNIPPET}
            </pre>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
            {STATS.map((s) => (
              <div key={s.id} className="bg-[#151821] p-4">
                <p className="font-mono text-[11px] uppercase tracking-widest text-gray-400">{s.label}</p>
                <p data-testid={`stat-${s.id}`} className="mt-1 font-heading text-lg font-semibold text-gray-100">
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-white/10 bg-[#151821] p-5">
            <div className="flex items-baseline justify-between">
              <p className="font-mono text-xs uppercase tracking-widest text-gray-400">Greetings dispatched</p>
              <p data-testid="greeting-counter" className="font-heading text-3xl font-bold tabular-nums text-sky-400">
                {count}
              </p>
            </div>
            <ul data-testid="terminal-log" className="mt-4 space-y-1 font-mono text-xs text-gray-400">
              {logs.map((line, i) => (
                <li key={`${line}-${i}`} className={i === 0 ? "text-emerald-400" : undefined}>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </motion.aside>
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 px-6 py-10 text-sm text-gray-400 sm:flex-row">
        <span data-testid="footer-credit">Crafted with React 19 + Tailwind v4</span>
        <span className="font-mono text-xs uppercase tracking-widest">hello, world — since 1972</span>
      </footer>
      <Toaster />
    </div>
  );
}
