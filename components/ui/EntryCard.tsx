import { DragEvent, FC } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import { useUIContext } from "../../context/ui";

import { Entry } from "../../interfaces";
import { useRouter } from "next/router";
import { dateFunctions } from "../../utils";

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDragging, endDragging } = useUIContext();
  const router = useRouter();

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("id", entry._id);
    // todo: modificar el estado cuando estoy haciendo drag
    startDragging();
  };
  const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
    endDragging();
  };

  const handleClick = () => router.push(`/entries/${entry._id}`);

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={handleClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
        >
          <Typography variant="body2">
            {dateFunctions.getFormatDistanceToNow(entry.createdAt)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
