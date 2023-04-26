const { requestSynonym, requestT, requestAntonym, requestDefinition } = require("./src/script");

describe("requestSynonym function", () => {
  test("should return a synonym for the provided word", async () => {
    const word = "happy";
    const synonym = await requestSynonym(word);
    expect(synonym).not.toBe("");
  });
});

describe('requestT', () => {
  test('should return a translation for the word passed in', async () => {
    const word = 'happy';
    const translation = await requestT(word);

    expect(typeof translation).toBe('string'); // check that the translation is a string
    expect(translation).not.toBe('happy'); // check that the translation is not the same as the original word
    expect(translation.length).toBeGreaterThan(0); // check that the translation is not an empty string
  });
});

describe('requestAntonym', () => {
  test('should return a antonym for the word passed in', async () => {
    const word = 'happy';
    const antonym = await requestAntonym(word);

    expect(typeof antonym).toBe('string'); // check that the antonym is a string
    expect(antonym).not.toBe('happy'); // check that the antonym is not the same as the original word
    expect(antonym.length).toBeGreaterThan(0); // check that the antonym is not an empty string
  });
});

describe('requestDefinition', () => {
  test('should return a definiton for the word passed in', async () => {
    const word = 'happy';
    const definiton = await requestDefinition(word);

    expect(typeof definiton).toBe('string'); // check that the definiton is a string
    expect(definiton).not.toBe('happy'); // check that the definiton is not the same as the original word
    expect(definiton.length).toBeGreaterThan(0); // check that the definiton is not an empty string
  });
});