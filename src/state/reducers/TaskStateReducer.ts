import { nanoid } from "nanoid";
import { moveItem } from "../../utils/arrayUtils";
import {
  AddTaskPayload,
  SwitchListPayload,
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

    case TaskAction.SwitchList:
      moveList(action.payload);
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
    const targetListIndex = draftState.lists.findIndex(
      (x) => x.listId == listId
    );

    if (targetListIndex == -1) {
      return;
    }

    draftState.lists[targetListIndex].tasks.push({
      taskId: nanoid(),
      text: text,
    });
  }

  function switchList(payload: SwitchListPayload) {
    const { sourceListId, destinationListId } = payload;
    const sourceListIndex = draftState.lists.findIndex(
      (x) => x.listId == sourceListId
    );

    const destinationListIndex = draftState.lists.findIndex(
      (x) => x.listId == destinationListId
    );

    if (sourceListIndex == -1 || destinationListIndex == -1) {
      return;
    }

    draftState.lists = moveItem(
      draftState.lists,
      sourceListIndex,
      destinationListIndex
    );
  }
};
