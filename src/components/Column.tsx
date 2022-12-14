import { useRef } from "react";
import { useDrop } from "react-dnd";
import { throttle } from "throttle-debounce-ts";
import { ColumnContainer, ColumnTitle } from "../assets/styles";
import { addTask, moveList, moveTask, setDraggedItem } from "../state/actions/TaskActions";
import { useAppState } from "../state/AppStateContext";
import { DragItemType } from "../state/models/TaskModels";
import { isEmptyOrSpaces } from "../utils/stringUtils";
import { useItemDrag } from "../utils/useItemDrag";
import AddNewItem from "./AddNewItem";
import { Card } from "./Card";

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

  // this column is being hoevered right now
  const onColumnHovered = () => {

    // if we are not dragging anything and just hovering on something we skip the action
    if (!appState.draggedItem) {
      return;
    }

    if (appState.draggedItem.type == DragItemType.Column) {

      // if the dragged list is being hovered on itself, there is no point in doing anything
      if (appState.draggedItem.id == props.id) {
        return;
      }

      appState.dispatch(moveList({ sourceListId: appState.draggedItem.id, destinationListId: props.id }));
    }

    if (appState.draggedItem.type == DragItemType.Card) {
      if (appState.draggedItem.columnId === props.id) {
        return;
      }

      if (tasks.length > 0) {
        return;
      }

      appState.dispatch(moveTask({ sourceTaskId: appState.draggedItem.id, destinationTaskId: null, sourceListId: appState.draggedItem.columnId, destinationListId: props.id }));

      appState.dispatch(setDraggedItem({ ...appState.draggedItem, columnId: props.id }));
    }
  };

  // if we are hovering on this column
  const [, drop] = useDrop({
    accept: [DragItemType.Column.toString(), DragItemType.Card.toString()],
    // action is triggered after hovering on it for 2 secs
    hover: throttle(200, onColumnHovered)
  });

  drag(drop(ref));

  return (
    <ColumnContainer
      ref={ref}
      // this container is usually hidden when drag starts, however, since we are re-using this same container as drag preview, we do not want to hide it
      isHidden={appState.draggedItem?.type == DragItemType.Column && appState.draggedItem.id == props.id && !props.isPreview}
      // we also pass the preview prop to css so the preview is rotated 5 degrees
      isPreview={props.isPreview}
    >
      <ColumnTitle>{props.text}</ColumnTitle>
      {tasks.map((task) => (
        <Card text={task.text} id={task.taskId} columnId={props.id} key={task.taskId} />
      ))}
      <AddNewItem
        addItemHint="+ Add another card"
        onAdded={onItemAdded}
        dark
      ></AddNewItem>
    </ColumnContainer>
  );
};
