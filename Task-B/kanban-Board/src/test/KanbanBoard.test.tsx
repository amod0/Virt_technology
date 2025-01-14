import { render, screen, fireEvent } from "@testing-library/react";
import KanbanBoard from "../components/KanbanBoard";

jest.mock("@dnd-kit/core", () => ({
  DndContext: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useDraggable: () => ({}),
  useDroppable: () => ({}),
}));

describe("KanbanBoard", () => {
  it("renders without crashing", () => {
    render(<KanbanBoard />);
    expect(screen.getByText("Add Column")).toBeInTheDocument();
  });
});

describe("KanbanBoard", () => {
  test("renders initial UI with no columns", () => {
    render(<KanbanBoard />);
    expect(screen.getByText("Add Column")).toBeInTheDocument();
  });

  test("creates a new column", () => {
    render(<KanbanBoard />);
    fireEvent.click(screen.getByText("Add Column"));

    expect(screen.getByText("Column 1")).toBeInTheDocument();
  });

  test("deletes a column", () => {
    render(<KanbanBoard />);
    fireEvent.click(screen.getByText("Add Column"));
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Column 1")).not.toBeInTheDocument();
  });

  test("creates a task in a column", () => {
    render(<KanbanBoard />);
    fireEvent.click(screen.getByText("Add Column"));
    fireEvent.click(screen.getByText("Add Items"));

    expect(
      screen.getByPlaceholderText("Task Content Here")
    ).toBeInTheDocument();
  });
});
