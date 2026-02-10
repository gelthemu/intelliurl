interface HeroHeaderProps {
  tagline: string;
  taglineVisible: boolean;
}

export default function HeroHeader({
  tagline,
  taglineVisible,
}: HeroHeaderProps) {
  return (
    <div className="text-left mb-8 text-light space-y-4">
      <div>
        <span className="text-sm opacity-60">AI-Powered URL Intelligence</span>
        <h1 className="min-h-[2.5rem]">
          Instant{" "}
          <span
            className={`inline-block text-teal text-shadow transition-all duration-[.45s] ${
              taglineVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-1"
            }`}
          >
            {tagline}
          </span>
        </h1>
      </div>
      <p className="text-light/60 text-base mb-8">
        Start with a URL to shorten it, or an article headline to generate an
        SEO-friendly slug.
      </p>
    </div>
  );
}
