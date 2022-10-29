export enum ListActionType {
  AddList,
  AddTask,
}

interface AddCardActionPayload {
  text: string;
  listId?: string;
}

interface AddTaskAction {
  type: ListActionType.AddTask;
  payload: AddCardActionPayload;
}

interface AddListAction {
  type: ListActionType.AddList;
  payload: string;
}

export type ListAction = AddTaskAction | AddListAction;
