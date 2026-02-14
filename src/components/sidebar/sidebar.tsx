import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLiveQuery } from "dexie-react-hooks";
import { exportAsTXT, exportAsJSON } from "@/lib/exports";
import toast from "react-hot-toast";
import { db } from "@/lib/db";
import SidebarHeader from "./header";
import ExportMenu from "./export-menu";
import HistoryList from "./history";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const [showExport, setShowExport] = useState(false);

  const items = useLiveQuery(
    () => db.tasks.orderBy("timestamp").reverse().limit(50).toArray(),
    [],
  );

  const handleClose = () => {
    onClose();
    setShowExport(false);
  };

  const handleExportJSON = () => {
    if (!items || items.length === 0) return;
    exportAsJSON(items);
    toast.success("Exported as JSON");
    setShowExport(false);
  };

  const handleExportTXT = () => {
    if (!items || items.length === 0) return;
    exportAsTXT(items);
    toast.success("Exported as TXT");
    setShowExport(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              onClose();
              setShowExport(false);
            }}
            className="fixed inset-0 bg-dark/20 z-[998] backdrop-blur-[1px]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-[95%] max-w-[420px] bg-light drop-shadow-lg z-[999] flex flex-col select-none"
          >
            <SidebarHeader
              onClose={handleClose}
              onToggleExport={() => setShowExport((prev) => !prev)}
              showExport={showExport}
              hasItems={!!items && items.length > 0}
            >
              <ExportMenu
                show={showExport}
                onExportJSON={handleExportJSON}
                onExportTXT={handleExportTXT}
                onClose={() => setShowExport(false)}
              />
            </SidebarHeader>
            <HistoryList
              items={items}
              onItemClick={() => setShowExport(false)}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
