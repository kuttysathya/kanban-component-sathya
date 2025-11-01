import type { Meta, StoryObj } from "@storybook/react";
import TaskModal from "./TaskModal";
import type { KanbanTask } from "./KanbanBoard.types";

const sampleTask: KanbanTask = {
  id: "1",
  title: "Fix UI Bug",
  description: "Resolve button alignment issue",
  priority: "medium",
  status: "todo",
  createdAt: new Date(),
  dueDate: new Date(),
};

const meta: Meta<typeof TaskModal> = {
  title: "Kanban/TaskModal",
  component: TaskModal,
};

export default meta;
type Story = StoryObj<typeof TaskModal>;

export const Default: Story = {
  args: {
    task: sampleTask,
    isOpen: true,
    onClose: () => console.log("Modal closed"),
    onSave: (t) => console.log("Task saved", t),
  },
};
