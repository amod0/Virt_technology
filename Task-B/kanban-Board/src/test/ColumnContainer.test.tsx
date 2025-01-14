import { render, screen, fireEvent } from "@testing-library/react";
import ColumnContainer from "../components/ColumnContainer";

const mockProps = {
  column: { id: "1", title: "Test Column" },
  deleteColumn: jest.fn(),
  updateColumn: jest.fn(),
  createTask: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn(),
  tasks: [],
};

describe("ColumnContainer", () => {
  test("renders column title", () => {
    render(<ColumnContainer {...mockProps} />);
    expect(screen.getByText("Test Column")).toBeInTheDocument();
  });

  test("calls deleteColumn when delete button is clicked", () => {
    render(<ColumnContainer {...mockProps} />);
    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    expect(mockProps.deleteColumn).toHaveBeenCalledWith("1");
  });

  test("allows updating column title", () => {
    render(<ColumnContainer {...mockProps} />);
    fireEvent.click(screen.getByText("Test Column"));
    const input = screen.getByDisplayValue("Test Column");
    fireEvent.change(input, { target: { value: "Updated Column" } });
    fireEvent.blur(input);

    expect(mockProps.updateColumn).toHaveBeenCalledWith("1", "Updated Column");
  });
});
