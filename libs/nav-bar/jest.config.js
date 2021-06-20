module.exports = {
  displayName: "nav-bar",
  preset: "../../jest.preset.js",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../coverage/libs/nav-bar",
};
