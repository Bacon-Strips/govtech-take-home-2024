import { useContext, useState } from "react";
import {
  Box,
  Button,
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
import { LogContext } from "../contexts/LogContext";
import { Match } from "../types/types";

interface MatchInfoTableProps {
  matches: Match[];
  updateMatch: (
    index: number,
    updatedMatch: Match
  ) => void;
}

const MatchInfoTable = ({ matches, updateMatch }: MatchInfoTableProps) => {
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editedMatch, setEditedMatch] = useState<Match | null>(null);
  const [page, setPage] = useState(0);
  const rowsPerPage = 6;
  const [searchQuery, setSearchQuery] = useState("");

  const { addLog } = useContext(LogContext);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setPage(0);
  };

  const handleEdit = (match: Match, index: number) => {
    setEditingRow(index);
    setEditedMatch({ ...match });
  };

  const handleSave = (index: number) => {
    const oldMatch = matches[index + rowsPerPage * page];
    if (editedMatch) {
      addLog(`Updating match from ${oldMatch} to ${editedMatch}`);
      updateMatch(index + rowsPerPage * page, editedMatch);
    }
    setEditingRow(null);
  };

  const handleCancel = () => {
    setEditingRow(null);
    setEditedMatch(null);
  };

  const handleFieldChange = (field: keyof Match, value: string | number) => {
    setEditedMatch((prev) => (prev ? { ...prev, [field]: value } : null));
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
            .filter(
              (x) =>
                x.teamA.includes(searchQuery) || x.teamB.includes(searchQuery)
            )
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((match, index) => (
              <TableRow key={index}>
                <TableCell>
                  {editingRow === index ? (
                    <TextField
                      value={editedMatch?.teamA || ""}
                      onChange={(e) =>
                        handleFieldChange("teamA", e.target.value)
                      }
                    />
                  ) : (
                    match.teamA
                  )}
                </TableCell>
                <TableCell>
                  {editingRow === index ? (
                    <TextField
                      value={editedMatch?.teamB || ""}
                      onChange={(e) =>
                        handleFieldChange("teamB", e.target.value)
                      }
                    />
                  ) : (
                    match.teamB
                  )}
                </TableCell>
                <TableCell>
                  {editingRow === index ? (
                    <TextField
                      type="number"
                      value={editedMatch?.teamAGoals || "0"}
                      onChange={(e) =>
                        handleFieldChange(
                          "teamAGoals",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  ) : (
                    match.teamAGoals
                  )}
                </TableCell>
                <TableCell>
                  {editingRow === index ? (
                    <TextField
                      type="number"
                      value={editedMatch?.teamBGoals || "0"}
                      onChange={(e) =>
                        handleFieldChange(
                          "teamBGoals",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  ) : (
                    match.teamBGoals
                  )}
                </TableCell>
                <TableCell>
                  {editingRow === index ? (
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <Button
                        onClick={() => handleSave(index)}
                        variant="contained"
                        color="primary"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outlined"
                        color="secondary"
                        sx={{ ml: 2 }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      onClick={() => handleEdit(match, index)}
                      variant="outlined"
                    >
                      Edit
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[6]}
        component="div"
        count={
          matches.filter(
            (x) =>
              x.teamA.includes(searchQuery) || x.teamB.includes(searchQuery)
          ).length
        }
        rowsPerPage={6}
        page={page}
        onPageChange={handleChangePage}
      />
    </TableContainer>
  );
};

export default MatchInfoTable;
