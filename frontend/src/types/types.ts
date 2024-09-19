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

export interface TeamAggregate extends Team {
  wins: number;
  draws: number;
  losses: number;
  goals: number;
}
