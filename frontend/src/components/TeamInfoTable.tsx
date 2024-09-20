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
import { Team } from "../types/types";

interface TeamInfoTableProps {
  teams: Team[];
}

const TeamInfoTable = ({ teams }: TeamInfoTableProps) => {
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
      <Box id="team-info-searchbox" paddingX={2}>
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
            <TableCell>Team Name</TableCell>
            <TableCell>Registration Date</TableCell>
            <TableCell>Group</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams
            .filter((x) => x.name.includes(searchQuery))
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
        count={teams.filter((x) => x.name.includes(searchQuery)).length}
        rowsPerPage={6}
        page={page}
        onPageChange={handleChangePage}
      />
    </TableContainer>
  );
};

export default TeamInfoTable;
