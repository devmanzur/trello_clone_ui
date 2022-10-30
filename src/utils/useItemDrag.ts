import { useDrag } from "react-dnd";
import { setDraggedItem } from "../state/actions/TaskActions";
import { useAppState } from "../state/AppStateContext";
import { ColumnDragItem } from "../state/models/TaskModels";

export const useItemDrag = (item: ColumnDragItem) => {
  const { dispatch } = useAppState();
  const [collectedProps, drag, preview] = useDrag({
    // type of item being dragged
    type: item.type.toString(),
    // If a function-form is used, it is invoked when the drag begins and returns a draggable item
    item: () => {
      dispatch(setDraggedItem(item));
      return item;
    },
    // called When the dragging stops
    end: () => dispatch(setDraggedItem(null)),
  });

  return { collectedProps, drag, preview };
};
