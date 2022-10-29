import { nanoid } from "nanoid";
import { ListAction as ListAction, ListActionType } from "./actions/ListAction";
import { TaskState } from "./models/TaskState";

export const appStateReducer = (
  draftState: TaskState,
  action: ListAction
): TaskState | void => {
  switch (action.type) {
    case ListActionType.AddTask:
      const { text, listId } = action.payload;
      const targetItemIndex = draftState.lists.findIndex((x) => x.listId == listId);
      if (targetItemIndex == -1) return;

      draftState.lists[targetItemIndex].tasks.push({
        taskId: nanoid(),
        text: text,
      });

      break;

    case ListActionType.AddList:
      draftState.lists.push({
        listId: nanoid(),
        text: action.payload,
        tasks: [],
      });
      break;

    default:
      break;
  }
};
