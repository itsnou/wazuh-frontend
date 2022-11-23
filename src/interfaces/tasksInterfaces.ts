export interface ITask {
    completed: boolean;
    id: number;
    title: string;
    user_id: number;
}

export interface IRootTask {
    data: ITask[];
    total_items: number;
}
