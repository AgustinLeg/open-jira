import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  capitalize,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import { Layout } from "../../components/layouts";
import { Entry, EntryStatus } from "../../interfaces";
import { ChangeEvent, FC, useMemo, useState } from "react";
import { useEntriesContext } from "../../context/entries";
import { GetServerSideProps } from "next";
import { dbEntries } from "../../databases";
import Modal from "../../components/ui/Modal";
import { useRouter } from "next/router";
import { dateFunctions } from "../../utils";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
  entry: Entry;
}

const EntryPage: FC<Props> = ({ entry }) => {
  const { _id, description, status: entryStatus, createdAt } = entry;

  const [inputValue, setInputValue] = useState(description);
  const [status, setStatus] = useState<EntryStatus>(entryStatus);
  const [touched, setTouched] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { updateEntry, removeEntry } = useEntriesContext();

  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as EntryStatus);
  };

  const onSave = () => {
    if (inputValue.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      description: inputValue,
      status,
    };

    updateEntry(updatedEntry, true);
    setTouched(false);
  };

  const onRemove = () => {
    removeEntry(_id);
    handleClose();
    router.replace("/");
  };

  return (
    <Layout title={inputValue.substring(0, 20) + "..."}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} md={8} lg={6}>
          <Card>
            <CardHeader
              title={`Entrada`}
              subheader={`Creada hace ${dateFunctions.getFormatDistanceToNow(
                entry.createdAt
              )}`}
            />

            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva Entrada"
                multiline
                label="Nueva Entrada"
                value={inputValue}
                onChange={handleTextChange}
                onBlur={() => setTouched(true)}
                helperText={isNotValid && "Ingrese un valor"}
                error={isNotValid}
              />

              {/* RADIO */}

              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChange}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={`option-${option}`}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={onSave}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "red",
        }}
        onClick={handleOpen}
      >
        <DeleteOutlinedIcon />
      </IconButton>
      <Modal isOpen={isOpen} handleClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          Esta seguro de eliminar este ToDo
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta opcion no se puede revertir
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "text.primary" }}>
            Cancelar
          </Button>
          <Button
            onClick={onRemove}
            autoFocus
            variant="contained"
            sx={{ backgroundColor: "red" }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Modal>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry,
    },
  };
};

export default EntryPage;
