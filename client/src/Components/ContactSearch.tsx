import { TextField } from "@mui/material";

export default function ContactSearch(props: {
  setSearchTerm: (event: any) => void;
  searchTerm: string;
}) {
  const { setSearchTerm, searchTerm } = props;
  return (
    <TextField
      sx={{ mr: 2, mb: 2, mt: 2 }}
      label="Search contacts"
      variant="outlined"
      fullWidth
      size="small"
      value={searchTerm || ""}
      onChange={(event: any) => {
        setSearchTerm(event.target.value);
      }}
    />
  );
}
