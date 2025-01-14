import { render, screen, fireEvent } from "@testing-library/react";
import TaskCard from "../components/TaskCard";

const mockProps = {
  task: { id: "1", columnId: "1", content: "Test Task" },
  deleteTask: jest.fn(),
  updateTask: jest.fn(),
};

describe("TaskCard", () => {
  test("renders task content", () => {
    render(<TaskCard {...mockProps} />);
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  test("calls deleteTask when delete button is clicked", () => {
    render(<TaskCard {...mockProps} />);
    const deleteButton = screen.getByRole("button");
    fireEvent.click(deleteButton);

    expect(mockProps.deleteTask).toHaveBeenCalledWith("1");
  });

  test("updates task content", () => {
    render(<TaskCard {...mockProps} />);
    fireEvent.click(screen.getByText("Test Task"));
    const textarea = screen.getByPlaceholderText("Task Content Here");
    fireEvent.change(textarea, { target: { value: "Updated Task" } });
    fireEvent.blur(textarea);

    expect(mockProps.updateTask).toHaveBeenCalledWith("1", "Updated Task");
  });
});
