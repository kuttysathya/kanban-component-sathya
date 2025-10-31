import React from "react";
import KanbanCard from "./KanbanCard";
import type {
  KanbanColumn as KanbanColumnType,
  KanbanTask,
} from "./KanbanBoard.types";

interface Props {
  column: KanbanColumnType;
  tasks: KanbanTask[];
}

const KanbanColumn: React.FC<Props> = ({ column, tasks }) => {
  return (
    <div className="min-w-[300px] bg-neutral-50 border border-neutral-200 rounded-xl p-4 shadow-sm 
      mr-4 flex flex-col transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-primary-500">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-neutral-800 text-sm">
          {column.title}{" "}
          <span className="text-neutral-500">({tasks.length})</span>
        </h3>
      </div>
      
      <div className="space-y-3 overflow-y-auto max-h-[70vh] pr-2">
        {tasks.length > 0 ? (
          tasks.map((task) => <KanbanCard key={task.id} task={task} />)
        ) : (
          <p className="text-xs text-neutral-400 italic">No tasks yet</p>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
