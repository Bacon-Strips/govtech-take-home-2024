import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Team, Match, TeamAggregate } from "../types/types";

interface RankCalculatorProps {
  teams: Team[];
  matches: Match[];
  onCalculate: (sortedRankings: TeamAggregate[]) => void;
}

const RankCalculator: React.FC<RankCalculatorProps> = ({
  teams,
  matches,
  onCalculate,
}) => {
  const [status, setStatus] = useState<string>("Not ready to calculate");
  const [errors, setErrors] = useState<string[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false);

  const validateData = (teams: Team[], matches: Match[]) => {
    if (teams.length == 0 || matches.length == 0) {
        return false;
    }
    const errorsList: string[] = [];
    const teamNames = teams.map((team) => team.name);
    const teamGroups = new Map(
      teams.map((team) => [team.name, team.groupNumber])
    );

    const invalidMatches = matches.filter(
      (match) =>
        !teamNames.includes(match.teamA) || !teamNames.includes(match.teamB)
    );
    if (invalidMatches.length > 0) {
      errorsList.push(
        `Some matches include teams that are not in the team list:\n ${invalidMatches
          .map((match) => `==> ${match.teamA} and ${match.teamB}`)
          .join("\n")}`
      );
    }

    const matchPairings = new Set();
    matches.forEach((match) => {
      const pair = [match.teamA, match.teamB].sort().join("-");
      if (matchPairings.has(pair)) {
        errorsList.push(
          `${match.teamA} and ${match.teamB} have played more than once.`
        );
      } else {
        matchPairings.add(pair);
      }
    });

    matches.forEach((match) => {
      const groupA = teamGroups.get(match.teamA);
      const groupB = teamGroups.get(match.teamB);
      if (
        groupA !== groupB &&
        teamNames.includes(match.teamA) &&
        teamNames.includes(match.teamB)
      ) {
        errorsList.push(
          `${match.teamA} and ${match.teamB} played from different groups.`
        );
      }
    });

    const nameCount: { [key: string]: number } = {};
    teamNames.forEach((name) => {
      nameCount[name] = (nameCount[name] || 0) + 1;
    });
    const duplicateTeams = Object.keys(nameCount).filter(
      (name) => nameCount[name] > 1
    );
    if (duplicateTeams.length > 0) {
      errorsList.push(
        `Duplicate team names found: ${duplicateTeams.join(", ")}`
      );
    }

    teams.forEach((team) => {
      if (team.groupNumber < 1 || team.groupNumber > 2) {
        errorsList.push(
          `${team.name} has an invalid groupNumber (Can only be 1 or 2)`
        );
      }
      const [day, month] = team.registrationDate.split("/");
      if (isNaN(Number(day)) || isNaN(Number(month))) {
        errorsList.push(
          `${team.name} has an invalid registration date (Needs to be DD/MM format where DD and MM are numbers)`
        );
      }
    });

    setErrors(errorsList);

    return errorsList.length === 0 && teams.length > 0 && matches.length > 0;
  };

  useEffect(() => {
    setErrors([]);
    const isValid = validateData(teams, matches);
    setIsReady(isValid);
    setStatus(isValid ? "Ready to calculate" : "Not ready to calculate");
  }, [teams, matches]);

  const handleCalculate = () => {
    if (!validateData(teams, matches)) {
      setStatus("Cannot calculate due to errors");
      return;
    }

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

    matches.forEach((match) => {
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

    rankingsArray.sort((a, b) => {
      const matchPoints = (team: TeamAggregate) => team.wins * 3 + team.draws;
      const altMatchPoints = (team: TeamAggregate) =>
        team.wins * 5 + team.draws * 3 + team.losses;
      if (matchPoints(b) !== matchPoints(a)) {
        return matchPoints(b) - matchPoints(a);
      }
      if (b.goals !== a.goals) return b.goals - a.goals;
      if (altMatchPoints(a) != altMatchPoints(b)) {
        return altMatchPoints(b) - altMatchPoints(a);
      }
      const [dayA, monthA] = a.registrationDate.split("/").map(Number);
      const [dayB, monthB] = b.registrationDate.split("/").map(Number);
      if (monthA != monthB) {
        return monthA - monthB;
      }
      return dayA - dayB;
    });

    setStatus("Calculation complete");
    onCalculate(rankingsArray);
  };

  return (
    <Box>
      <Typography variant="h6">Rank Calculation</Typography>

      <Typography variant="body1" color={isReady ? "green" : "red"}>
        {isReady ? "Ready to calculate" : status}
      </Typography>

      {errors.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6" color="orange">
            Warnings:
          </Typography>
          {errors.map((warning, index) => (
            <Typography
              key={index}
              variant="body2"
              color="orange"
              align="left"
              sx={{ whiteSpace: "pre-line" }}
            >
              {warning}
            </Typography>
          ))}
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleCalculate}
        disabled={!isReady}
        sx={{ mt: 2 }}
      >
        Start Calculation
      </Button>
    </Box>
  );
};

export default RankCalculator;
