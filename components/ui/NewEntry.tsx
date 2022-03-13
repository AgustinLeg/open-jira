import { Box, Button, TextField } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { ChangeEvent, useState } from "react";
import { useEntriesContext } from "../../context/entries";
import { useUIContext } from "../../context/ui";

export const NewEntry = () => {
  const { isAddingEntry, setIsAddingEntry } = useUIContext();
  const { addNewEntry } = useEntriesContext();

  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    if (inputValue.trim().length === 0) return;
    addNewEntry(inputValue);
    setTouched(false);
    setInputValue("");
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            multiline
            label="Nueva entrada"
            helperText={inputValue.length <= 0 && touched && "Ingrese un valor"}
            onChange={handleTextChange}
            error={inputValue.length <= 0 && touched}
            value={inputValue}
            onBlur={() => setTouched(true)}
          />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button variant="text" onClick={() => setIsAddingEntry(false)}>
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={handleSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutlinedIcon />}
          fullWidth
          variant="outlined"
          onClick={() => setIsAddingEntry(true)}
        >
          Agregar tarea
        </Button>
      )}
    </Box>
  );
};
