import { useRef } from "react";
import { useDrop } from "react-dnd";
import { throttle } from "throttle-debounce-ts";
import { CardContainer } from "../assets/styles";
import { moveTask, setDraggedItem } from "../state/actions/TaskActions";
import { useAppState } from "../state/AppStateContext";
import { DragItemType } from "../state/models/TaskModels";
import { useItemDrag } from "../utils/useItemDrag";

interface CardProps {
  text: string;
  id: string;
  columnId: string;
  isPreview?: boolean;
}

export const Card = ({ text, isPreview, id, columnId }: CardProps) => {
  const { draggedItem, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ id, text, columnId, type: DragItemType.Card });

  //this card is being hovered righ now
  const onCardHovered = () => {
    
    // if we are not dragging anything and just hovering on something we skip the action
    if (!draggedItem) {
      return;
    }

    if (draggedItem.type != DragItemType.Card) {
      return;
    }

    // if the dragged card is being hovered on itself, there is no point in doing anything
    if (draggedItem.id == id) {
      return;
    }

    dispatch(moveTask({ sourceTaskId: draggedItem.id, destinationTaskId: id, sourceListId: draggedItem.columnId, destinationListId: columnId }));

    dispatch(setDraggedItem({ ...draggedItem, columnId }));
  }

  // if we are hovering on this card
  const [, drop] = useDrop({
    accept: DragItemType.Card.toString(),
    // action is triggered after hovering on it for 2 secs
    hover: throttle(200, onCardHovered)
  });

  drag(drop(ref));

  return <CardContainer
    isHidden={draggedItem?.type == DragItemType.Card && draggedItem?.id == id && !isPreview}
    isPreview={isPreview}
    ref={ref}>
    {text}
  </CardContainer>;
}
