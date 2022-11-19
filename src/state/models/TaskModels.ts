import { Dispatch } from "react";
import { TaskActions } from "../actions/TaskActions";

export interface Task {
  taskId: string;
  text: string;
}

export interface TaskList {
  listId: string;
  text: string;
  tasks: Task[];
}

export enum DragItemType {
  Column,
  Card,
}

export interface ColumnDragItem {
  id: string;
  text: string;
  type: DragItemType.Column;
}

export interface CardDragItem {
  id: string;
  columnId: string;
  text: string;
  type: DragItemType.Card;
}

export type DragItem = CardDragItem | ColumnDragItem

export interface TaskState {
  lists: TaskList[];
  draggedItem: DragItem | null;
}

export interface TaskStateContextProps {
  draggedItem: DragItem | null;
  lists: TaskList[];
  getTasksByListId(listId: string): Task[];
  dispatch: Dispatch<TaskActions>;
}
