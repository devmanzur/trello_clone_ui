import { nanoid } from "nanoid";
import { moveItem } from "../../utils/arrayUtils";
import {
  AddTaskPayload,
  MoveListPayload,
  MoveTaskPayload,
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
      reduceCreateTask(action.payload);
      break;

    case TaskAction.CreateTaskList:
      reduceCreateTaskList(action.payload);
      break;

    case TaskAction.MoveList:
      reduceMoveList(action.payload);
      break;

    case TaskAction.SetDraggedItem:
      draftState.draggedItem = action.payload;
      break;

    case TaskAction.MoveTask:
      reduceMoveTask(action.payload);
      break;

    default:
      break;
  }

  function reduceCreateTaskList(text: string) {
    draftState.lists.push({
      listId: nanoid(),
      text: text,
      tasks: [],
    });
  }

  function reduceCreateTask(payload: AddTaskPayload) {
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

  function reduceMoveList(payload: MoveListPayload) {
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

  function reduceMoveTask(payload: MoveTaskPayload) {
    const { sourceListId, destinationListId, sourceTaskId, destinationTaskId } =
      payload;

    const sourceListIndex = draftState.lists.findIndex(
      (x) => x.listId == sourceListId
    );

    const destinationListIndex = draftState.lists.findIndex(
      (x) => x.listId == destinationListId
    );

    const sourceCardIndex = draftState.lists[sourceListIndex].tasks.findIndex(
      (x) => x.taskId == sourceTaskId
    );

    const destinationCardIndex =
      draftState.lists[destinationListIndex]?.tasks.findIndex(
        (x) => x.taskId == destinationTaskId
      ) ?? 0;

    const draggedTask =
      draftState.lists[sourceListIndex].tasks[sourceCardIndex];

    // Remove the task from the source list
    draftState.lists[sourceListIndex].tasks.splice(sourceCardIndex, 1);

    // Add to target list
    draftState.lists[destinationListIndex].tasks.splice(
      destinationCardIndex,
      0,
      draggedTask
    );
  }
};
