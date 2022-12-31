import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "toDo_localStorage",
  storage: localStorage,
});

interface IToDoState {
  [key: string]: IToDo[];
}

export interface IToDo {
  id: number;
  text: string;
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export const boardState = atom<string[]>({
  key: "board",
  default: ["To Do", "Doing", "Done"],
  effects_UNSTABLE: [persistAtom],
});

export const addBoardState = atom<boolean>({
  key: "addBoard",
  default: false,
});
