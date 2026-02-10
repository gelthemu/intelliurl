import { Loader2, ArrowUp } from "lucide-react";
import PreviewCard from "./preview-card";
import { cn } from "@/lib/utils";

interface HeroInputProps {
  inputRef: React.RefObject<HTMLTextAreaElement>;
  input: string;
  setInput: (value: string) => void;
  error: string;
  setError: (value: string) => void;
  loading: boolean;
  isPreviewLoading: boolean;
  setIsPreviewLoading: (value: boolean) => void;
  isUrlInput: boolean;
  maxInput: number;
  onGenerate: () => void;
}

export default function HeroInput({
  inputRef,
  input,
  setInput,
  error,
  setError,
  loading,
  isPreviewLoading,
  setIsPreviewLoading,
  isUrlInput,
  maxInput,
  onGenerate,
}: HeroInputProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-0">
        <div className="relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (error) setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onGenerate();
              }
            }}
            rows={3}
            maxLength={maxInput}
            placeholder="Paste a webpage title or URL here…"
            className={cn(
              "w-full p-4 md:p-6 text-base font-semibold transition-all duration-300",
              "rounded-sm border-2 border-dark !bg-sand text-dark",
              "placeholder:text-dark/70 placeholder:font-normal resize-none intelliurl-btn scrollbar-hide",
              input.trim().length > 0 ? "shadow-lg" : "shadow-md",
            )}
            style={{ height: "auto" }}
          />
          <button
            onClick={onGenerate}
            disabled={
              loading ||
              (isUrlInput && isPreviewLoading) ||
              !input.trim() ||
              !!error
            }
            className="absolute bottom-4 right-3 p-1.5 rounded-sm bg-dark text-light hover:opacity-90 transition-all"
            aria-label="Start"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 stroke-[3px] animate-spin" />
            ) : (
              <ArrowUp className="w-4 h-4 stroke-[3px]" />
            )}
          </button>
        </div>
        <div className="flex flex-row items-center justify-between space-x-2">
          <div>
            {error ? (
              <p className="text-sm text-red-500 font-medium animate-fade-in">
                {error}
              </p>
            ) : (
              <span />
            )}
          </div>
          <div>
            <span className="text-[12px] tabular-nums text-sand/80">
              {input.length}/{maxInput}
            </span>
          </div>
        </div>
      </div>
      {isUrlInput && input.trim().length > 10 && (
        <PreviewCard url={input.trim()} onLoadingChange={setIsPreviewLoading} />
      )}
    </div>
  );
}
