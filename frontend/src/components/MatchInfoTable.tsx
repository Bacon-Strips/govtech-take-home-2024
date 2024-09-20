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
import { Match } from "../types/types";

interface MatchInfoTableProps {
  matches: Match[];
}

const MatchInfoTable = ({ matches }: MatchInfoTableProps) => {
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
            <TableCell>Team A</TableCell>
            <TableCell>Team B</TableCell>
            <TableCell>Team A Goals</TableCell>
            <TableCell>Team B Goals</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {matches
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((match, index) => (
              <TableRow key={index}>
                <TableCell>{match.teamA}</TableCell>
                <TableCell>{match.teamB}</TableCell>
                <TableCell>{match.teamAGoals}</TableCell>
                <TableCell>{match.teamBGoals}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[6]}
        component="div"
        count={matches.length}
        rowsPerPage={6}
        page={page}
        onPageChange={handleChangePage}
      />
    </TableContainer>
  );
};

export default MatchInfoTable;
