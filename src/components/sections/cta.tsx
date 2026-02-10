import { motion } from "framer-motion";

interface CTAProps {
  onFocusInput?: () => void;
}

export default function FinalCTA({ onFocusInput }: CTAProps) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="mb-3">
          Get Started with intelli
          <span className="text-teal text-shadow">URL</span>
        </h2>
        <p className="text-dark/80">
          Start with a URL to shorten it, or an article headline to generate an
          SEO-friendly slug.
          <br /> No account required, no credit card needed.
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => {
              onFocusInput?.();
            }, 800);
          }}
          className="w-fit px-3 py-1.5 text-sm text-dark font-medium rounded-sm border border-dark/40 bg-sand hover:bg-sand/90 transition-colors intelliurl-btn"
        >
          Start With Your First Task
        </button>
      </motion.div>
    </section>
  );
}
