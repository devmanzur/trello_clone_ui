import { ColumnContainer, ColumnTitle } from "../assets/styles";
import { addTask, TaskAction } from "../state/actions/TaskActions";
import { useAppState } from "../state/AppStateContext";
import { isEmptyOrSpaces } from "../utils/stringUtils";
import AddNewItem from "./AddNewItem";
import Card from "./Card";

interface ColumnProps {
  id: string;
  text: string;
  children?: React.ReactNode;
}

export const Column = (props: ColumnProps) => {
  const appState = useAppState();

  const tasks = appState.getTasksByListId(props.id);

  const onItemAdded = (text: string) => {
    if (isEmptyOrSpaces(text)) {
      alert("Please add a valid Task name");
      return;
    }
    appState.dispatch(addTask({
      listId: props.id,
      text: text,
    }));
  };

  return (
    <ColumnContainer>
      <ColumnTitle>{props.text}</ColumnTitle>
      {tasks.map((task) => (
        <Card text={task.text} id={task.taskId} key={task.taskId} />
      ))}
      <AddNewItem
        addItemHint="+ Add another card"
        onAdded={onItemAdded}
        dark
      ></AddNewItem>
    </ColumnContainer>
  );
};
