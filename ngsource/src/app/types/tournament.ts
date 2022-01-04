export interface ITournament {
  name: string;
  brandColor: string;
  accentColor: string;
  tournamentName: string;
  playersNumber: number;
  streamLink: string;
  logoLink: string;
  _id?: string;
}

export interface ITMresponse {
  success: boolean;
  result: ITournament;
}
