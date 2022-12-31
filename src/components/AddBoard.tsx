import styled from "styled-components";
import { useRecoilState } from "recoil";
import { addBoardState, boardState, toDoState } from "../atoms";
import { useForm } from "react-hook-form";

const WrapperAdd = styled.div<{ isActive: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 300px;
  height: 250px;
  box-shadow: 1px 1px 5px rgba(120, 120, 120, 1);
  border-radius: 10px;
  background-color: rgba(230, 230, 230, 1);
  padding: 30px 10px;
  position: relative;
`;

const AddBoardTitle = styled.h2`
  font-size: 24px;
`;

const AddBoardForm = styled.form`
  all: unset;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    border: 1px solid rgba(150, 150, 150, 0.7);
    border-radius: 5px;
    width: 90%;
    height: 45px;
    padding: 10px;
  }
`;

const AddBoardButton = styled.button`
  all: unset;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  font-size: 30px;
  font-weight: 600;
  color: rgba(1, 1, 1, 0.4);
  &:hover {
    color: red;
  }
`;

interface IBoard {
  board: string;
}

function AddBoard() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [boards, setBoards] = useRecoilState(boardState);

  const [addBoardActive, setAddBoardActive] = useRecoilState(addBoardState);
  const { register, handleSubmit } = useForm<IBoard>();

  const onValid = ({ board }: IBoard) => {
    setBoards((allBoards) => {
      return [...allBoards, board];
    });
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [board]: [],
      };
    });
    setAddBoardActive(false);
  };

  const handleAddBoardDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAddBoardActive(false);
  };

  return (
    <WrapperAdd isActive={addBoardActive}>
      <AddBoardContainer>
        <AddBoardTitle>Create New Board</AddBoardTitle>
        <AddBoardForm onSubmit={handleSubmit(onValid)}>
          <input
            {...register("board", { required: true })}
            type="text"
            placeholder="Add a board name"
          />
        </AddBoardForm>
        <AddBoardButton onClick={handleAddBoardDelete}>X</AddBoardButton>
      </AddBoardContainer>
    </WrapperAdd>
  );
}

export default AddBoard;
