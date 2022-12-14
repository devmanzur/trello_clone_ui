import { nanoid } from "nanoid";
import { createContext, useContext } from "react";
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
    draggedItem: null
  };

  //  set initial state with means to modify the state
  const [listState, dispatch] = useImmerReducer(taskStateReducer, taskData);
  const { lists, draggedItem } = listState;

  const getTasksByListId = (listId: string) => {
    return lists.find((list) => list.listId === listId)?.tasks || [];
  };

  return (
    <div>
      <AppStateContext.Provider value={{ draggedItem, lists, getTasksByListId, dispatch }}>
        {children}
      </AppStateContext.Provider>
    </div>
  );
};

export const useAppState = () => {
  return useContext(AppStateContext);
};