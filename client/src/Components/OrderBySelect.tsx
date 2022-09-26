import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function OrderBySelect(props: {
  setOrderby: (event: any) => void;
  orderBy: string;
}) {
  const { setOrderby, orderBy } = props;
  return (
    <FormControl sx={{ m: 2, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Order by</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={orderBy}
        label="Order by"
        onChange={(e) => setOrderby(e.target.value)}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={"firstName"}>First Name - Ascending</MenuItem>
        <MenuItem value={"firstNameDesc"}>First Name - Descending</MenuItem>
        <MenuItem value={"lastName"}>Last Name - Ascending</MenuItem>
        <MenuItem value={"lastNameDesc"}>Last Name - Descending</MenuItem>
        <MenuItem value={"email"}>Email - Ascending</MenuItem>
        <MenuItem value={"emailDesc"}>Email - Descending</MenuItem>
        <MenuItem value={"phone"}>Phone Number - Ascending</MenuItem>
        <MenuItem value={"phoneDesc"}>Phone Number - Descending</MenuItem>
      </Select>
    </FormControl>
  );
}
