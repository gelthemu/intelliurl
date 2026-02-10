import WhatIs from "@/components/sections/what-is";
import UsageExamples from "@/components/sections/usage-examples";
import FAQS from "@/components/sections/faqs";
import FinalCTA from "@/components/sections/cta";

interface ContentSectionsProps {
  onTryExample?: (value: string) => void;
  onFocusInput?: () => void;
}

export default function Content({
  onTryExample,
  onFocusInput,
}: ContentSectionsProps) {
  const renderHr = () => {
    return (
      <div className="w-full h-px border-t border-dark/60 border-dashed" />
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-12 flex flex-col space-y-10 md:space-y-12">
      <WhatIs />
      {renderHr()}
      <UsageExamples onTryExample={onTryExample} />
      {renderHr()}
      <FAQS />
      {renderHr()}
      <FinalCTA onFocusInput={onFocusInput} />
    </div>
  );
}
