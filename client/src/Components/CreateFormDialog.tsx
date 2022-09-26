import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useRef, useState } from "react";
import { Contact } from "./ContactTable";
import { Typography } from "@mui/material";

export default function FormDialog(props: {
  onClose: () => void;
  onCreate: (contact: Partial<Contact>) => void;
  open: boolean;
}) {
  const firstNameField = useRef<HTMLInputElement>(null);
  const lastNameField = useRef<HTMLInputElement>(null);
  const emailField = useRef<HTMLInputElement>(null);
  const phoneNumberField = useRef<HTMLInputElement>(null);

  const [contact, setContact] = useState<Partial<Contact>>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (
      firstNameField.current?.value &&
      lastNameField.current?.value &&
      emailField.current?.value &&
      phoneNumberField.current?.value
    ) {
      props.onCreate(contact);
      props.onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>Add Food</DialogTitle>
        <DialogContent>
          <TextField
            required
            inputRef={firstNameField}
            autoFocus
            margin="dense"
            label="First Name"
            type="email"
            fullWidth
            variant="standard"
            onChange={() =>
              setContact({
                ...contact,
                firstName: firstNameField.current!.value,
              })
            }
          />
          <TextField
            required
            inputRef={lastNameField}
            autoFocus
            margin="dense"
            label="Last Name"
            type="email"
            fullWidth
            variant="standard"
            onChange={() =>
              setContact({
                ...contact,
                lastName: lastNameField.current!.value,
              })
            }
          />
          <TextField
            required
            inputRef={emailField}
            autoFocus
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            onChange={() =>
              setContact({
                ...contact,
                email: emailField.current!.value,
              })
            }
          />
          <TextField
            required
            inputRef={phoneNumberField}
            autoFocus
            margin="dense"
            label="Phone Number"
            type="email"
            fullWidth
            variant="standard"
            onChange={() =>
              setContact({
                ...contact,
                phoneNumber: phoneNumberField.current!.value,
              })
            }
          />
          {error && (
            <Typography variant="caption" color={"red"}>
              All fields must be filled
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              props.onClose();
              setError(false);
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
