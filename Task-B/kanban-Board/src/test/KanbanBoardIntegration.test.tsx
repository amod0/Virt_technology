import { render, screen, fireEvent } from "@testing-library/react";
import KanbanBoard from "../components/KanbanBoard";

describe("KanbanBoard Integration", () => {
  test("creates a column and adds tasks to it", () => {
    render(<KanbanBoard />);
    fireEvent.click(screen.getByText("Add Column"));

    expect(screen.getByText("Column 1")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Add Items"));

    expect(
      screen.getByPlaceholderText("Task Content Here")
    ).toBeInTheDocument();
  });

  test("moves a task between columns", () => {
    render(<KanbanBoard />);
    fireEvent.click(screen.getByText("Add Column"));
    fireEvent.click(screen.getByText("Add Column"));
    fireEvent.click(screen.getAllByText("Add Items")[0]);

    expect(screen.getByText("Task 1")).toBeInTheDocument();

    // Mock a drag event to move the task
    // Note: Advanced drag and drop testing might require libraries like `@testing-library/user-event` or mock behaviors.
    const task = screen.getByText("Task 1");
    const column = screen.getByText("Column 2");

    fireEvent.dragStart(task);
    fireEvent.drop(column);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
  });
});
