import React from "react";
import type { KanbanTask } from "./KanbanBoard.types";

interface Props {
  task: KanbanTask;
  onDragStart?: (taskId: string, columnId: string) => void;
  columnId: string;
  isDragging?: boolean;
}

const KanbanCard: React.FC<Props> = ({ task, onDragStart, columnId, isDragging }) => {

  const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    onDragStart?.(task.id, columnId);
  }
};

  return (
    <div
      draggable
      onDragStart={() => onDragStart?.(task.id, columnId)}
      onKeyDown={handleKeyDown}
      className={`
        bg-white rounded-lg border border-neutral-200 p-3 mb-3 shadow-sm
        transition-all cursor-grab active:cursor-grabbing hover:shadow-md active:scale-[0.98] focus-within:ring-2 focus-within:ring-primary-500
        ${isDragging ? "opacity-40 scale-[0.98] rotate-[1deg] shadow-lg" : ""}
        ${task.priority === "high" && "border-l-4 border-orange-500"}
        ${task.priority === "urgent" && "border-l-4 border-red-500"}
        ${task.priority === "medium" && "border-l-4 border-yellow-500"}
        ${task.priority === "low" && "border-l-4 border-blue-500"}
      `}
      role="button"
      tabIndex={0}
      aria-label={`${task.title}, priority ${task.priority}. Press space or enter to pick up.`}
      aria-grabbed={isDragging ? "true" : "false"}
    >
      <h4 className="font-medium text-sm text-neutral-800 line-clamp-2">
        {task.title}
      </h4>
      {task.description && (
        <p className="text-xs text-neutral-500 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between mt-2">
        <div className="flex gap-1 flex-wrap">
          {task.tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>

        {task.assignee && (
          <div className="w-6 h-6 bg-primary-500 rounded-full text-white text-xs flex items-center justify-center">
            {task.assignee.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {task.dueDate && (
        <div className="text-[10px] text-neutral-500 mt-2">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default KanbanCard;
