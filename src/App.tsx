import { Column } from "./components/Column";
import { AppContainer } from "./assets/styles";
import AddNewItem from "./components/AddNewItem";
import { useAppState } from "./utils/useAppState";
import { isEmptyOrSpaces } from "./utils/stringUtils";
import { TaskAction } from "./state/actions/TaskActions";

export function App() {
  const appState = useAppState();

  const onItemAdded = (text: string) => {
    if (isEmptyOrSpaces(text)) {
      alert("Please add a valid List name");
      return;
    }
    appState.dispatch({
      type: TaskAction.CreateTaskList,
      payload: text,
    });
  };

  return (
    <AppContainer>
      {appState.lists.map((column) => (
        <Column
          text={column.text}
          id={column.listId}
          key={column.listId}
        ></Column>
      ))}
      <AddNewItem
        addItemHint="+ Add new list"
        onAdded={onItemAdded}
      ></AddNewItem>
    </AppContainer>
  );
}
