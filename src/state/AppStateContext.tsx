import { nanoid } from "nanoid";
import { createContext } from "react";
import { useImmerReducer } from "use-immer";
import { TaskState, TaskStateContextProps } from "./models/TaskModels";
import { taskStateReducer } from "./reducers/TaskStateReducer";

export const AppStateContext = createContext<TaskStateContextProps>(
  {} as TaskStateContextProps
);

interface AppStateProviderProps {
  children: React.ReactNode;
}

export const AppStateProvider = ({ children }: AppStateProviderProps) => {
  // initial state
  let taskData: TaskState = {
    lists: [
      {
        listId: nanoid(),
        text: "Daily Tasks",
        tasks: []
      }, {
        listId: nanoid(),
        text: "Weekly Tasks",
        tasks: []
      }, {
        listId: nanoid(),
        text: "Office Tasks",
        tasks: []
      },
    ],
  };

  //  set initial state with means to modify the state
  const [listState, dispatch] = useImmerReducer(taskStateReducer, taskData);
  const { lists } = listState;

  const getTasksByListId = (listId: string) => {
    return lists.find((list) => list.listId === listId)?.tasks || [];
  };

  return (
    <div>
      <AppStateContext.Provider value={{ lists, getTasksByListId, dispatch }}>
        {children}
      </AppStateContext.Provider>
    </div>
  );
};
