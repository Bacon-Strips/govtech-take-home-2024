import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TeamAggregate } from "../types/types";

interface RankingTableProps {
  ranks: TeamAggregate[];
}

const RankingTable = ({ ranks }: RankingTableProps) => {
  return (
    <Box>
      <TableContainer component={Paper}>
        <Box display="flex" justifyContent="space-between">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  Group 1
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Team name</TableCell>
                <TableCell>Qualifier</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ranks
                .filter((x) => x.groupNumber == 1)
                .map((rank, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{rank.name}</TableCell>
                    <TableCell>{index + 1 <= 4 ? "yes" : "no"}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  Group 2
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Team name</TableCell>
                <TableCell>Qualifier</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ranks
                .filter((x) => x.groupNumber == 2)
                .map((rank, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{rank.name}</TableCell>
                    <TableCell>{index + 1 <= 4 ? "yes" : "no"}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    </Box>
  );
};

export default RankingTable;
