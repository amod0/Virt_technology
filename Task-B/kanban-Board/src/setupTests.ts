import "@testing-library/jest-dom";
import React from "react";

jest.mock("@dnd-kit/core", () => ({
    DndContext: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    useDraggable: () => ({}),
    useDroppable: () => ({}),
  }));
  