export const authPlayersInfo = [
  { email: "player1@game", hashedPassword: "UUUUUUUUUUUUUUUUUUUUUUUUU" },
  { email: "player2@game", hashedPassword: "ttttttttttttttttttttttttt" },
];
export const playersInfo = [
  {
    name: "joe",
    email: "joe@company",
    avatar: "/static/images/avatar/avatar4.png",
  },
  {
    name: "mart",
    email: "mart@company",
    avatar: "/static/images/avatar/avatar1.png",
  },
];

const exampleStatistics = {
  inputInThisSession: [],
  totalSuccess: 15,
  totalErrors: 1,
  accuracy: 1,
  maxSpeed: 128,
  averageSpeed: 213.0208282470703,
  availableCharacters: {
    A: { totalSuccess: 1, totalErrors: 0, accuracy: 0.5, averageSpeed: 93 },
    B: { totalSuccess: 0, totalErrors: 0, accuracy: 0, averageSpeed: 0 },
    C: {
      totalSuccess: 1,
      totalErrors: 0,
      accuracy: 0.5,
      averageSpeed: 112.5,
    },
    D: { totalSuccess: 0, totalErrors: 0, accuracy: 0, averageSpeed: 0 },
    E: {
      totalSuccess: 2,
      totalErrors: 1,
      accuracy: 0.5,
      averageSpeed: 154.75,
    },
    F: { totalSuccess: 0, totalErrors: 0, accuracy: 0, averageSpeed: 0 },
    G: { totalSuccess: 0, totalErrors: 0, accuracy: 0, averageSpeed: 0 },
    H: { totalSuccess: 0, totalErrors: 0, accuracy: 0, averageSpeed: 0 },
    I: {
      totalSuccess: 1,
      totalErrors: 0,
      accuracy: 0.5,
      averageSpeed: 112,
    },
    J: {
      totalSuccess: 1,
      totalErrors: 0,
      accuracy: 0.5,
      averageSpeed: 2059.5,
    },
    K: {
      totalSuccess: 1,
      totalErrors: 0,
      accuracy: 0.5,
      averageSpeed: 103.5,
    },
    L: { totalSuccess: 0, totalErrors: 0, accuracy: 0, averageSpeed: 0 },
    M: { totalSuccess: 0, totalErrors: 0, accuracy: 0, averageSpeed: 0 },
    N: { totalSuccess: 0, totalErrors: 0, accuracy: 0, averageSpeed: 0 },
    O: {
      totalSuccess: 2,
      totalErrors: 0,
      accuracy: 0.6666666666666666,
      averageSpeed: 142.25,
    },
    P: { totalSuccess: 0, totalErrors: 0, accuracy: 0, averageSpeed: 0 },
    Q: {
      totalSuccess: 1,
      totalErrors: 0,
      accuracy: 0.5,
      averageSpeed: 364.5,
    },
    R: { totalSuccess: 0, totalErrors: 0, accuracy: 0, averageSpeed: 0 },
    S: {
      totalSuccess: 1,
      totalErrors: 0,
      accuracy: 0.5,
      averageSpeed: 399,
    },
    T: { totalSuccess: 0, totalErrors: 0, accuracy: 0, averageSpeed: 0 },
    U: {
      totalSuccess: 1,
      totalErrors: 0,
      accuracy: 0.5,
      averageSpeed: 95.5,
    },
    V: { totalSuccess: 0, totalErrors: 0, accuracy: 0, averageSpeed: 0 },
    W: { totalSuccess: 1, totalErrors: 0, accuracy: 0.5, averageSpeed: 70 },
    X: { totalSuccess: 0, totalErrors: 0, accuracy: 0, averageSpeed: 0 },
    Y: { totalSuccess: 0, totalErrors: 0, accuracy: 0, averageSpeed: 0 },
    Z: {
      totalSuccess: 2,
      totalErrors: 0,
      accuracy: 0.6666666666666666,
      averageSpeed: 275.25,
    },
  },
};

const stringified = JSON.stringify(exampleStatistics);

export const playersStatistics = [
  {
    email: "joe@company",
    playersStatistics: stringified,
  },
  {
    email: "mart@company",
    playersStatistics: stringified,
  },
];
