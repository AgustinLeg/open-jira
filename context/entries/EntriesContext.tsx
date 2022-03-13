import { createContext, FC, useContext, useEffect, useReducer } from "react";
import { entriesAPI } from "../../apis";
import { useSnackbar } from "notistack";

import { Entry } from "../../interfaces";
import { entriesReducer } from "./";

export interface ContextProps {
  entries: Entry[];
  addNewEntry(description: string): void;
  updateEntry(entry: Entry, showSnakbar?: boolean): void;
  removeEntry(id: string): void;
}

const EntriesContext = createContext({} as ContextProps);
export const useEntriesContext = () => useContext(EntriesContext);

// Provider
export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const refreshEntries = async () => {
    const { data } = await entriesAPI.get<Entry[]>("/entries");

    dispatch({ type: "[Entries] - Refresh Data", payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  const addNewEntry = async (description: string) => {
    try {
      const { data } = await entriesAPI.post<Entry>("/entries", {
        description,
      });
      dispatch({
        type: "[Entries] - Add Entry",
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnakbar = false
  ) => {
    try {
      const { data } = await entriesAPI.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      });
      dispatch({
        type: "[Entries] - Update Entry",
        payload: data,
      });
      if (showSnakbar) {
        enqueueSnackbar("Entrada Actualizada", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const removeEntry = async (id: string) => {
    try {
      await entriesAPI.delete(`entries/${id}`);
      dispatch({ type: "[Entries] - Remove Entry", payload: id });
      enqueueSnackbar("Entrada eliminada", {
        variant: "info",
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } catch (error) {
      enqueueSnackbar("Ups, algo salio mal", {
        variant: "error",
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  return (
    <EntriesContext.Provider
      value={{ ...state, addNewEntry, updateEntry, removeEntry }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
