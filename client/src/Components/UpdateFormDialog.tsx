import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useRef, useState } from "react";
import { Contact } from "./ContactTable";
import { Typography } from "@mui/material";

export default function UpdateFormDialog(props: {
  currentContact: Contact | null;
  onClose: () => void;
  onUpdate: (id: string, contact: Contact) => void;
  open: boolean;
}) {
  const { currentContact } = props;

  const firstNameField = useRef<HTMLInputElement>(null);
  const lastNameField = useRef<HTMLInputElement>(null);
  const emailField = useRef<HTMLInputElement>(null);
  const phoneNumberField = useRef<HTMLInputElement>(null);

  const [contactUpdate, setContactUpdate] = useState<Contact | null>(
    currentContact
  );
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (
      firstNameField.current?.value &&
      lastNameField.current?.value &&
      emailField.current?.value &&
      phoneNumberField.current?.value
    ) {
      props.onUpdate(
        (contactUpdate as Contact).id.toString(),
        contactUpdate as Contact
      );
      props.onClose();
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    setContactUpdate(currentContact);
  }, [currentContact]);

  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>Update Contact</DialogTitle>
        <DialogContent>
          <TextField
            id="firstNameField"
            required
            inputRef={firstNameField}
            autoFocus
            margin="dense"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            value={contactUpdate?.firstName}
            onChange={() =>
              setContactUpdate({
                ...(contactUpdate as Contact),
                firstName: firstNameField.current!.value,
              })
            }
          />
          <TextField
            id="lastNameField"
            required
            inputRef={lastNameField}
            autoFocus
            margin="dense"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            value={contactUpdate?.lastName}
            onChange={() =>
              setContactUpdate({
                ...(contactUpdate as Contact),
                lastName: lastNameField.current!.value,
              })
            }
          />
          <TextField
            id="emailField"
            required
            inputRef={emailField}
            autoFocus
            margin="dense"
            label="Email"
            type="text"
            fullWidth
            variant="standard"
            value={contactUpdate?.email}
            onChange={() =>
              setContactUpdate({
                ...(contactUpdate as Contact),
                email: emailField.current!.value,
              })
            }
          />
          <TextField
            id="phoneNumberField"
            required
            inputRef={phoneNumberField}
            autoFocus
            margin="dense"
            label="Phone Number"
            type="text"
            fullWidth
            variant="standard"
            value={contactUpdate?.phoneNumber}
            onChange={() =>
              setContactUpdate({
                ...(contactUpdate as Contact),
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
          <Button variant="contained" color="error" onClick={props.onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
