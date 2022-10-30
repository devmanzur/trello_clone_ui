import { nanoid } from "nanoid";
import {
  AddTaskPayload,
  TaskAction,
  TaskActions,
} from "../actions/TaskActions";
import { TaskState } from "../models/TaskModels";

export const taskStateReducer = (
  draftState: TaskState,
  action: TaskActions
): TaskState | void => {
  switch (action.type) {
    case TaskAction.CreateTask:
      createTask(action.payload);
      break;

    case TaskAction.CreateTaskList:
      createTaskList(action.payload);
      break;

    default:
      break;
  }

  function createTaskList(text: string) {
    draftState.lists.push({
      listId: nanoid(),
      text: text,
      tasks: [],
    });
  }

  function createTask(payload: AddTaskPayload) {
    const { text, listId } = payload;
    const targetItemIndex = draftState.lists.findIndex(
      (x) => x.listId == listId
    );

    if (targetItemIndex == -1) {
      return;
    }

    draftState.lists[targetItemIndex].tasks.push({
      taskId: nanoid(),
      text: text,
    });
  }
};
