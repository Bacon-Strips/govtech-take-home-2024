import { useContext, useEffect, useState } from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

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
    if (teamAggregates.length == 0) return;
    setRankings(teamAggregates);
  };

  const clearRankings = () => {
    setRankings([]);
    addLog(`Cleared rankings`);
  };

  const updateTeam = (index: number, updatedTeam: Team) => {
    setTeams((prevTeams) =>
      prevTeams.map((team, i) => (i === index ? updatedTeam : team))
    );
  };

  const updateMatch = (index: number, updatedMatch: Match) => {
    setMatches((prevMatches) =>
      prevMatches.map((match, i) => (i === index ? updatedMatch : match))
    );
  };

  useEffect(() => {
    const savedTeams = localStorage.getItem("teams");
    const savedMatches = localStorage.getItem("matches");
    const savedRankings = localStorage.getItem("rankings");
    console.log([savedTeams, savedMatches, savedRankings]);
    if (savedTeams) {
      addTeams(JSON.parse(savedTeams));
    }
    if (savedMatches) {
      addMatches(JSON.parse(savedMatches));
    }
    if (savedRankings) {
      updateRankings(JSON.parse(savedRankings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("teams", JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem("matches", JSON.stringify(matches));
  }, [matches]);

  useEffect(() => {
    localStorage.setItem("rankings", JSON.stringify(rankings));
  }, [rankings]);

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Championship Team Rankings
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box p={4}>
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
            <Box mb={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={clearRankings}
                sx={{ mt: 2 }}
              >
                Clear rankings
              </Button>
            </Box>

            <RankingTable ranks={rankings} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TeamRankingPage;
