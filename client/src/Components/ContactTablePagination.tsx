import { TablePagination } from "@mui/material";
import { MetaData } from "../App";

export default function ContactTablePagination(props: {
  metadata: MetaData | undefined;
  handleChangePage: (event: unknown, newPage: number) => void;
}) {
  const { metadata, handleChangePage } = props;
  if (!metadata) return <></>;
  return (
    <TablePagination
      component="div"
      rowsPerPageOptions={[]}
      rowsPerPage={metadata.pageSize}
      count={metadata.totalCount}
      page={metadata.currentPage - 1}
      onPageChange={handleChangePage}
    />
  );
}
