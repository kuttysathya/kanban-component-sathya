import React from "react";
import KanbanColumn from "./KanbanColumn";
import type { KanbanColumn as ColumnType, KanbanTask } from "./KanbanBoard.types";
import { useKanbanBoard } from "../../hooks/useKanbanBoard";

interface Props {
  columns: ColumnType[];
  tasks: Record<string, KanbanTask>;
  onDragStart?: (task: KanbanTask, columnId: string) => void;
  onDrop?: (columnId: string) => void;
  draggingTaskId?: string | null;
  overColumnId?: string | null;
}

const KanbanBoard: React.FC<Props> = ({ columns, tasks }) => {
  const {
    data, draggingTaskId, overColumnId,
    onDragStart, onDragOver, onDragLeave, onDrop
  } = useKanbanBoard({ columns });

  return (
    <div className="p-6 bg-neutral-50 min-h-screen">
      <h2 className="text-xl font-semibold text-neutral-900 mb-4">
        Kanban Board
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {data.columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={column.taskIds.map((id) => tasks[id])}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            draggingTaskId={draggingTaskId}
            isOver={overColumnId === column.id}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
