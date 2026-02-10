import { FileJson, FileSpreadsheet } from "lucide-react";

interface ExportMenuProps {
  show: boolean;
  onExportJSON: () => void;
  onExportTXT: () => void;
  onClose: () => void;
}

export default function ExportMenu({
  show,
  onExportJSON,
  onExportTXT,
  onClose,
}: ExportMenuProps) {
  if (!show) return null;

  return (
    <div className="absolute right-0 top-full mt-1 divide-y divide-light/20 bg-dark border border-light/20 rounded-sm shadow-md z-10 min-w-[120px] overflow-hidden">
      <button
        onClick={() => {
          onClose();
          onExportJSON();
        }}
        className="flex items-center gap-2 w-full px-3 py-2 text-[13px] font-medium hover:bg-light/10 transition-colors"
      >
        <FileJson className="w-4 h-4" />
        JSON
      </button>
      <button
        onClick={() => {
          onClose();
          onExportTXT();
        }}
        className="flex items-center gap-2 w-full px-3 py-2 text-[13px] font-medium hover:bg-light/10 transition-colors"
      >
        <FileSpreadsheet className="w-4 h-4" />
        TXT
      </button>
    </div>
  );
}
