import { Play } from "lucide-react";

interface UsageExamplesProps {
  onTryExample?: (value: string) => void;
}

export default function UsageExamples({ onTryExample }: UsageExamplesProps) {
  return (
    <section className="space-y-6">
      <div>
        <h2>Usage Examples</h2>
      </div>
      <div className="space-y-3">
        {[
          {
            category: "Blog",
            input:
              "https://blog.example.com/2024/03/15/the-complete-guide-to-modern-web-development-with-react",
          },
          {
            category: "Social Media",
            input: "Why Remote Work Is Here to Stay — A Complete Guide",
          },
          {
            category: "E-commerce",
            input:
              "https://shop.example.com/products/summer-collection/item?id=12345&ref=campaign&utm_source=newsletter",
          },
          {
            category: "Email Marketing",
            input: "The Ultimate Black Friday Deals You Can't Miss This Year",
          },
        ].map((ex, i) => (
          <div
            key={i}
            className="w-full text-left p-4 rounded-sm border border-dark/20 bg-transparent space-y-2"
          >
            <div className="flex flex-row items-center justify-between space-x-2">
              <div className="flex-1">
                <span className="text-sm font-medium uppercase tracking-wider text-dark/60">
                  {ex.category}
                </span>
              </div>
              <div className="shrink-0">
                {onTryExample && (
                  <button
                    onClick={() => onTryExample(ex.input)}
                    className="inline-flex items-center gap-1 text-[12px] font-semibold text-teal px-2 py-1 rounded-sm border border-teal/50 bg-teal/5 hover:bg-light transition-colors intelliurl-btn"
                  >
                    <Play className="w-3 h-3 stroke-[3px]" />
                    Try this
                  </button>
                )}
              </div>
            </div>
            <p className="text-base break-all">{ex.input}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
