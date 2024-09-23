export type TaskCardProps = {
    title: string;
    desc: string;
    date: string;
    owner: string;
    priority?: string;
    label?: string;
    tag?: string;
    id?: string;
    [key: string]: string | undefined;
}

export type BoardProps = {
    [key: string]: string | TaskCardProps[];
    title: string;
    pending: TaskCardProps[];
    done: TaskCardProps[];
    inProgress: TaskCardProps[];
}

export type TaskListItem = {
    id: string;
    title: string;
    color: string;
}

export type PriorityTypes = {
    low: string;
    medium: string;
    high: string
    [key: string]: string
}

export type TaskList = TaskListItem[]