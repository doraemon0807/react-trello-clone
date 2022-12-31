import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const WrapperGarbage = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 500px;
  height: 200px;
  background-color: tomato;
`;

interface IGarbageAreaProps {
  isDraggingOver: boolean;
}

const GarbageArea = styled.div<IGarbageAreaProps>`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.1s ease-in-out;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "teal" //destination
      : "tomato"};
  border: ${(props) =>
    props.isDraggingOver ? "1px dashed rgba(0,0,0,0.2)" : "none"};
  span {
    display: ${(props) => (props.isDraggingOver ? "block" : "none")};
    font-size: 36px;
    color: rgba(0, 0, 0, 0.2);
  }
`;

interface IBoardProps {
  boardId: string;
}

function Garbage({ boardId }: IBoardProps) {
  return (
    <WrapperGarbage>
      <Droppable droppableId={boardId} type="garbage">
        {(provided, snapshot) => (
          <GarbageArea
            isDraggingOver={snapshot.isDraggingOver}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span>Drop here to delete</span>
          </GarbageArea>
        )}
      </Droppable>
    </WrapperGarbage>
  );
}
export default Garbage;
