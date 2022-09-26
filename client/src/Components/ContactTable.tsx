import {
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import UpdateFormDialog from "./UpdateFormDialog";

export type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export default function ContactTable(props: {
  contacts: Contact[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, contact: Contact) => void;
}) {
  const { contacts, onDelete, onUpdate } = props;
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [currentContact, setCurrentContact] = useState<Contact | null>(null);

  const handleUpdateClickOpen = () => {
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };

  if (contacts.length === 0) {
    return <Typography variant="h4">No contacts to show...</Typography>;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phoneNumber}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setCurrentContact(contact);
                      handleUpdateClickOpen();
                    }}
                    style={{ marginRight: "10px" }}
                    variant="contained"
                    color="success"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => onDelete(contact.id.toString())}
                    style={{ marginRight: "10px" }}
                    variant="contained"
                    color="error"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UpdateFormDialog
        onUpdate={onUpdate}
        currentContact={currentContact}
        open={updateOpen}
        onClose={handleUpdateClose}
      />
    </>
  );
}
