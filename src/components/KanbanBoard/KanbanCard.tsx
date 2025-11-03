import React from "react";
import type { KanbanTask } from "./KanbanBoard.types";
import { Avatar } from "./primitives/Avatar";

interface Props {
  task: KanbanTask;
  onDragStart?: (taskId: string, columnId: string) => void;
  moveTaskKeyboard?: (
    taskId: string,
    columnId: string,
    dir: "up" | "down" | "left" | "right"
  ) => void;
  cancelKeyboardDrag?: () => void;
  columnId: string;
  isDragging?: boolean;
  onClick?: () => void;
  keyboardDrag?: { taskId: string | null; columnId: string | null };
}

const KanbanCard: React.FC<Props> = ({
  task,
  onDragStart,
  moveTaskKeyboard,
  cancelKeyboardDrag,
  columnId,
  isDragging,
  onClick,
  keyboardDrag,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onDragStart?.(task.id, columnId);
      return;
    }
    if (isDragging) {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        moveTaskKeyboard?.(task.id, columnId, "up");
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        moveTaskKeyboard?.(task.id, columnId, "down");
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        moveTaskKeyboard?.(task.id, columnId, "left");
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        moveTaskKeyboard?.(task.id, columnId, "right");
      }
      if (e.key === "Escape") {
        cancelKeyboardDrag?.();
      }
    }
  };

  return (
    <div
      draggable
      onDragStart={() => onDragStart?.(task.id, columnId)}
      onKeyDown={handleKeyDown}
      onClick={onClick}
      className={`
        bg-white rounded-lg border border-neutral-200 p-3 mb-3 shadow-sm
        transition-all cursor-grab active:cursor-grabbing hover:shadow-md active:scale-[0.98] focus-within:ring-2 focus-within:ring-primary-500
        ${isDragging ? "opacity-40 scale-[0.98] rotate-[1deg] shadow-lg" : ""}
        ${task.priority === "high" && "border-l-4 border-orange-500"}
        ${task.priority === "urgent" && "border-l-4 border-red-500"}
        ${task.priority === "medium" && "border-l-4 border-yellow-500"}
        ${task.priority === "low" && "border-l-4 border-blue-500"}
        ${keyboardDrag?.taskId === task.id && "outline outline-2 outline-blue-500"}
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
            <span
              key={tag}
              className="text-[10px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {task.assignee && (
          <Avatar name={task.assignee} className="cursor-pointer" />
        )}
      </div>

      {task.createdAt && (
        <div className="text-[10px] text-neutral-500 mt-2">
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </div>
      )}

      {task.dueDate && (
        <div className="text-[10px] text-neutral-500 mt-2">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default React.memo(KanbanCard);
