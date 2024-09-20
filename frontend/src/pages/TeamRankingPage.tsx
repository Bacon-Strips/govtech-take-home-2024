import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import TeamInfoTable from "../components/TeamInfoTable";
import { Match, Team, TeamAggregate } from "../types/types";
import MatchInfoTable from "../components/MatchInfoTable";
import RankingTable from "../components/RankingTable";

const TeamRankingPage = () => {
  const [teamInput, setTeamInput] = useState("");
  const [matchInput, setMatchInput] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [rankings, setRankings] = useState<TeamAggregate[]>([]);

  const isTeamInputInvalid = () => {
    let flag = false;
    teamInput
      .trim()
      .split("\n")
      .map((line) => {
        const teamInfo = line.split(" ");
        if (teamInfo.length != 3 || isNaN(parseInt(teamInfo[2]))) {
          flag = true;
        }
      });
    return flag;
  };

  const handleTeamSubmit = () => {
    if (teamInput == "") return;
    if (isTeamInputInvalid()) return;
    const teamLines = teamInput.trim().split("\n");
    const newTeams = teamLines.map((line) => {
      const [name, date, group] = line.split(" ");
      return { name, registrationDate: date, groupNumber: parseInt(group) };
    });

    setTeams((prevTeams) => [...prevTeams, ...newTeams]);
    setTeamInput("");
  };

  const isMatchInputInvalid = () => {
    let flag = false;
    matchInput
      .trim()
      .split("\n")
      .map((line) => {
        const matchInfo = line.split(" ");
        if (
          matchInfo.length != 4 ||
          matchInfo[0] == matchInfo[1] ||
          isNaN(parseInt(matchInfo[2])) ||
          isNaN(parseInt(matchInfo[3]))
        ) {
          flag = true;
        }
      });
    return flag;
  };

  const handleMatchSubmit = () => {
    if (matchInput == "") return;
    if (isMatchInputInvalid()) return;
    const matchLines = matchInput.trim().split("\n");
    const newMatches = matchLines.map((line) => {
      const [teamA, teamB, goalsA, goalsB] = line.split(" ");
      return {
        teamA,
        teamB,
        teamAGoals: parseInt(goalsA),
        teamBGoals: parseInt(goalsB),
      };
    });

    setMatches((prevMatches) => [...prevMatches, ...newMatches]);
    setMatchInput("");
  };

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

  return (
    <Box p={4}>
      <Typography id="title" variant="h4" gutterBottom>
        Championship Team Rankings
      </Typography>

      <Box
        id="team-ranking-body"
        sx={{ display: "flex", flexDirection: "row" }}
      >
        <Box p={4} id="team-info">
          <Box mb={4}>
            <Typography variant="h6">Enter Team Information</Typography>
            <TextField
              id="team-info-textbox"
              multiline
              rows={12}
              fullWidth
              placeholder="<Team name> <Registration date in DD/MM> <Group number>"
              value={teamInput}
              onChange={(e) => setTeamInput(e.target.value)}
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: "white",
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleTeamSubmit}
              sx={{ mt: 2 }}
            >
              Add teams
            </Button>
          </Box>
          <TeamInfoTable teams={teams} />
        </Box>

        <Box p={4} id="match-info">
          <Box mb={4}>
            <Typography variant="h6">Enter Match Results</Typography>
            <TextField
              id="match-results-textbox"
              multiline
              rows={12}
              fullWidth
              placeholder="<Team A name> <Team B name> <Team A goals scored> <Team B goals scored>"
              value={matchInput}
              onChange={(e) => setMatchInput(e.target.value)}
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: "white",
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleMatchSubmit}
              sx={{ mt: 2 }}
            >
              Add Matches
            </Button>
          </Box>
          <MatchInfoTable matches={matches} />
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
