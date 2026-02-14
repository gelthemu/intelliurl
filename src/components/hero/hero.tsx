import { useState, useEffect, useCallback, useRef } from "react";
import slug from "slug";
import { isValidURL, isValidHeadline } from "@/lib/utils";
import { shortenURL } from "@/lib/api";
import { generateId } from "@/lib/exports";
import HeroHeader from "./header";
import HeroInput from "./input";
import HeroResult from "./result";
import toast from "react-hot-toast";
import { db } from "@/lib/db";

const TAGLINES = ["Shortened URLs", "SEO-friendly Slugs", "Redirects"];
const MAX_INPUT = new Date().getFullYear() + 10;

export type ResultType = {
  original: string;
  output: string;
  type: "url" | "slug";
};

export default function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [taglineVisible, setTaglineVisible] = useState(true);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<ResultType | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    (window as any).__intelliurl_focus_input = () => inputRef.current?.focus();
    return () => {
      delete (window as any).__intelliurl_focus_input;
    };
  }, []);

  useEffect(() => {
    const handler = async (e: Event) => {
      const value = (e as CustomEvent).detail;
      if (typeof value === "string") {
        const trimmed = value.trim();

        

        const existing = await db.tasks.where("input").equals(trimmed).first();

        if (existing) {
          setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
          toast("Already generated...", { icon: "📋" });

            setResult({
              original: existing.input,
              output: existing.output,
              type: existing.type,
            });
setLoading(false);
          return;
        }

        setTimeout(() => {
          setInput(value);
        }, 100);
      }
    };
    window.addEventListener("intelliurl:fill", handler);
    return () => window.removeEventListener("intelliurl:fill", handler);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineVisible(false);
      setTimeout(() => {
        setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
        setTaglineVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkIfDuplicate = async () => {
      const trimmed = input.trim();
      if (!trimmed) {
        setIsDuplicate(false);
        return;
      }

      const existing = await db.tasks.where("input").equals(trimmed).first();
      setIsDuplicate(!!existing);
    };

    const debounceTimer = setTimeout(() => {
      checkIfDuplicate();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [input]);

  const checkDuplicate = useCallback(async () => {
    const existing = await db.tasks.where("input").equals(input.trim()).first();
    return existing || null;
  }, [input]);

  const detectAndGenerate = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed) {
      setError("Please enter a URL or headline...");
      return;
    }

    const isUrl = isValidURL(trimmed);
    const isHeadline = isValidHeadline(trimmed);

    if (!isUrl && !isHeadline) {
      setError("Enter a valid URL or a valid Headline...");
      return;
    }

    setError("");

    const dup = await checkDuplicate();
    if (dup) {
      toast("Already generated...", { icon: "📋" });

      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLoading(false);

      setResult({ original: dup.input, output: dup.output, type: dup.type });
      return;
    }

    if (isUrl) {
      setLoading(true);
      try {
        const short = await shortenURL(trimmed);

        if (!short) {
          toast.error("Something went wrong.");
          setLoading(false);
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setResult({ original: trimmed, output: short, type: "url" });

        await db.tasks.add({
          task: generateId(10),
          input: trimmed,
          output: short,
          type: "url",
          timestamp: Date.now(),
        });

        toast.success("Short URL generated!");
      } catch {
        toast.error("Failed to Shorten URL");
      } finally {
        setLoading(false);
      }
    } else if (isHeadline) {
      setLoading(true);

      try {
        const output = slug(trimmed, {
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
          lower: true,
          charmap: slug.charmap,
          multicharmap: slug.multicharmap,
          trim: true,
          fallback: true,
        });

        await new Promise((resolve) => setTimeout(resolve, 2500));

        setResult({ original: trimmed, output: output, type: "slug" });

        await db.tasks.add({
          task: generateId(10),
          input: trimmed,
          output: output,
          type: "slug",
          timestamp: Date.now(),
        });

        toast.success("Slug generated!");
      } catch {
        toast.error("Failed to Generate Slug");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Enter a valid URL or a valid Headline...");
      toast.error("Enter a valid URL or a valid Headline...");
    }
  }, [input, checkDuplicate]);

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.output);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 3500);
  };

  const handleReset = () => {
    setResult(null);
    setInput("");
    setError("");
    setCopied(false);
    setLoading(false);
    setIsDuplicate(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isUrlInput = isValidURL(input.trim());

  return (
    <section className="hero w-full bg-dark/95">
      <div className="max-w-4xl mx-auto px-4 py-10 md:py-12 flex flex-col space-y-8">
        <HeroHeader
          tagline={TAGLINES[taglineIndex]}
          taglineVisible={taglineVisible}
        />
        {!result ? (
          <HeroInput
            inputRef={inputRef}
            input={input}
            setInput={setInput}
            error={error}
            setError={setError}
            loading={loading}
            isPreviewLoading={isPreviewLoading}
            setIsPreviewLoading={setIsPreviewLoading}
            isUrlInput={isUrlInput}
            maxInput={MAX_INPUT}
            onGenerate={detectAndGenerate}
            isDuplicate={isDuplicate}
          />
        ) : (
          <HeroResult
            result={result}
            copied={copied}
            onCopy={handleCopy}
            onReset={handleReset}
          />
        )}
      </div>
    </section>
  );
}
