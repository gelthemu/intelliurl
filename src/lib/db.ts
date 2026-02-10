import Dexie, { type Table } from "dexie";
import type { Task } from "@/types";

class IntelliURLDatabase extends Dexie {
  tasks!: Table<Task, "task">;

  constructor() {
    super("__intelliurl");
    this.version(1).stores({
      tasks: "task, input, output, type, timestamp",
    });
  }
}

export const db = new IntelliURLDatabase();
