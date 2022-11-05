import { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
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

  // applies side effect to  DragSource, we replace the default drag preview with empty image
  // The preview function accepts an element or node to use as a drag preview, so we provide empty image as drag preview
  useEffect(() => {
    preview(getEmptyImage());
  }, [preview]);

  return { collectedProps, drag, preview };
};
