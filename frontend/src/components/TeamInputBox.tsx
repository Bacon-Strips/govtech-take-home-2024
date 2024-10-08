import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Team } from "../types/types";

interface TeamInputBoxProps {
  onAddTeams: (newTeams: Team[]) => void;
}

const TeamInputBox: React.FC<TeamInputBoxProps> = ({ onAddTeams }) => {
  const [teamInput, setTeamInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const isInvalidDate = (date: string) => {
    const [day, month] = date.split("/");
    return isNaN(Number(day)) || isNaN(Number(month));
  };

  const isTeamInputInvalid = () => {
    const lines = teamInput.trim().split("\n");
    for (const line of lines) {
      const teamInfo = line.split(" ");
      if (
        teamInfo.length !== 3 ||
        isInvalidDate(teamInfo[1]) ||
        isNaN(parseInt(teamInfo[2]))
      ) {
        return true;
      }
    }
    return false;
  };

  const handleTeamSubmit = () => {
    if (teamInput === "") {
      setError("Input cannot be empty.");
      return;
    }

    if (isTeamInputInvalid()) {
      setError(
        "Invalid input format. Ensure each line has: <Team Name> <Registration Date in DD/MM> <Group Number>"
      );
      return;
    }

    const teamLines = teamInput.trim().split("\n");
    const newTeams: Team[] = teamLines.map((line) => {
      const [name, registrationDate, group] = line.split(" ");
      return { name, registrationDate, groupNumber: parseInt(group) };
    });
    setTeamInput("");
    onAddTeams(newTeams);
  };

  return (
    <Box>
      <Typography variant="h6">Enter Team Information</Typography>
      <TextField
        id="team-info-textbox"
        multiline
        rows={12}
        fullWidth
        placeholder="<Team name> <Registration date in DD/MM> <Group number>"
        value={teamInput}
        onChange={(e) => setTeamInput(e.target.value)}
        error={error != null}
        helperText={error}
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
        Add Teams
      </Button>
    </Box>
  );
};

export default TeamInputBox;
