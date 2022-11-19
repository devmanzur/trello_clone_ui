import { DragItem } from "../models/TaskModels";

export enum TaskAction {
  CreateTaskList,
  CreateTask,
  MoveList,
  SetDraggedItem,
  MoveTask,
}

export interface AddTaskPayload {
  text: string;
  listId?: string;
}

export interface MoveListPayload {
  sourceListId: string;
  destinationListId: string;
}
export interface MoveTaskPayload {
  sourceTaskId: string;
  destinationTaskId: string | null;
  sourceListId: string;
  destinationListId: string;
}

interface AddTaskAction {
  type: TaskAction.CreateTask;
  payload: AddTaskPayload;
}

interface MoveListAction {
  type: TaskAction.MoveList;
  payload: MoveListPayload;
}

interface MoveTaskAction {
  type: TaskAction.MoveTask;
  payload: MoveTaskPayload;
}

interface AddTaskListAction {
  type: TaskAction.CreateTaskList;
  payload: string;
}

interface SetDraggedItemAction {
  type: TaskAction.SetDraggedItem;
  payload: DragItem | null;
}

export type TaskActions =
  | AddTaskAction
  | AddTaskListAction
  | MoveListAction
  | SetDraggedItemAction
  | MoveTaskAction;

export const setDraggedItem = (
  payload: DragItem | null
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

export const moveList = (payload: MoveListPayload): MoveListAction => {
  return {
    type: TaskAction.MoveList,
    payload,
  };
};

export const moveTask = (payload: MoveTaskPayload): MoveTaskAction => {
  return {
    type: TaskAction.MoveTask,
    payload,
  };
};
