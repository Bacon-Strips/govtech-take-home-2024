import { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Team } from "../types/types";

interface TeamInfoTableProps {
  teams: Team[];
}

const TeamInfoTable = ({ teams }: TeamInfoTableProps) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 6;

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Team Name</TableCell>
            <TableCell>Registration Date</TableCell>
            <TableCell>Group</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((team, index) => (
              <TableRow key={index}>
                <TableCell>{team.name}</TableCell>
                <TableCell>{team.registrationDate}</TableCell>
                <TableCell>{team.groupNumber}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={teams.length}
        rowsPerPage={6}
        page={page}
        onPageChange={handleChangePage}
      />
    </TableContainer>
  );
};

export default TeamInfoTable;
