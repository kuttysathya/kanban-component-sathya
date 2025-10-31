import React from "react";
import KanbanCard from "./KanbanCard";
import type {KanbanColumn as KanbanColumnType, KanbanTask} from "./KanbanBoard.types";

interface Props {
  column: KanbanColumnType;
  tasks: KanbanTask[];
  onDragStart?: (task: KanbanTask, columnId: string) => void;
  onDrop?: (columnId: string) => void;
  onDragOver?: (columnId: string) => void;
  onDragLeave?: (columnId: string) => void;
  draggingTaskId?: string | null;
  isOver?: boolean;
}

const KanbanColumn: React.FC<Props> = ({ column, tasks, onDragStart, onDrop, onDragOver, onDragLeave, draggingTaskId, isOver }) => {
  const handleDrop = () => {
    if (onDrop) onDrop(column.id);
  };
  
  return (
    <div
      className={`min-w-[300px] bg-neutral-50 border border-neutral-200 rounded-xl p-4 shadow-sm 
      mr-4 flex flex-col transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-primary-500
      ${
        isOver ? "ring-2 ring-primary-500 bg-neutral-100" : "border-neutral-200"
      }
      `}
      role="region"
      aria-label={`${column.title} column`}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver?.(column.id);
      }}
      onDragLeave={() => onDragLeave?.(column.id)}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-neutral-800 text-sm">
          {column.title}{" "}
          <span className="text-neutral-500 text-xs">({tasks.length})</span>
        </h3>
      </div>

      <div className="space-y-3 overflow-y-auto max-h-[70vh] pr-2">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <KanbanCard
              key={task.id}
              task={task}
              columnId={column.id}
              onDragStart={(t, c) => onDragStart?.(t, c)}
              isDragging={draggingTaskId === task.id}
            />
          ))
        ) : (
          <p className="text-xs text-neutral-400 italic">No tasks yet</p>
        )}

        {draggingTaskId && isOver && <div className="kanban-placeholder"></div>}
      </div>
    </div>
  );
};

export default KanbanColumn;
