export interface Team {
  name: string;
  registrationDate: string;
  groupNumber: number;
}

export interface Match {
  teamA: string;
  teamB: string;
  teamAGoals: number;
  teamBGoals: number;
}
