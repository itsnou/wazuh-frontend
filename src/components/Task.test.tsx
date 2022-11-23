import { render, screen } from "@testing-library/react";
import Task from './Task';

const task = {
    id: 1,
    title: 'Test Task',
    completed: true,
    user_id: 1,
};

describe('Task', () => {
    it('renders correctly', () => {
        render(<Task task={task}/>);
    });

    it('should display task title correctly', () => {
        render(<Task task={task}/>);
        expect(screen.getByText(task.title)).toBeInTheDocument();
    });
})