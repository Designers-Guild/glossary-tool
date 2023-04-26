const { requestSynonym, requestT } = require("./src/script");

describe("requestSynonym function", () => {
  test("should return a synonym for the provided word", async () => {
    const word = "happy";
    const synonym = await requestSynonym(word);
    expect(synonym).not.toBe("");
  });
});

describe('requestT', () => {
  test('should return a synonym for the word passed in', async () => {
    const word = 'happy';
    const synonym = await requestT(word);

    expect(typeof synonym).toBe('string'); // check that the synonym is a string
    expect(synonym).not.toBe('happy'); // check that the synonym is not the same as the original word
    expect(synonym.length).toBeGreaterThan(0); // check that the synonym is not an empty string
  });

  test('should return "Please try again" when there is an error', async () => {
    const word = 'nonexistentword';
    const synonym = await requestT(word);

    expect(synonym).toBe('Please try again'); // check that the function returns the error message
  });
});