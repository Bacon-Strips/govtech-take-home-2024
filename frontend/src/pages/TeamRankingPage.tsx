import { useContext, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

import { LogContext } from "../contexts/LogContext";
import TeamInfoTable from "../components/TeamInfoTable";
import { Match, Team, TeamAggregate } from "../types/types";
import MatchInfoTable from "../components/MatchInfoTable";
import RankingTable from "../components/RankingTable";
import TeamInputBox from "../components/TeamInputBox";
import MatchInputBox from "../components/MatchInputBox";
import RankCalculator from "../components/RankCalculator";

const TeamRankingPage = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [rankings, setRankings] = useState<TeamAggregate[]>([]);

  const { addLog, logs } = useContext(LogContext);

  const addTeams = (newTeams: Team[]) => {
    setTeams((prevTeams) => [...prevTeams, ...newTeams]);
    addLog(`Added teams: ${newTeams.map((team) => team.name).join(", ")}`);
  };

  const clearTeams = () => {
    setTeams([]);
    addLog(`Cleared teams`);
  };

  const addMatches = (newMatches: Match[]) => {
    setMatches((prevMatches) => [...prevMatches, ...newMatches]);
    addLog(
      `Added matches: ${newMatches
        .map((match) => `${match.teamA} vs ${match.teamB}`)
        .join(", ")}`
    );
  };

  const clearMatches = () => {
    setMatches([]);
    addLog(`Cleared matches`);
  };

  const updateRankings = (teamAggregates: TeamAggregate[]) => {
    setRankings(teamAggregates);
  };

  const updateTeam = (oldTeamName: string, updatedTeam: Team) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) => (team.name === oldTeamName ? updatedTeam : team))
    );
  };

  const updateMatch = (
    oldTeamA: string,
    oldTeamB: string,
    updatedMatch: Match
  ) => {
    setMatches((prevMatches) =>
      prevMatches.map((match) =>
        match.teamA === oldTeamA && match.teamB === oldTeamB
          ? updatedMatch
          : match
      )
    );
  };

  return (
    <Box p={4}>
      <Typography id="title" variant="h4" gutterBottom>
        Championship Team Rankings
      </Typography>

      <Box
        id="team-ranking-body"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box
          p={4}
          id="team-info"
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <Box mb={4}>
            <TeamInputBox onAddTeams={addTeams} />
            <Button
              variant="contained"
              color="secondary"
              onClick={clearTeams}
              sx={{ mt: 2 }}
            >
              Clear teams
            </Button>
          </Box>
          <TeamInfoTable teams={teams} updateTeam={updateTeam} />
        </Box>

        <Box
          p={4}
          id="match-info"
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <Box mb={4}>
            <MatchInputBox onAddMatches={addMatches} />
            <Button
              variant="contained"
              color="secondary"
              onClick={clearMatches}
              sx={{ mt: 2 }}
            >
              Clear matches
            </Button>
          </Box>
          <MatchInfoTable matches={matches} updateMatch={updateMatch} />
        </Box>

        <Box
          id="ranking-info"
          p={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <RankCalculator
            teams={teams}
            matches={matches}
            onCalculate={updateRankings}
          />
          <RankingTable ranks={rankings} />
        </Box>
      </Box>
    </Box>
  );
};

export default TeamRankingPage;
