export enum TaskAction {
  CreateTaskList,
  CreateTask,
}

export interface AddTaskPayload {
  text: string;
  listId?: string;
}

interface AddTaskAction {
  type: TaskAction.CreateTask;
  payload: AddTaskPayload;
}

interface AddTaskListAction {
  type: TaskAction.CreateTaskList;
  payload: string;
}

export type TaskActions = AddTaskAction | AddTaskListAction;
