import { Grid, Button, Typography, Paper } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import CreateFormDialog from "./Components/CreateFormDialog";
import { Contact } from "./Components/ContactTable";
import ContactTable from "./Components/ContactTable";
import ContactTablePagination from "./Components/ContactTablePagination";
import ProductSearch from "./Components/ContactSearch";
import OrderBySelect from "./Components/OrderBySelect";

export type MetaData = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
};

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [metadata, setMetadata] = useState<MetaData>();
  const [open, setOpen] = useState<boolean>(false);

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);
  const [orderBy, setOrderby] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("pageNumber", pageNumber.toString());
    params.append("pageSize", pageSize.toString());
    params.append("orderBy", orderBy);
    params.append("searchTerm", searchTerm);
    axios
      .get("http://localhost:5000/contacts", { params })
      .then((res) => {
        setContacts(res.data);
        const pagination = res.headers["pagination"];
        console.log(pagination);
        if (pagination) setMetadata(JSON.parse(pagination));
      })
      .catch((err) => console.log(err));
  }, [pageSize, orderBy, searchTerm, pageNumber]);

  const onCreate = (contact: Partial<Contact>) => {
    axios.post("http://localhost:5000/contacts", contact).then((res) => {
      setContacts([...contacts, res.data]);
      if (metadata)
        setMetadata({ ...metadata, totalCount: metadata.totalCount + 1 });
    });
  };

  const onUpdate = (id: string, contact: Contact) => {
    axios.put(`http://localhost:5000/contacts/${id}`, contact);
    const oldContactIndex = contacts.findIndex(
      (contact) => contact.id.toString() === id
    );
    const newContacts = contacts.slice();
    newContacts[oldContactIndex] = contact;
    setContacts(newContacts);
  };

  const onDelete = (id: string) => {
    axios.delete(`http://localhost:5000/contacts/${id}`);
    const newContacts = contacts.filter(
      (contact) => contact.id.toString() !== id
    );
    if (newContacts.length === 0 && pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    } else {
      setContacts(newContacts);
    }
    if (metadata)
      setMetadata({ ...metadata, totalCount: metadata.totalCount - 1 });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPageNumber(newPage + 1);
  };

  return (
    <>
      <Grid
        container
        justifyContent={"center"}
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item>
          <Typography variant="h4">Contact List</Typography>
          <Button onClick={handleClickOpen} variant="contained" color="success">
            Add Contact
          </Button>
          <Grid container>
            <Grid item>
              <ProductSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </Grid>
            <Grid item>
              <OrderBySelect orderBy={orderBy} setOrderby={setOrderby} />
            </Grid>
          </Grid>

          <ContactTable
            contacts={contacts}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
          <ContactTablePagination
            metadata={metadata}
            handleChangePage={handleChangePage}
          ></ContactTablePagination>
        </Grid>
      </Grid>
      <CreateFormDialog open={open} onClose={handleClose} onCreate={onCreate} />
    </>
  );
}
