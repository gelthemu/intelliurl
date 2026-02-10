import { useState, useCallback } from "react";
import { CgSidebar } from "react-icons/cg";
import { SiGooglecloudstorage } from "react-icons/si";
import { HiMenuAlt4 } from "react-icons/hi";
import { useShortcuts } from "@/lib/useShortcuts";
import Hero from "@/components/hero/hero";
import Sidebar from "@/components/sidebar/sidebar";
import Content from "@/components/content";
import MusicPlayer from "@/components/music-player";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleFocusInput = useCallback(() => {
    (window as any).__intelliurl_focus_input?.();
  }, []);

  const handleCloseSidebar = useCallback(() => {
    document.body.classList.remove("overflow-hidden");
    setSidebarOpen(false);
  }, []);

  const handleTryExample = useCallback((value: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      const event = new CustomEvent("intelliurl:fill", { detail: value });
      window.dispatchEvent(event);
    }, 200);
  }, []);

  useShortcuts({
    onFocusInput: handleFocusInput,
    onCloseSidebar: handleCloseSidebar,
  });

  return (
    <main className="w-full relative">
      <header className="hero w-full h-16 sticky top-0 border-b border-dark/50 shadow-md z-50">
        <div className="w-full h-full relative flex items-center justify-between py-2 px-6 text-dark bg-light">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold intelliurl-none">
              intelli<span className="text-teal text-shadow">URL</span>
            </span>
          </div>
          <button
            onClick={() => {
              document.body.classList.add("overflow-hidden");
              setSidebarOpen(true);
            }}
            className="px-1 py-px rounded-sm border-2 border-dark/90 hover:bg-dark/20 transition-colors intelliurl-btn"
            aria-label="Open tasks"
          >
            <HiMenuAlt4 className="w-5 h-5 stroke-[1px]" />
          </button>
        </div>
      </header>
      <Hero />
      <Content
        onTryExample={handleTryExample}
        onFocusInput={handleFocusInput}
      />
      <footer className="container bg-dark/10 mx-auto px-2 py-12">
        <div className="max-w-4xl mx-auto text-left">
          <p className="text-sm opacity-75">{`© ${new Date().getFullYear()} intelliURL v.${import.meta.env.VITE_SITE_VERSION} (i)`}</p>
        </div>
      </footer>
      <Sidebar
        open={sidebarOpen}
        onClose={() => {
          document.body.classList.remove("overflow-hidden");
          setSidebarOpen(false);
        }}
      />
      <MusicPlayer />
    </main>
  );
};

export default Index;
