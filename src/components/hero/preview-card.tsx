import { useState, useEffect } from "react";
import { fetchLinkPreview } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { LinkPreview } from "@/types";

interface PreviewCardProps {
  url: string;
  onLoadingChange?: (isLoading: boolean) => void;
}

export default function PreviewCard({
  url,
  onLoadingChange,
}: PreviewCardProps) {
  const [preview, setPreview] = useState<LinkPreview | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoadingPreview(true);
    onLoadingChange?.(true);

    const fetchMeta = async () => {
      if (cancelled) return;

      try {
        const res = await fetchLinkPreview(url);

        if (!res) return;

        if (!cancelled && res) {
          setPreview(res);
          setIsLoadingPreview(false);
          onLoadingChange?.(false);
          return;
        }
      } catch {
        // fail silently and return null
        setPreview(null);
      }

      if (!cancelled) {
        setIsLoadingPreview(false);
        onLoadingChange?.(false);
      }
    };

    const debounce = setTimeout(fetchMeta, 600);
    return () => {
      cancelled = true;
      clearTimeout(debounce);
    };
  }, [url, onLoadingChange]);

  if (isLoadingPreview) {
    return (
      <div className="flex items-center gap-2 text-sm text-light/50 py-2">
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        Fetching preview…
      </div>
    );
  }

  if (!preview) return null;

  return (
    <div className="rounded-sm border border-teal/20 bg-sand/20 p-2 md:p-4 animate-fade-in">
      <div className="flex flex-row items-start gap-2">
        {preview.img && (
          <div className="w-32 aspect-video shrink-0">
            <img
              src={preview.img}
              alt=""
              className="w-full h-full rounded-sm object-cover shrink-0 intelliurl-none"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}
        <div className="min-w-0 h-full flex-1 flex flex-col space-y-1">
          {preview.title && (
            <p className="text-base font-medium text-light leading-none line-clamp-2 text-ellipsis">
              {preview.title}
            </p>
          )}
          {preview.excerpt && (
            <p className="text-sm text-light/50 line-clamp-2 text-ellipsis mt-auto">
              {preview.excerpt}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
