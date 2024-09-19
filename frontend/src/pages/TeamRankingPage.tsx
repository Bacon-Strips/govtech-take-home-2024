import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import TeamInfoTable from "../components/TeamInfoTable";
import { Match, Team } from "../types/types";
import MatchInfoTable from "../components/MatchInfoTable";

const TeamRankingPage = () => {
  const [teamInput, setTeamInput] = useState("");
  const [matchInput, setMatchInput] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

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

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Championship Team Rankings
      </Typography>

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

      <Box mb={4} mt={4}>
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
  );
};

export default TeamRankingPage;
