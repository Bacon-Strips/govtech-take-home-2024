import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import TeamInfoTable from "../components/TeamInfoTable";
import { Team } from "../types/types";

const TeamRankingPage = () => {
  const [teamInput, setTeamInput] = useState("");
  const [matchInput, setMatchInput] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);

  const isTeamInputInvalid = () => {
    let flag = false;
    teamInput.trim().split("\n").map((line) => {
      const teamInfo = line.split(' ');
      if (teamInfo.length != 3 || isNaN(parseInt(teamInfo[2]))) {
        flag = true;
      }
    })
    return flag;
  }

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
          rows={10}
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

      <Box mb={4}>
        <Typography variant="h6">Enter Match Results</Typography>
        <TextField
          id="match-results-textbox"
          multiline
          rows={10}
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
      </Box>
    </Box>
  );
};

export default TeamRankingPage;
