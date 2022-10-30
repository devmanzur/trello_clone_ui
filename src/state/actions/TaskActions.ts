import { ColumnDragItem } from "../models/TaskModels";

export enum TaskAction {
  CreateTaskList,
  CreateTask,
  ShiftList,
  SetDraggedItem,
}

export interface AddTaskPayload {
  text: string;
  listId?: string;
}

export interface ShiftListPayload {
  sourceListId: string;
  destinationListId: string;
}

interface AddTaskAction {
  type: TaskAction.CreateTask;
  payload: AddTaskPayload;
}

interface ShiftListAction {
  type: TaskAction.ShiftList;
  payload: ShiftListPayload;
}

interface AddTaskListAction {
  type: TaskAction.CreateTaskList;
  payload: string;
}

interface SetDraggedItemAction {
  type: TaskAction.SetDraggedItem;
  payload: ColumnDragItem | null;
}

export type TaskActions =
  | AddTaskAction
  | AddTaskListAction
  | ShiftListAction
  | SetDraggedItemAction;

export const setDraggedItem = (
  payload: ColumnDragItem | null
): SetDraggedItemAction => {
  return {
    type: TaskAction.SetDraggedItem,
    payload,
  };
};

// action creators
export const addList = (payload: string): AddTaskListAction => {
  return {
    type: TaskAction.CreateTaskList,
    payload,
  };
};

export const addTask = (payload: AddTaskPayload): AddTaskAction => {
  return {
    type: TaskAction.CreateTask,
    payload,
  };
};

export const shiftList = (payload: ShiftListPayload): ShiftListAction => {
  return {
    type: TaskAction.ShiftList,
    payload,
  };
};
