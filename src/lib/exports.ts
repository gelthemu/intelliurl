import type { Task } from "@/types";

export const generateId = (length: number = 7): string => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "i";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportAsJSON(items: Task[]) {
  const data = items.map(({ task, input, output, timestamp }) => ({
    task,
    input,
    output,
    date: `${new Date(timestamp).toLocaleString("en-US", {
      timeZone: "Africa/Kampala",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })} EAT`,
  }));
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  downloadBlob(blob, `intelliurl-tasks-${generateId()}.json`);
}

export function exportAsCSV(items: Task[]) {
  const header = "Task,Input,Output,Date";
  const rows = items.map(({ task, input, output, timestamp }) => {
    const escape = (s: string) => `"${s.replace(/"/g, '""')}"`;
    return `${task},${escape(input)},${escape(output)},${`${new Date(
      timestamp,
    ).toLocaleString("en-US", {
      timeZone: "Africa/Kampala",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })} EAT`}`;
  });
  const blob = new Blob([header + "\n" + rows.join("\n")], {
    type: "text/csv",
  });
  downloadBlob(blob, `intelliurl-tasks-${generateId()}.csv`);
}
