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
  moveTaskKeyboard?: (
    taskId: string,
    columnId: string,
    direction: "up" | "down" | "left" | "right"
  ) => void;
  cancelKeyboardDrag?: () => void;
  renameColumn?: (columnId: string, name: string) => void;
  toggleColumn?: (columnId: string) => void;
  collapsedColumns?: string[];
  onDeleteTask?: (taskId: string) => void;
  selectedTasks?: string[];
  toggleTaskSelect?: (taskId: string) => void;
  isColumnOverLimit?: (columnId: string) => boolean;
  isColumnNearLimit?: (columnId: string) => boolean;
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
  keyboardDrag,
  renameColumn,
  toggleColumn,
  collapsedColumns,
  onDeleteTask,
  selectedTasks,
  toggleTaskSelect,
  isColumnOverLimit,
  isColumnNearLimit,
}) => {
  const handleDrop = () => {
    if (onDrop) onDrop(column.id);
  };

  const overLimit = isColumnOverLimit?.(column.id) ?? false;
  const nearLimit = isColumnNearLimit?.(column.id) ?? false;

  return (
    <div
      tabIndex={0}
      className={`min-w-[300px] bg-neutral-50 border border-neutral-200 rounded-xl p-4 shadow-sm 
      m-2 flex flex-col transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-primary-500 snap-start
      ${nearLimit ? "border-2 border-orange-400" : "border border-neutral-200"}
      ${overLimit ? "border-2 border-red-500" : ""}
      ${isOver ? "ring-2 ring-blue-500 bg-neutral-100" : ""}
      `}
      role="region"
      aria-label={`${column.title} column`}
      // aria-dropeffect={isOver ? "move" : undefined}
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

        <div className="relative group">
          <button
            className="text-neutral-800 hover:text-black text-lg px-2 mb-2"
            aria-label="Column options"
            title="Column options"
          >
            <span className="sr-only">Column options</span>
            ...
          </button>

          <div className="absolute right-0 top-5 bg-white shadow-md rounded hidden group-hover:block text-sm border z-50">
            <button
              className="block px-3 py-1 hover:bg-neutral-100 w-full text-left"
              onClick={() => {
                const name = prompt("Rename column:", column.title);
                if (name) renameColumn?.(column.id, name);
              }}
            >
              Rename
            </button>

            <button
              className="block px-3 py-1 hover:bg-neutral-100 w-full text-left"
              onClick={() => toggleColumn?.(column.id)}
            >
              {collapsedColumns?.includes(column.id) ? "Expand" : "Collapse"}
            </button>
          </div>
        </div>
      </div>

      {nearLimit && !overLimit && (
        <p className="text-orange-500 text-xs font-semibold mb-2">
          ⚠️ Almost at WIP limit
        </p>
      )}

      {overLimit && (
        <p className="text-red-600 text-xs font-semibold mb-2">
          ❌ WIP limit reached
        </p>
      )}

      {!collapsedColumns?.includes(column.id) && (
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
                  onDeleteTask={onDeleteTask}
                  selectedTasks={selectedTasks}
                  toggleTaskSelect={toggleTaskSelect}
                />
              ))
          ) : (
            <p className="text-xs text-neutral-500 italic">No tasks yet</p>
          )}

          {draggingTaskId && isOver && (
            <div className="kanban-placeholder"></div>
          )}

          <div className="sticky bottom-0 bg-neutral-50 pt-2 pb-1">
            <button
              onClick={() => onAddTask(column.id)}
              className="text-sm text-blue-600 text-left hover:text-blue-700"
            >
              + Add task
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanColumn;
