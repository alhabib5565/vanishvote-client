export type TOption = {
  id: number;
  text: string;
  votes: number;
};
export type TPollData = {
  title: string;
  pollType: string;
  options: TOption[];
  settings: {
    allowMultipleSelection: { type: string };
    requireParticipantNames: boolean;
    resultsVisibility: string;
    pollExpiryDate: string;
    allowComments: boolean;
  };
};
