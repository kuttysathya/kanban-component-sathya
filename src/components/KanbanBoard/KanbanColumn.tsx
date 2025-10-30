import React from "react";
import KanbanCard from "./KanbanCard";
import type { KanbanColumn as KanbanColumnType, KanbanTask } from "./KanbanBoard.types";

interface Props {
  column: KanbanColumnType;
  tasks: KanbanTask[];
}

const KanbanColumn: React.FC<Props> = ({ column, tasks }) => {
  return (
    <div className="min-w-[300px] bg-neutral-100 rounded-xl p-3 shadow-sm flex flex-col max-h-[90vh]">
      <h3 className="font-semibold text-neutral-800 mb-3">
        {column.title} ({tasks.length})
      </h3>

      <div className="flex flex-col gap-2 overflow-y-auto">
        {tasks.map((task) => (
          <KanbanCard key={task.id} task={task} />
        ))}

        {tasks.length === 0 && (
          <div className="text-sm text-neutral-500 p-2 italic">
            No tasks yet
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
