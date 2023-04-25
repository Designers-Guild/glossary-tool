const { requestSynonym, getLanguage } = require("./src/script");
const chrome = require('sinon-chrome');

describe("requestSynonym function", () => {
  test("should return a synonym for the provided word", async () => {
    const word = "happy";
    const synonym = await requestSynonym(word);
    expect(synonym).not.toBe("");
  });
});

