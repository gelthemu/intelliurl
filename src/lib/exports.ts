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
  const data = items.map(({ input, output, timestamp }, i) => ({
    task: i + 1,
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

export function exportAsTXT(items: Task[]) {
  const rows = items.map(({ input, output, timestamp }, i) => {
    const date = `${new Date(timestamp).toLocaleString("en-US", {
      timeZone: "Africa/Kampala",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })} EAT`;
    return `${i === 0 ? "" : `${"=".repeat(20)}\n\n\n`}TASK: ${i + 1}\n\nINPUT: ${input}\n\nOUTPUT: ${output}\n\nDATE: ${date}${i === items.length - 1 ? "\n" : "\n\n\n"}`;
  });
  const blob = new Blob([rows.join("")], {
    type: "text/plain",
  });
  downloadBlob(blob, `intelliurl-tasks-${generateId()}.txt`);
}
