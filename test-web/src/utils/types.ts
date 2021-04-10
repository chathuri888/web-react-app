export interface RecursiveData {
  checked: boolean;
  children: RecursiveData[];
  name: string;
}

export interface Node {
  checked: boolean;
  childIds: string[];
  parent?: string;
  name: string;
}

export interface Nodes {
  [id: string]: Node;
}
