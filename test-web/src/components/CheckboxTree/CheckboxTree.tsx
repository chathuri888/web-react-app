import { useState } from "react";
import styled from "styled-components";

import { Checkbox } from "..";
import { normalize, getNewState } from "../../utils";

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

export const CheckboxTree = ({ data }: any) => {
  const [nodes, setNodes] = useState(normalize(data));

  const toggleCheckbox = (id: string) => {
    setNodes((prevNodes) => getNewState(prevNodes, id));
  };

  return (
    <List>
      <Checkbox id={"0"} nodes={nodes} onToggle={toggleCheckbox} />
    </List>
  );
};
