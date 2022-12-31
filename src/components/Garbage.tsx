import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const WrapperGarbage = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 20vh;
`;

interface IGarbageAreaProps {
  isDraggingOverTrash: boolean;
}

const GarbageArea = styled.div<IGarbageAreaProps>`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.1s ease-in-out;
  background-color: ${(props) =>
    props.isDraggingOverTrash
      ? "#b2bec3" //destination
      : "tomato"};
  border: ${(props) =>
    props.isDraggingOverTrash ? "1px dashed rgba(0,0,0,0.2)" : "none"};
  span {
    display: ${(props) => (props.isDraggingOverTrash ? "block" : "none")};
    font-size: 36px;
    color: rgba(0, 0, 0, 0.2);
  }
`;

function Garbage() {
  return (
    <WrapperGarbage>
      <Droppable droppableId="garbage">
        {(provided, snapshot) => (
          <GarbageArea
            isDraggingOverTrash={snapshot.isDraggingOver}
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
