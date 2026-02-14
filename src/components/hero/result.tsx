import { AnimatePresence, motion } from "framer-motion";
import { Copy, Twitter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ResultType } from "./hero";

interface HeroResultProps {
  result: ResultType;
  copied: boolean;
  onCopy: () => void;
  onReset: () => void;
}

export default function HeroResult({
  result,
  copied,
  onCopy,
  onReset,
}: HeroResultProps) {
  const handleShareTwitter = () => {
    const text =
      result.type === "url"
        ? `just used intelliurl to shorten my url.\n\n try it, for free: ${import.meta.env.VITE_BASE_URL}/ ✨`
        : `just used intelliurl to generate an SEO-friendly slug.\n\n try it, for free: ${import.meta.env.VITE_BASE_URL}/ 🔥`;

    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onReset}
        className="result-backdrop fixed inset-0 bg-dark/80 z-[997] backdrop-blur-sm"
      />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[998] flex items-center justify-center p-4"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onReset();
          }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            className="relative w-full max-w-3xl rounded-sm !bg-sand border-4 border-x-dark border-y-cyan-800 shadow-xl p-4 md:p-6 lg:p-8 overflow-hidden"
          >
            <button
              onClick={onReset}
              className="absolute top-4 md:top-6 lg:top-8 right-4 md:right-6 lg:right-8 z-10 bg-dark/80 hover:bg-red-600 text-light rounded-sm p-1 transition-colors duration-200 intelliurl-btn"
              aria-label="Reset"
            >
              <X size={16} className="text-light stroke-[3px]" />
            </button>

            <div className="space-y-4">
              <div className="inline-flex px-2 py-0.5 rounded-sm bg-dark text-light">
                <span className="font-medium">
                  {result.type === "url" ? "URL Shortened" : "Slug Generated"}:
                </span>
              </div>

              <ResultField label="Original" value={result.original} />
              <ResultField label="Result" value={result.output} isResult />

              <div className="flex items-center gap-2 text-sm">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={onCopy}
                  className={cn(
                    "px-4 py-2 rounded-sm font-medium flex-1 flex items-center justify-center gap-2",
                    "text-light transition-colors duration-200 intelliurl-btn",
                    copied
                      ? "bg-green-600 border-2 border-green-600"
                      : "bg-dark hover:bg-dark/95 border-2 border-dark",
                  )}
                  title={copied ? "Copied" : "Copy"}
                >
                  {!copied && <Copy className="w-4 h-4 stroke-[3px]" />}
                  {copied ? "Copied!" : "Copy"}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleShareTwitter}
                  className={cn(
                    "px-4 py-2 rounded-sm font-medium shrink-0 flex items-center justify-center gap-2",
                    "border-2 border-dark bg-transparent hover:bg-teal/5 transition-colors duration-200 intelliurl-btn",
                  )}
                >
                  <Twitter className="w-4 h-4 stroke-[3px]" />
                  Tweet
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

interface ResultFieldProps {
  label: string;
  value: string;
  isResult?: boolean;
}

function ResultField({ label, value, isResult = false }: ResultFieldProps) {
  return (
    <div>
      <p className="text-sm opacity-70 mb-1 uppercase tracking-wider">
        {label}
      </p>
      <div className="flex items-center px-4 py-2 bg-light/80 rounded-sm border border-dark/40 opacity-80">
        <span
          className={cn(
            "truncate intelliurl-none",
            isResult
              ? "text-base font-mono text-teal font-semibold break-all"
              : "text-sm",
          )}
        >
          {value}
        </span>
      </div>
    </div>
  );
}
