import { StringifyOptions } from "querystring";
import { Entry } from "../../interfaces";
import { EntriesState } from "./";

type EntriesActionType =
  | { type: "[Entries] - Add Entry"; payload: Entry }
  | { type: "[Entries] - Update Entry"; payload: Entry }
  | { type: "[Entries] - Refresh Data"; payload: Entry[] }
  | { type: "[Entries] - Remove Entry"; payload: string };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
) => {
  switch (action.type) {
    case "[Entries] - Add Entry":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case "[Entries] - Update Entry":
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            return action.payload;
          }
          return entry;
        }),
      };
    case "[Entries] - Refresh Data":
      return {
        ...state,
        entries: [...action.payload],
      };
    case "[Entries] - Remove Entry":
      return {
        ...state,
        entries: state.entries.filter(
          (entry) => entry._id !== action.payload
        ),
      };

    default:
      return state;
  }
};
