import { X, Download } from "lucide-react";

interface SidebarHeaderProps {
  onClose: () => void;
  onToggleExport: () => void;
  showExport: boolean;
  hasItems: boolean;
  children?: React.ReactNode;
}

export default function SidebarHeader({
  onClose,
  onToggleExport,
  showExport,
  hasItems,
  children,
}: SidebarHeaderProps) {
  return (
    <div className="w-full h-16 shrink-0 flex flex-row items-center justify-between gap-2 py-2 px-4 bg-dark border-b border-light/50 shadow-lg">
      <div
        onClick={() => showExport && onToggleExport()}
        className="flex-1 text-lg text-sand font-medium"
      >
        History
      </div>
      <div className="shrink-0 flex flex-row items-center gap-1 text-light/80">
        {hasItems && (
          <div className="relative">
            <button
              onClick={onToggleExport}
              className="px-2 py-1.5 flex flex-row items-center gap-1.5 text-xs rounded-sm border border-light/20 bg-light/5 transition-colors intelliurl-btn"
            >
              <Download className="w-4 h-4 stroke-[3px]" />
              Export
            </button>
            {children}
          </div>
        )}
        <div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-sm border border-light/20 bg-light/20 hover:bg-light/10 transition-colors intelliurl-btn"
            aria-label="Close tasks"
          >
            <X className="w-4 h-4 stroke-[3px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
