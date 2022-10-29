import { useContext } from "react";
import { AppStateContext } from "../state/AppStateContext";

export const useAppState = () => {
  return useContext(AppStateContext);
};
