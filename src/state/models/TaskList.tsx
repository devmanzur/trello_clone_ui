import { Task } from "./Task";

export interface TaskList {
    listId: string;
    text: string;
    tasks: Task[];
}
