import { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { Match } from "../types/types";

interface MatchInfoTableProps {
  matches: Match[];
}

const MatchInfoTable = ({ matches }: MatchInfoTableProps) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 6;
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Box id="match-info-searchbox" paddingX={2}>
        <TextField
          label="Search Teams"
          variant="standard"
          fullWidth
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </Box>

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
            .filter((x) => x.teamA.includes(searchQuery) || x.teamB.includes(searchQuery))
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
        count={matches.filter((x) => x.teamA.includes(searchQuery) || x.teamB.includes(searchQuery)).length}
        rowsPerPage={6}
        page={page}
        onPageChange={handleChangePage}
      />
    </TableContainer>
  );
};

export default MatchInfoTable;
