import { useRef } from "react";
import { useDrop } from "react-dnd";
import { throttle } from "throttle-debounce-ts";
import { ColumnContainer, ColumnTitle } from "../assets/styles";
import { addTask, shiftList } from "../state/actions/TaskActions";
import { useAppState } from "../state/AppStateContext";
import { DragItemType } from "../state/models/TaskModels";
import { isEmptyOrSpaces } from "../utils/stringUtils";
import { useItemDrag } from "../utils/useItemDrag";
import AddNewItem from "./AddNewItem";
import Card from "./Card";

interface ColumnProps {
  id: string;
  text: string;
  children?: React.ReactNode;
  isPreview?: boolean
}

export const Column = (props: ColumnProps) => {
  const appState = useAppState();
  const tasks = appState.getTasksByListId(props.id);

  const ref = useRef<HTMLDivElement>(null);

  const { drag } = useItemDrag({ ...props, type: DragItemType.Column });

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

  const onItemHovered = () => {
    // if we are not dragging anything and just hovering on something we skip the action
    if (!appState.draggedItem) {
      return;
    }

    // if the dragged list is being hovered on itself, there is no point in doing anything
    if (appState.draggedItem.type == DragItemType.Column && appState.draggedItem.id == props.id) {
      return;
    }

    appState.dispatch(shiftList({ sourceListId: appState.draggedItem.id, destinationListId: props.id }));
  };

  const [, drop] = useDrop({
    accept: DragItemType.Column.toString(),
    // action is triggered after hovering on it for 2 secs
    hover: throttle(200, onItemHovered)
  });

  drag(drop(ref));

  return (
    <ColumnContainer
      ref={ref}
      isHidden={appState.draggedItem?.type == DragItemType.Column && appState.draggedItem.id == props.id && !props.isPreview}
      isPreview={props.isPreview}
    >
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
