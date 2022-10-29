import { ColumnContainer, ColumnTitle } from "../assets/styles";
import { ListActionType } from "../state/actions/ListAction";
import { isEmptyOrSpaces } from "../utils/stringUtils";
import { useAppState } from "../utils/useAppState";
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
    appState.dispatch({
      type: ListActionType.AddTask,
      payload: {
        listId: props.id,
        text: text,
      },
    });
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
