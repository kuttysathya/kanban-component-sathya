import { useState } from "react";

export const useDragAndDrop = () => {
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
  const [overColumnId, setOverColumnId] = useState<string | null>(null);

  const onDragStart = (taskId: string) => {
    setDraggingTaskId(taskId);
  };

  const onDragOver = (columnId: string) => {
    setOverColumnId(columnId);
  };

  const onDragLeave = (columnId: string) => {
    if (overColumnId === columnId) {
      setOverColumnId(null);
    }
  };

  const onDragEnd = () => {
    setDraggingTaskId(null);
    setOverColumnId(null);
  };

  return {
    onDragStart,
    onDragEnd,
    draggingTaskId,
    onDragOver,
    onDragLeave,
    overColumnId,
  };
};
