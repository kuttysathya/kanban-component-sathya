import React from "react";
import KanbanCard from "./KanbanCard";
import type {
  KanbanColumn as KanbanColumnType,
  KanbanTask,
} from "./KanbanBoard.types";

interface Props {
  column: KanbanColumnType;
  tasks: KanbanTask[];
  onDragStart?: (taskId: string, columnId: string) => void;
  onDrop?: (columnId: string) => void;
  onDragOver?: (columnId: string) => void;
  onDragLeave?: (columnId: string) => void;
  draggingTaskId?: string | null;
  isOver?: boolean;
  onTaskClick?: (task: KanbanTask) => void;
  onAddTask: (columnId: string) => void;
  keyboardDrag?: { taskId: string | null; columnId: string | null };
  moveTaskKeyboard?: (taskId: string, columnId: string, direction: "up" | "down" | "left" | "right") => void;
  cancelKeyboardDrag?: () => void;
}

const KanbanColumn: React.FC<Props> = ({
  column,
  tasks,
  onDragStart,
  onDrop,
  onDragOver,
  onDragLeave,
  draggingTaskId,
  isOver,
  onTaskClick,
  onAddTask,
  moveTaskKeyboard,
  cancelKeyboardDrag,
  keyboardDrag
}) => {
  const handleDrop = () => {
    if (onDrop) onDrop(column.id);
  };

  return (
    <div
      tabIndex={0}
      className={`min-w-[300px] bg-neutral-50 border border-neutral-200 rounded-xl p-4 shadow-sm 
      m-2 flex flex-col transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-primary-500 snap-start
      ${
        isOver ? "ring-2 ring-primary-500 bg-neutral-100" : "border-neutral-200"
      }
      `}
      role="region"
      aria-label={`${column.title} column`}
      aria-dropeffect={isOver ? "move" : undefined}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver?.(column.id);
      }}
      onDragLeave={() => onDragLeave?.(column.id)}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-3 sticky top-0 z-10 bg-neutral-50 py-2">
        <h3 className="font-semibold text-neutral-800 text-sm">
          {column.title}{" "}
          <span className="text-neutral-500 text-xs">({tasks.length})</span>
        </h3>
      </div>

      <div className="space-y-3 overflow-y-auto max-h-[70vh] pr-2">
        {tasks.length > 0 ? (
          tasks
          .filter(Boolean)
          .map((task) => (
            <KanbanCard
              key={task.id}
              task={task}
              columnId={column.id}
              moveTaskKeyboard={moveTaskKeyboard}
              cancelKeyboardDrag={cancelKeyboardDrag}
              onDragStart={onDragStart}
              isDragging={draggingTaskId === task.id}
              onClick={() => onTaskClick?.(task)}
              keyboardDrag={keyboardDrag}
            />
          ))
        ) : (
          <p className="text-xs text-neutral-500 italic">No tasks yet</p>
        )}

        {draggingTaskId && isOver && <div className="kanban-placeholder"></div>}

        <button
          onClick={() => onAddTask(column.id)}
          className="text-sm text-blue-600 px-2 py-1 rounded-md mt-2 hover:text-blue-700 focus:ring-2 focus:ring-blue-400"
        >
          + Add task
        </button>
      </div>
    </div>
  );
};

export default KanbanColumn;
