import type { Meta, StoryObj } from "@storybook/react";
import KanbanBoard from "./KanbanBoard";
import type { KanbanColumn, KanbanTask } from "./KanbanBoard.types";

const baseColumns: KanbanColumn[] = [
  { id: "todo", title: "To Do", color: "#ccc", taskIds: ["1", "2"] },
  { id: "progress", title: "In Progress", color: "#ccc", taskIds: ["3"] },
  { id: "review", title: "Review", color: "#ccc", taskIds: ["4"] },
  { id: "done", title: "Done", color: "#ccc", taskIds: [] },
];

const baseTasks: Record<string, KanbanTask> = {
  "1": {
    id: "1",
    title: "Design UI mockups",
    status: "todo",
    createdAt: new Date(),
    priority: "low",
    assignee: "Amit Kumar",
    tags: ["docs"],
    dueDate: new Date(),
  },
  "2": {
    id: "2",
    title: "Setup database schema",
    status: "todo",
    createdAt: new Date(),
    priority: "medium",
    assignee: "Amit",
    tags: ["frontend"],
    dueDate: new Date(),
  },
  "3": {
    id: "3",
    title: "Implement API",
    status: "done",
    createdAt: new Date(),
    priority: "urgent",
    assignee: "rahul",
    tags: ["backend"],
    dueDate: new Date(),
  },
  "4": {
    id: "4",
    title: "Code review",
    status: "progress",
    createdAt: new Date(),
    priority: "high",
    assignee: "anita",
    tags: ["critical"],
    dueDate: new Date(),
  },
};

const meta: Meta<typeof KanbanBoard> = {
  title: "Kanban/KanbanBoard",
  component: KanbanBoard,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof KanbanBoard>;

export const Default: Story = {
  args: {
    columns: baseColumns,
    tasks: baseTasks,
  },
};

const emptyColumns = baseColumns.map(col => ({ ...col, taskIds: [] }));

export const EmptyBoard: Story = {
  args: {
    columns: emptyColumns,
    tasks: {},
  },
};

// large dataset (30 tasks)

const manyTasks: Record<string, KanbanTask> = {};
const manyColumns: KanbanColumn[] = JSON.parse(JSON.stringify(baseColumns));

for (let i = 1; i <= 30; i++) {
  const colId = i % 3 === 0 ? "progress" : i % 2 === 0 ? "todo" : "done";
  manyTasks[i] = {
    id: String(i),
    title: `Task ${i}`,
    status: colId,
    createdAt: new Date(),
  };
  const column = manyColumns.find(c => c.id === colId);
  if (column) column.taskIds.push(String(i));
}

export const LargeDataset: Story = {
  args: {
    columns: manyColumns,
    tasks: manyTasks,
  },
};

export const MobileView: Story = {
  args: {
    columns: baseColumns,
    tasks: baseTasks,
  },
  parameters: {
    viewport: {
      defaultViewport: "iphone12",
    },
  },
};

export const Playground: Story = {
  args: {
    columns: baseColumns,
    tasks: baseTasks,
  },
  argTypes: {
    columns: { control: "object" },
    tasks: { control: "object" },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export const PriorityShowcase: Story = {
  args: {
    columns: baseColumns,
    tasks: baseTasks,
  },
};

export const KeyboardA11y: Story = {
  args: {
    columns: baseColumns,
    tasks: baseTasks,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use TAB to move focus. SPACE to pick up a card, arrow keys to move, ENTER to drop.",
      },
    },
  },
};