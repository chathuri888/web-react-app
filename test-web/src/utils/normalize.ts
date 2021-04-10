import { RecursiveData, Nodes } from ".";

const RECURSION_KEY = "children";

export const normalize = (data: any) => {
  const getDataArray = (items: any, id = "0", link = "parent") =>
    items
      .filter((item: { [x: string]: null }) => item[link] === id)
      .map((item: { id: string | undefined }) => ({
        ...item,
        children: getDataArray(items, item.id),
        checked: false,
      }));

  const dataArray = getDataArray(data);
  const dataSet = {
    checked: false,
    name: "SelectAll",
    children: dataArray,
  };
  const dataObjectArray = createDataObjectArray(dataSet);

  return dataObjectArray;
};

const createDataObjectArray = (data: RecursiveData): Nodes => {
  let normalizedData: Nodes = {};
  let counter = -1;

  const transform = (node: RecursiveData, parent?: string) => {
    counter += 1;

    const id = `${counter}`;
    const { checked = false, name = "" } = node;

    normalizedData[id] = {
      checked,
      parent,
      childIds: [],
      name,
    };

    if (parent) {
      normalizedData[parent].childIds.push(id);
    }

    if (node[RECURSION_KEY] && node[RECURSION_KEY].length) {
      node[RECURSION_KEY].forEach((childNode) => {
        transform(childNode, id);
      });
    }
  };

  transform(data);

  return normalizedData;
};
