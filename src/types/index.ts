export interface Task {
  task?: string;
  input: string;
  output: string;
  type: "url" | "slug";
  timestamp: number;
}

export interface LinkPreview {
  title: string;
  excerpt: string;
  img: string | null;
}
