import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Team } from "../types/types";

interface TeamInfoTableProps {
  teams: Team[];
}

const TeamInfoTable = ({ teams }: TeamInfoTableProps) => {
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
          {teams.map((team, index) => (
            <TableRow key={index}>
              <TableCell>{team.name}</TableCell>
              <TableCell>{team.registrationDate}</TableCell>
              <TableCell>{team.groupNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeamInfoTable;