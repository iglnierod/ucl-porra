export const MatchdayStatus = {
  CURRENT: "CURRENT",
  PLAYED: "PLAYED",
  BLOCKED: "BLOCKED",
};

export const getMatchdayStatusValue = (status) => {
  switch (status) {
    case MatchdayStatus.CURRENT:
      return 0;
    case MatchdayStatus.PLAYED:
      return 1;
    case MatchdayStatus.BLOCKED:
      return 2;
    default:
      return -1;
  }
};
