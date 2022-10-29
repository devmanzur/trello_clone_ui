import { Dispatch } from "react";
import { ListAction } from "../actions/ListAction";
import { Task } from "./Task";
import { TaskList } from "./TaskList";

export interface TaskStateContextProps {
    lists: TaskList[];
    getTasksByListId(listId: string): Task[];
    dispatch: Dispatch<ListAction>
}
