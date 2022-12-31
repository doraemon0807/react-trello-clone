import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { addBoardState, boardState, toDoState } from "./atoms";
import DragabbleCard from "./components/DragabbleCard";
import Board from "./components/Board";
import Garbage from "./components/Garbage";
import CreateBoard from "./components/CreateBoard";

import AddBoard from "./components/AddBoard";

const Wrapper = styled.div`
  display: flex;
  max-width: 100vh;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(4, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [boards, setBoards] = useRecoilState(boardState);

  const onDragEnd = (info: DropResult) => {
    console.log(info);

    const { destination, source, type } = info;
    if (!destination) return;

    if (type === "toDo") {
      if (destination?.droppableId === source.droppableId) {
        setToDos((allBoards) => {
          const boardCopy = [...allBoards[source.droppableId]];
          const [taskObj] = boardCopy.splice(source.index, 1);
          boardCopy.splice(destination?.index, 0, taskObj);
          return {
            ...allBoards,
            [source.droppableId]: boardCopy,
          };
        });
      }
      if (destination.droppableId !== source.droppableId) {
        if (destination.droppableId === "garbage") {
          setToDos((allBoards) => {
            const boardCopy = [...allBoards[source.droppableId]];
            boardCopy.splice(source.index, 1);

            return {
              ...allBoards,
              [source.droppableId]: boardCopy,
            };
          });
        } else {
          setToDos((allBoards) => {
            const sourceBoard = [...allBoards[source.droppableId]];
            const targetBoard = [...allBoards[destination.droppableId]];
            const [taskObj] = sourceBoard.splice(source.index, 1);
            targetBoard.splice(destination.index, 0, taskObj);
            return {
              ...allBoards,
              [source.droppableId]: sourceBoard,
              [destination.droppableId]: targetBoard,
            };
          });
        }
      }
    }

    if (type === "board") {
      if (destination.droppableId === "garbage") {
        setBoards((allBoards) => {
          const boardsCopy = [...allBoards];
          boardsCopy.splice(source.index, 1);

          return boardsCopy;
        });
      } else {
        setBoards((allBoards) => {
          const boardsCopy = [...allBoards];
          const [taskObj] = boardsCopy.splice(source.index, 1);
          boardsCopy.splice(destination?.index, 0, taskObj);
          return boardsCopy;
        });
      }
    }
  };

  const addBoardActive = useRecoilValue(addBoardState);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Droppable droppableId="boards" type="board" direction="horizontal">
            {(provided) => (
              <Boards ref={provided.innerRef} {...provided.droppableProps}>
                {boards.map((boardId, index) => {
                  return (
                    <Board
                      boardId={boardId}
                      key={boardId}
                      index={index}
                      toDos={toDos[boardId]}
                    />
                  );
                })}
                {provided.placeholder}
                <CreateBoard />
              </Boards>
            )}
          </Droppable>
          <Garbage boardId={"garbage"} />
        </Wrapper>
      </DragDropContext>
      {addBoardActive && <AddBoard />}
    </>
  );
}

export default App;
