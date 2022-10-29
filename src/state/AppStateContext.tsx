import { createContext, useContext, FC } from "react";
import { useImmerReducer } from "use-immer";
import { appStateReducer } from "./AppStateReducer";
import { TaskState } from "./models/TaskState";
import { TaskStateContextProps } from "./models/TaskStateContextProps";

interface AppStateProviderProps {
  children: React.ReactNode;
}

const appData: TaskState = {
  lists: [
    {
      listId: "0",
      text: "To Do",
      tasks: [{ taskId: "c0", text: "Generate app scaffold" }],
    },
    {
      listId: "1",
      text: "In Progress",
      tasks: [{ taskId: "c2", text: "Learn Typescript" }],
    },
    {
      listId: "2",
      text: "Done",
      tasks: [{ taskId: "c3", text: "Begin to use static typing" }],
    },
  ],
};

export const AppStateContext = createContext<TaskStateContextProps>(
  {} as TaskStateContextProps
);

export const AppStateProvider = ({ children }: AppStateProviderProps) => {
  const [listState, dispatch] = useImmerReducer(appStateReducer, appData);
  const { lists } = listState;

  const getTasksByListId = (listId: string) => {
    return lists.find((list) => list.listId === listId)?.tasks || [];
  };

  return (
    <AppStateContext.Provider value={{ lists, getTasksByListId, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};
