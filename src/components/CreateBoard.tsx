import styled from "styled-components";
import { Wrapper } from "./Board";

const WrapperEmpty = styled(Wrapper)`
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed rgba(1, 1, 1, 0.4);
`;

const Add = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 42px;
  font-weight: 600;
  color: rgba(1, 1, 1, 0.4);
  cursor: pointer;
  border: 3px solid rgba(1, 1, 1, 0.4);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  padding-bottom: 10px;
  &:hover {
    color: rgba(1, 1, 1, 0.7);
    border: 3px solid rgba(1, 1, 1, 0.7);
  }
`;

function CreateBoard() {
  const boardCreate = (event: React.MouseEvent<HTMLDivElement>) => {};

  return (
    <WrapperEmpty>
      <Add onClick={boardCreate}>+</Add>
    </WrapperEmpty>
  );
}

export default CreateBoard;
