import { DragEvent, FC, useMemo } from "react";
import { List, Paper } from "@mui/material";

import { EntryCard } from "./";

import { EntryStatus } from "../../interfaces";
import { useEntriesContext } from "../../context/entries";
import { useUIContext } from "../../context/ui";

import styles from "./EntryList.module.css";

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useEntriesContext();
  const { isDragging, endDragging } = useUIContext();

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  );

  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("id");
    const entry = entries.find((e) => e._id === id)!;
    entry.status = status;
    updateEntry(entry);
    endDragging();
  };

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 250px)",
          overflowY: "scroll",
          backgroundColor: "transparent",
          padding: "1px 10px",
        }}
      >
        {/* todo: cambiara si estoy haciendo drag o no */}
        <List
          sx={{ opacity: isDragging ? 0.2 : 1, transition: "all 0.2s ease" }}
        >
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
