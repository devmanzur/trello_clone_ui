import { Column } from "./components/Column";
import { AppContainer } from "./assets/styles";
import AddNewItem from "./components/AddNewItem";
import { isEmptyOrSpaces } from "./utils/stringUtils";
import { addList } from "./state/actions/TaskActions";
import { useAppState } from "./state/AppStateContext";
import { CustomDragLayer } from "./components/CustomDragLayer";

export function App() {
  const appState = useAppState();

  const onItemAdded = (text: string) => {
    if (isEmptyOrSpaces(text)) {
      alert("Please add a valid List name");
      return;
    }
    appState.dispatch(addList(text));
  };

  return (
    <AppContainer>
      <CustomDragLayer />
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
