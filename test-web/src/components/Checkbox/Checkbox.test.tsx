import { render, screen, fireEvent } from "@testing-library/react";

import { Checkbox } from ".";
import { Node, Nodes } from "../../utils";

interface Props {
  id: string;
  nodes: Nodes;
  onToggle(id: string): void;
}

const defaultChecked = false;

const createNode = (overrides?: Partial<Node>): Node => ({
  name: "",
  checked: defaultChecked,
  childIds: [],
  parent: undefined,
  ...overrides,
});

const name = "Hello World";

const createSingleLevelNormalizedObject = (): Nodes => ({
  0: createNode({ name }),
});

const parent = "Parent";
const child = "Child";
const grandchild = "Grandchild";

const createMultiLevelNormalizedObject = (): Nodes => ({
  0: createNode({ name: parent, childIds: ["1"] }),
  1: createNode({ name: child, childIds: ["2"], parent: "0" }),
  2: createNode({ name: grandchild, parent: "1" }),
});

const createProps = (overrides?: Partial<Props>): Props => ({
  id: "0",
  nodes: createSingleLevelNormalizedObject(),
  onToggle: () => {},
  ...overrides,
});

const renderCheckbox = (props: Props) => render(<Checkbox {...props} />);

const findCheckbox = (name: string) =>
  screen.getByRole("checkbox", { name: name });

const toggleCheckbox = (name: string) => fireEvent.click(findCheckbox(name));

const assertCheckbox = (name: string): void => {
  const checkbox = findCheckbox(name) as HTMLInputElement;
  expect(checkbox).toBeDefined();
  expect(checkbox.checked).toEqual(defaultChecked);
};

describe("Checkbox", () => {
  describe("Given a single level normalized object", () => {
    test("renders a checkbox", () => {
      renderCheckbox(
        createProps({ nodes: createSingleLevelNormalizedObject() })
      );

      assertCheckbox(name);
    });

    describe("When clicked on", () => {
      test("invokes the callback function", () => {
        const onToggle = jest.fn();
        renderCheckbox(
          createProps({
            nodes: createSingleLevelNormalizedObject(),
            onToggle,
          })
        );

        toggleCheckbox(name);

        expect(onToggle).toHaveBeenCalledTimes(1);
        expect(onToggle).toHaveBeenCalledWith("0");
      });
    });
  });

  describe("Given a multi level normalized object", () => {
    test("renders all checkboxes", () => {
      renderCheckbox(
        createProps({ nodes: createMultiLevelNormalizedObject() })
      );

      assertCheckbox(parent);
      assertCheckbox(child);
      assertCheckbox(grandchild);
    });

    describe.each([
      [grandchild, "2"],
      [child, "1"],
      [parent, "0"],
    ])("When clicked on %s", (name, id) => {
      let onToggle = jest.fn();

      beforeEach(() => {
        renderCheckbox(
          createProps({
            nodes: createMultiLevelNormalizedObject(),
            onToggle,
          })
        );

        toggleCheckbox(name);
      });

      test(`invokes the callback function with ${id}`, () => {
        expect(onToggle).toHaveBeenCalledTimes(1);
        expect(onToggle).toHaveBeenCalledWith(id);
      });
    });
  });
});
