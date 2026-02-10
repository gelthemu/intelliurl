import { motion } from "framer-motion";
import { Copy, Check, RotateCcw, Twitter } from "lucide-react";
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
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.75 }}
      className="bg-transparent rounded-sm !bg-sand shadow-xl p-4 md:p-6 lg:p-8"
    >
      <div className="space-y-4">
        <div>
          <span className="font-medium mb-1 block">
            {result.type === "url" ? "URL Shortened" : "Slug Generated"}:
          </span>
        </div>

        <ResultField label="Original" value={result.original} />
        <ResultField label="Result" value={result.output} isResult />

        <div className="flex items-center gap-2 text-sm">
          <motion.button
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
            {!copied && (
              <Copy className="w-4 h-4 stroke-[3px]" />
            )}
            {copied ? "Copied!" : "Copy"}
          </motion.button>

          <motion.button
            onClick={onReset}
            className={cn(
              "px-4 py-2 rounded-sm font-medium shrink-0 flex items-center justify-center gap-2",
              "border-2 border-dark bg-transparent hover:bg-teal/5 transition-colors duration-200 intelliurl-btn",
            )}
            title="Reset"
          >
            <RotateCcw className="w-4 h-4 stroke-[3px]" />
            Reset
          </motion.button>

          <motion.button
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
    </motion.div>
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
