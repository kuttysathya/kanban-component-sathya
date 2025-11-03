import React from "react";
import KanbanColumn from "./KanbanColumn";
import type {
  KanbanColumn as ColumnType,
  KanbanTask,
} from "./KanbanBoard.types";
import { useKanbanBoard } from "../../hooks/useKanbanBoard";
import TaskModal from "./TaskModal";

interface Props {
  columns: ColumnType[];
  tasks: Record<string, KanbanTask>;
}

const KanbanBoard: React.FC<Props> = ({ columns, tasks }) => {
  const [selectedTask, setSelectedTask] = React.useState<KanbanTask | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [taskState, setTaskState] = React.useState(
    Object.fromEntries(
      Object.entries(tasks).map(([id, t]) => [
        id,
        { ...t, createdAt: new Date(t.createdAt) },
      ])
    )
  );

  const handleTaskClick = (task: KanbanTask) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleTaskSave = (updatedTask: KanbanTask) => {
    setTaskState((prev) => ({
      ...prev,
      [updatedTask.id]: updatedTask,
    }));

    const column = data.columns.find((col) => col.id === updatedTask.status);
    if (column && !column.taskIds.includes(updatedTask.id)) {
      column.taskIds.push(updatedTask.id);
    }

    setIsModalOpen(false);
  };

  const handleDeleteTask = (taskId: string) => {
    const newState = { ...taskState };
    delete newState[taskId];
    setTaskState(newState);
    setIsModalOpen(false);
  };

  const handleAddTask = (columnId: string) => {
    setSelectedTask({
      id: Date.now().toString(),
      title: "",
      description: "",
      status: columnId,
      createdAt: new Date(),
      priority: "low",
    });
    setIsModalOpen(true);
  };

  const {
    data,
    draggingTaskId,
    overColumnId,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
    keyboardDrag,
    moveTaskKeyboard,
    cancelKeyboardDrag,
  } = useKanbanBoard({ columns });

  return (
    <div className="p-6 bg-neutral-50 min-h-screen">
      <h2 className="text-xl font-semibold text-neutral-900 mb-4">
        Kanban Board
      </h2>

      <div aria-live="assertive" className="sr-only">
        {draggingTaskId && overColumnId
          ? `Moving task to ${overColumnId} column`
          : ""}
      </div>

      <div className="flex items-center justify-between mb-4 gap-3">
        <input
          placeholder="Search tasks..."
          className="border rounded px-3 py-2 flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => handleAddTask("")}
          className="text-sm bg-blue-600 px-3 py-2 rounded-md text-white hover:bg-blue-700"
        >
          + Add task
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth">
        {data.columns.map((column) => {
          const filteredTasks = column.taskIds
            .map((id) => taskState[id])
            .filter(
              (task) =>
                task && task.title.toLowerCase().includes(search.toLowerCase())
            );

          return (
            <div key={column.id}>
              <KanbanColumn
                column={column}
                tasks={filteredTasks}
                onDragStart={onDragStart}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                draggingTaskId={draggingTaskId}
                isOver={overColumnId === column.id}
                onTaskClick={handleTaskClick}
                onAddTask={handleAddTask}
                keyboardDrag={keyboardDrag}
                moveTaskKeyboard={moveTaskKeyboard}
                cancelKeyboardDrag={cancelKeyboardDrag}
              />
            </div>
          );
        })}
      </div>

      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleTaskSave}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default KanbanBoard;
