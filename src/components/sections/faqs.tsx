import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FAQS() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="space-y-6">
      <div>
        <h2>Frequently Asked Questions</h2>
      </div>

      <div className="space-y-2">
        {[
          {
            q: "Is there a limit to how many I can create?",
            a: "There's no hard limit. Your browser's storage can store thousands of entries (50MB+). URL shortening depends on TinyURL's free API availability.",
          },
          {
            q: "Can I customize my short URLs?",
            a: "Short URLs are generated via TinyURL's API with automatic aliases. Custom aliases are not currently supported.",
          },
          {
            q: "How long do shortened URLs last?",
            a: "TinyURL links are permanent and don't expire. Your local history is stored in your browser and persists until you clear it.",
          },

          {
            q: "Can I use this for commercial purposes?",
            a: "Yes! intelliURL is free for personal and commercial use. URL shortening uses TinyURL's public API, which has its own terms of service.",
          },
          {
            q: "What browsers are supported?",
            a: "intelliURL works on all modern browsers: Chrome, Firefox, Safari, Edge, and Brave. Browser Storage is supported in all of them.",
          },
        ].map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "rounded-sm border border-dark/60 overflow-hidden transition-all duration-300",
              openIndex === i ? "bg-sand/20" : "hover:bg-sand/5",
            )}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-start justify-between p-4 text-left intelliurl-btn"
            >
              <span className="text-base font-medium pr-4">{faq.q}</span>
              <motion.div
                animate={{ rotate: openIndex === i ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                {openIndex === i ? (
                  <ChevronLeft className="h-4 w-4 stroke-[3px]" />
                ) : (
                  <ChevronDown className="h-4 w-4 stroke-[3px] opacity-80" />
                )}
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="text-[15px] px-6 pt-0 pb-4 text-dark/80 leading-relaxed select-none">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
