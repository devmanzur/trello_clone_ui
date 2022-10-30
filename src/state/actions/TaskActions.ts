export enum TaskAction {
  CreateTaskList,
  CreateTask,
  SwitchList,
}

export interface AddTaskPayload {
  text: string;
  listId?: string;
}

export interface SwitchListPayload {
  sourceListId: string;
  destinationListId: string;
}

interface AddTaskAction {
  type: TaskAction.CreateTask;
  payload: AddTaskPayload;
}

interface SwitchListAction {
  type: TaskAction.SwitchList;
  payload: SwitchListPayload;
}

interface AddTaskListAction {
  type: TaskAction.CreateTaskList;
  payload: string;
}

export type TaskActions = AddTaskAction | AddTaskListAction | SwitchListAction;

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

export const moveTask = (payload: SwitchListPayload): SwitchListAction => {
  return {
    type: TaskAction.SwitchList,
    payload
  };
};
