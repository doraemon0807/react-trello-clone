import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";
import { useForm } from "react-hook-form";
import { addBoardState, IToDo, toDoState } from "../atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

export const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 10px 0px;
  border-radius: 5px;
  min-height: 200px;
  width: 250px;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 5px rgba(80, 80, 80, 0.7);
`;

const Title = styled.h2`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 20px;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

const Area = styled.div<IAreaProps>`
  flex-grow: 1;
  transition: background-color 0.1s ease-in-out;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#b2bec3" //destination
      : props.draggingFromThisWith
      ? "#dfe6e9" //source
      : "transparent"};
  padding: 10px;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  input {
    all: unset;
    cursor: text;
    height: 30px;
    border-radius: 5px;
    background-color: white;
    padding: 0 10px;
    border: 1px solid transparent;
    &:focus {
      border: 1px solid rgba(180, 180, 180, 1);
    }
  }
`;

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
  index: number;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId, index }: IBoardProps) {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);

  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };

    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };

  return (
    <>
      <Draggable key={boardId} draggableId={boardId} index={index}>
        {(provided) => (
          <Wrapper
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
              <input
                {...register("toDo", { required: true })}
                type="text"
                placeholder={`Add task on ${boardId}`}
              />
            </Form>
            <Droppable droppableId={boardId} type="toDo">
              {(provided, snapshot) => (
                <Area
                  isDraggingOver={snapshot.isDraggingOver}
                  draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {toDos.map((toDo, index) => {
                    return (
                      <DragabbleCard
                        key={toDo.id}
                        index={index}
                        toDoId={toDo.id}
                        toDoText={toDo.text}
                      />
                    );
                  })}
                  {provided.placeholder}
                </Area>
              )}
            </Droppable>
          </Wrapper>
        )}
      </Draggable>
    </>
  );
}

export default Board;
