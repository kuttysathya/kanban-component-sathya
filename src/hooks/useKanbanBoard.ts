import { useState } from "react";
import type {KanbanTask, KanbanColumn } from "../components/KanbanBoard/KanbanBoard.types";

export interface KanbanBoardData {
  columns: KanbanColumn[];
}

export const useKanbanBoard = (initialData: KanbanBoardData) => {
  const [data, setData] = useState(initialData);
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
  const [sourceColumnId, setSourceColumnId] = useState<string | null>(null);
  const [overColumnId, setOverColumnId] = useState<string | null>(null);

  const onDragStart = (task: KanbanTask, columnId: string) => {
    setDraggingTaskId(task.id);
    setSourceColumnId(columnId);
  };

  const onDragOver = (columnId: string) => {
    setOverColumnId(columnId);
  };

    const onDragLeave = (columnId: string) => {
    if (overColumnId === columnId) {
      setOverColumnId(null);
    }
  };

    const onDrop = (targetColumnId: string) => {
    if (!draggingTaskId || !sourceColumnId || targetColumnId === sourceColumnId) return;

    const newColumns = data.columns.map((col) => {
      if (col.id === sourceColumnId) {
        return { ...col, taskIds: col.taskIds.filter((id) => id !== draggingTaskId) };
      }
      if (col.id === targetColumnId) {
        return { ...col, taskIds: [...col.taskIds, draggingTaskId] };
      }
      return col;
    });

    setData({ columns: newColumns });
    setDraggingTaskId(null);
    setSourceColumnId(null);
    setOverColumnId(null);
  };

  return { 
    data,
    draggingTaskId,
    overColumnId,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop, 
  };
};
