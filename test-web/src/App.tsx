import styled from "styled-components";

import { CheckboxTree } from "./components";

import { data } from "./data/response";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 64rem;
  height: 100vh;
  margin: 0 auto;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
`;

export const App = () => (
  <Main>
    <Section>
      <article>
        <CheckboxTree data={data?.categories} />
      </article>
    </Section>
  </Main>
);
