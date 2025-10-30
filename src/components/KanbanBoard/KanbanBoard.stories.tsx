import type { Meta, StoryObj } from "@storybook/react";
import KanbanBoard from "./KanbanBoard";
import type { KanbanColumn, KanbanTask } from "./KanbanBoard.types";

const columns: KanbanColumn[] = [
  { id: "todo", title: "To Do", color: "#ccc", taskIds: ["1", "2"] },
  { id: "progress", title: "In Progress", color: "#ccc", taskIds: ["3"] },
  { id: "done", title: "Done", color: "#ccc", taskIds: [] },
];

const tasks: Record<string, KanbanTask> = {
  "1": {
    id: "1",
    title: "Design UI mockups",
    status: "todo",
    createdAt: new Date(),
  },
  "2": {
    id: "2",
    title: "Setup database schema",
    status: "todo",
    createdAt: new Date(),
  },
  "3": {
    id: "3",
    title: "Implement API",
    status: "progress",
    createdAt: new Date(),
  },
};

const meta: Meta<typeof KanbanBoard> = {
  title: "Kanban/KanbanBoard",
  component: KanbanBoard,
};

export default meta;
type Story = StoryObj<typeof KanbanBoard>;

export const Default: Story = {
  args: {
    columns,
    tasks,
  },
};
