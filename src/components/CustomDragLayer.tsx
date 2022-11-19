import { useDragLayer } from "react-dnd";
import { CustomDragLayerContainer, DragPreviewWrapper } from "../assets/styles";
import { useAppState } from "../state/AppStateContext"
import { DragItemType } from "../state/models/TaskModels";
import { Card } from "./Card";
import { Column } from "./Column";

export const CustomDragLayer = () => {
    const { draggedItem } = useAppState();
    //using this hook to monitor drag changes. and return the current position of dragged item
    const { currentOffset } = useDragLayer((monitor) => ({
        currentOffset: monitor.getSourceClientOffset()
    }));

    if (draggedItem && currentOffset) {
        return <CustomDragLayerContainer>
            {/* moves the preview with drag axis value change */}
            <DragPreviewWrapper position={currentOffset}>
                {draggedItem.type == DragItemType.Card ?
                    <Card text={draggedItem.text} id={draggedItem.id} columnId={draggedItem.columnId} isPreview={true} /> :
                    <Column
                        id={draggedItem.id}
                        text={draggedItem.text}
                        isPreview={true}
                    >
                    </Column>
                }
            </DragPreviewWrapper>
        </CustomDragLayerContainer >
    }

    return null;
}