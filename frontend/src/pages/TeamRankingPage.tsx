import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

import TeamInfoTable from "../components/TeamInfoTable";
import { Match, Team, TeamAggregate } from "../types/types";
import MatchInfoTable from "../components/MatchInfoTable";
import RankingTable from "../components/RankingTable";
import TeamInputBox from "../components/TeamInputBox";
import MatchInputBox from "../components/MatchInputBox";

const TeamRankingPage = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [rankings, setRankings] = useState<TeamAggregate[]>([]);

  const addTeams = (newTeams: Team[]) => {
    setTeams((prevTeams) => [...prevTeams, ...newTeams]);
  };

  const clearTeams = () => {
    setTeams([]);
  };

  const addMatches = (newMatches: Match[]) => {
    setMatches((prevMatches) => [...prevMatches, ...newMatches]);
  };

  const clearMatches = () => {
    setMatches([]);
  }

  const calculateRankings = (allMatches: Match[]) => {
    const teamAggregate: { [key: string]: TeamAggregate } = {};

    teams.forEach((team) => {
      teamAggregate[team.name] = {
        ...team,
        wins: 0,
        draws: 0,
        losses: 0,
        goals: 0,
      };
    });

    allMatches.forEach((match) => {
      teamAggregate[match.teamA].goals += match.teamAGoals;
      teamAggregate[match.teamB].goals += match.teamBGoals;
      if (match.teamAGoals > match.teamBGoals) {
        teamAggregate[match.teamA].wins += 1;
        teamAggregate[match.teamB].losses += 1;
      }
      if (match.teamAGoals < match.teamBGoals) {
        teamAggregate[match.teamA].losses += 1;
        teamAggregate[match.teamB].wins += 1;
      }
      if (match.teamAGoals == match.teamBGoals) {
        teamAggregate[match.teamA].draws += 1;
        teamAggregate[match.teamB].draws += 1;
      }
    });

    const rankingsArray = Object.values(teamAggregate);

    setRankings(rankingsArray.sort(rankingFunc));
  };

  const rankingFunc = (a: TeamAggregate, b: TeamAggregate) => {
    const matchPointsCalc = (n: TeamAggregate) => n.wins * 3 + n.draws;
    const altMatchPointsCalc = (n: TeamAggregate) =>
      n.wins * 5 + n.draws * 3 + n.losses;
    if (matchPointsCalc(a) != matchPointsCalc(b)) {
      return matchPointsCalc(b) - matchPointsCalc(a);
    }
    if (a.goals != b.goals) return b.goals - a.goals;
    if (altMatchPointsCalc(a) != altMatchPointsCalc(b)) {
      return altMatchPointsCalc(b) - altMatchPointsCalc(a);
    }

    const [dayA, monthA] = a.registrationDate.split("/").map(Number);
    const [dayB, monthB] = b.registrationDate.split("/").map(Number);
    if (monthA != monthB) {
      return monthA - monthB;
    }
    return dayA - dayB;
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
        <Box p={4} id="team-info">
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

        <Box p={4} id="match-info">
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

        <Box id="ranking-info" p={4}>
          <Typography variant="h6">Rankings</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => calculateRankings(matches)}
            sx={{ mb: 2 }}
          >
            Calculate Rankings
          </Button>
          <RankingTable ranks={rankings} />
        </Box>
      </Box>
    </Box>
  );
};

export default TeamRankingPage;
