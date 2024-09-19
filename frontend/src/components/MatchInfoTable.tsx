import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Match } from "../types/types";

interface MatchInfoTableProps {
  matches: Match[];
}

const MatchInfoTable = ({ matches }: MatchInfoTableProps) => {
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
          {matches.map((match, index) => (
            <TableRow key={index}>
              <TableCell>{match.teamA}</TableCell>
              <TableCell>{match.teamB}</TableCell>
              <TableCell>{match.teamAGoals}</TableCell>
              <TableCell>{match.teamBGoals}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MatchInfoTable;