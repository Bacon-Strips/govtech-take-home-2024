import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Match } from "../types/types";

interface MatchInputBoxProps {
  onAddMatches: (newMatches: Match[]) => void;
}

const MatchInputBox: React.FC<MatchInputBoxProps> = ({ onAddMatches }) => {
  const [matchInput, setMatchInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const isMatchInputInvalid = () => {
    const lines = matchInput.trim().split("\n");
    for (const line of lines) {
      const matchInfo = line.split(" ");
      if (
        matchInfo.length !== 4 ||
        matchInfo[0] === matchInfo[1] ||
        isNaN(parseInt(matchInfo[2])) ||
        isNaN(parseInt(matchInfo[3]))
      ) {
        return true;
      }
    }
    return false;
  };

  const handleMatchSubmit = () => {
    if (matchInput === "") {
      setError("Input cannot be empty.");
      return;
    }

    if (isMatchInputInvalid()) {
      setError(
        "Invalid input format. Ensure each line has: <Team A> <Team B> <Team A Goals> <Team B Goals>"
      );
      return;
    }

    const matchLines = matchInput.trim().split("\n");
    const newMatches: Match[] = matchLines.map((line) => {
      const [teamA, teamB, teamAGoals, teamBGoals] = line.split(" ");
      return {
        teamA,
        teamB,
        teamAGoals: parseInt(teamAGoals),
        teamBGoals: parseInt(teamBGoals),
      };
    });

    setError(null);
    setMatchInput("");

    onAddMatches(newMatches);
  };

  return (
    <Box>
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
  );
};

export default MatchInputBox;
