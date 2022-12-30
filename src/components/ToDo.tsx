import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      //Method 1:
      //   const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      //   const newToDo = { text, id, category: name as categories };
      //   const newToDos = [
      //     ...oldToDos.slice(0, targetIndex),
      //     newToDo,
      //     ...oldToDos.slice(targetIndex + 1),
      //   ];
      //   return newToDos;

      // Method 2:
      const newToDos = oldToDos.map((toDo) =>
        toDo.id === id ? { ...toDo, category: name as IToDo["category"] } : toDo
      );
      return newToDos;
    });
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      const newToDos = oldToDos.filter((toDo) => toDo.id !== id);
      return newToDos;
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      <button onClick={handleDelete}>X</button>
    </li>
  );
}

export default ToDo;
