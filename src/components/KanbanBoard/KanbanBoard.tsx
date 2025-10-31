import React from "react";
import KanbanColumn from "./KanbanColumn";
import type { KanbanColumn as ColumnType, KanbanTask } from "./KanbanBoard.types";

interface Props {
  columns: ColumnType[];
  tasks: Record<string, KanbanTask>;
}

const KanbanBoard: React.FC<Props> = ({ columns, tasks }) => {
  return (
    <div className="p-6 bg-neutral-50 min-h-screen">
      <h2 className="text-xl font-semibold text-green-900 mb-4">
        Kanban Board
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={column.taskIds.map((id) => tasks[id])}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
