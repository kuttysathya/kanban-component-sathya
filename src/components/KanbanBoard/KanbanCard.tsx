import React from "react";
import type { KanbanTask } from "./KanbanBoard.types";

interface Props {
  task: KanbanTask;
}

const KanbanCard: React.FC<Props> = ({ task }) => {
  return (
    <div className="bg-white border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <h4 className="font-medium text-sm text-neutral-900 mb-1">
        {task.title}
      </h4>
      {task.description && (
        <p className="text-xs text-neutral-600 line-clamp-2">
          {task.description}
        </p>
      )}
    </div>
  );
};

export default KanbanCard;
