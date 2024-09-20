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
import { Team } from "../types/types";

interface TeamInfoTableProps {
  teams: Team[];
  updateTeam: (oldTeamName: string, updatedTeam: Team) => void;
}

const TeamInfoTable = ({ teams, updateTeam }: TeamInfoTableProps) => {
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editedTeam, setEditedTeam] = useState<Team | null>(null);
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

  const handleEdit = (team: Team, index: number) => {
    setEditingRow(index);
    setEditedTeam({ ...team });
  };

  const handleSave = (index: number) => {
    const oldTeam = teams[index + rowsPerPage * page];
    if (editedTeam) {
      addLog(`Updating team from ${oldTeam} to ${editedTeam}`);
      updateTeam(oldTeam.name, editedTeam);
    }
    setEditingRow(null);
  };

  const handleCancel = () => {
    setEditingRow(null);
    setEditedTeam(null);
  };

  const handleFieldChange = (field: keyof Team, value: string | number) => {
    setEditedTeam((prev) => (prev ? { ...prev, [field]: value } : null));
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
            <TableCell>Registration Date (DD/MM)</TableCell>
            <TableCell>Group</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams
            .filter((x) => x.name.includes(searchQuery))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((team, index) => (
              <TableRow key={index}>
                <TableCell>
                  {editingRow === index ? (
                    <TextField
                      variant="standard"
                      value={editedTeam?.name || ""}
                      onChange={(e) =>
                        handleFieldChange("name", e.target.value)
                      }
                    />
                  ) : (
                    team.name
                  )}
                </TableCell>
                <TableCell>
                  {editingRow === index ? (
                    <TextField
                      variant="standard"
                      value={editedTeam?.registrationDate || ""}
                      onChange={(e) =>
                        handleFieldChange("registrationDate", e.target.value)
                      }
                    />
                  ) : (
                    team.registrationDate
                  )}
                </TableCell>
                <TableCell>
                  {editingRow === index ? (
                    <TextField
                      type="number"
                      variant="standard"
                      value={editedTeam?.groupNumber || ""}
                      onChange={(e) =>
                        handleFieldChange(
                          "groupNumber",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  ) : (
                    team.groupNumber
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
                      onClick={() => handleEdit(team, index)}
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
