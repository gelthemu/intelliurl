import { motion } from "framer-motion";
import { Copy, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import type { Task } from "@/types";

interface HistoryListProps {
  items: Task[] | undefined;
  onItemClick: () => void;
}

export default function HistoryList({ items, onItemClick }: HistoryListProps) {
  const copyOutput = async (output: string) => {
    await navigator.clipboard.writeText(output);
    toast.success("Copied!");
  };

  const handleItemClick = (item: Task) => {
    onItemClick();
    if (item.type === "url") {
      window.open(item.output, "_blank");
    } else {
      copyOutput(item.output);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="history-backdrop flex-1 overflow-y-auto overscroll-none p-4 bg-light"
    >
      {!items || items.length === 0 ? (
        <div className="text-center text-sm opacity-80 py-12">
          <p>Your activity will appear here...</p>
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          {items.map((item) => (
            <HistoryItem
              key={item.task}
              item={item}
              onClick={() => handleItemClick(item)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

interface HistoryItemProps {
  item: Task;
  onClick: () => void;
}

function HistoryItem({ item, onClick }: HistoryItemProps) {
  return (
    <div
      onClick={onClick}
      className="group w-full text-left p-3 rounded-sm border border-dark/40 bg-light/40 hover:bg-sand/20 transition-colors space-y-1.5 cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between space-x-2">
        <span
          className={cn(
            "px-1.5 py-0.5 rounded-sm text-dark text-[12px] font-semibold uppercase tracking-wider",
            item.type === "url" ? "bg-teal" : "bg-sand",
          )}
        >
          {item.type === "url" ? "URL" : "Slug"}
        </span>
        <span className="text-[12px] opacity-80">
          {new Date(item.timestamp).toLocaleString("en-US", {
            timeZone: "Africa/Kampala",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          EAT
        </span>
      </div>
      <p className="text-base truncate">INPUT: {item.input}</p>
      <div className="flex flex-row items-center gap-1">
        <p className="flex-1 text-base truncate">
          OUTPUT:{" "}
          <span className="text-[15px] font-mono font-bold">{item.output}</span>
        </p>
        {item.type === "url" ? (
          <ExternalLink className="w-3.5 h-3.5 opacity-60 shrink-0" />
        ) : (
          <Copy className="w-3.5 h-3.5 opacity-60 shrink-0" />
        )}
      </div>
    </div>
  );
}
