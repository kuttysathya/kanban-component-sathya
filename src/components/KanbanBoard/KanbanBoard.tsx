import React from "react";
import KanbanColumn from "./KanbanColumn";
import type { KanbanColumn as ColumnType, KanbanTask } from "./KanbanBoard.types";

interface Props {
  columns: ColumnType[];
  tasks: Record<string, KanbanTask>;
}

const KanbanBoard: React.FC<Props> = ({ columns, tasks }) => {
  return (
    <div className="w-full overflow-x-auto px-4 py-6">
      <div className="flex gap-4 min-w-max">
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
