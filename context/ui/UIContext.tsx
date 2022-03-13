import { createContext, FC, useContext, useReducer } from "react";
import { uiReducer } from "./";

export interface ContextProps {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  openSideMenu(): void;
  closeSideMenu(): void;
  setIsAddingEntry(isAdding: boolean): void;
  startDragging(): void;
  endDragging(): void;
}
const UIContext = createContext({} as ContextProps);

export const useUIContext = () => useContext(UIContext);

// Provider
export interface UIState {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

export const UIProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => dispatch({ type: "UI - Open Sidebar" });

  const closeSideMenu = () => dispatch({ type: "UI - Close Sidebar" });

  const setIsAddingEntry = (isAdding: boolean) =>
    dispatch({ type: "UI - Set isAddingEntry", payload: isAdding });

  const startDragging = () => dispatch({ type: "UI - Start Dragging" });

  const endDragging = () => dispatch({ type: "UI - End Dragging" });

  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
        startDragging,
        endDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
