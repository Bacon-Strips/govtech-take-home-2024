import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";

const TeamRankingPage = () => {
  const [teamInput, setTeamInput] = useState("");
  const [matchInput, setMatchInput] = useState("");

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
            '& .MuiInputBase-input::placeholder': {
              color: 'white',
            },
          }}
        />
      </Box>

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
            '& .MuiInputBase-input::placeholder': {
              color: 'white', 
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default TeamRankingPage;
