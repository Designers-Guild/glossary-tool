const { requestSynonym, requestTranslation, requestAntonym, requestDefinition, requestExampleSentence, requestHomonym } = require("./src/script");

describe("requestSynonym function", () => {
  test("should return a synonym for the provided word", async () => {
    const word = "happy";
    const synonym = await requestSynonym(word);
    expect(synonym).not.toBe("");
  }, 50000); // set the timeout to 50000
});

describe('requestTranslation', () => {
  test('should return a translation for the word passed in', async () => {
    const word = 'happy';
    const translation = await requestTranslation(word);

    expect(typeof translation).toBe('string'); // check that the translation is a string
    expect(translation).not.toBe('happy'); // check that the translation is not the same as the original word
    expect(translation.length).toBeGreaterThan(0); // check that the translation is not an empty string
  }, 50000); // set the timeout to 50000

});

describe('requestAntonym', () => {
  test('should return a antonym for the word passed in', async () => {
    const word = 'happy';
    const antonym = await requestAntonym(word);

    expect(typeof antonym).toBe('string'); // check that the antonym is a string
    expect(antonym).not.toBe('happy'); // check that the antonym is not the same as the original word
    expect(antonym.length).toBeGreaterThan(0); // check that the antonym is not an empty string
  }, 50000); // set the timeout to 50000
});

describe('requestDefinition', () => {
  test('should return a definiton for the word passed in', async () => {
    const word = 'happy';
    const definiton = await requestDefinition(word);

    expect(typeof definiton).toBe('string'); // check that the definiton is a string
    expect(definiton).not.toBe('happy'); // check that the definiton is not the same as the original word
    expect(definiton.length).toBeGreaterThan(0); // check that the definiton is not an empty string
  }, 50000); // set the timeout to 50000
});

describe('requestExampleSentence', () => {
  test('should return an example sentence for the word passed in', async () => {
    const word = 'happy';
    const examplesentence = await requestExampleSentence(word);

    expect(typeof examplesentence).toBe('string'); // check that the example sentence is a string
    expect(examplesentence).not.toBe('happy'); // check that the example sentence is not the same as the original word
    expect(examplesentence.length).toBeGreaterThan(0); // check that the example sentence is not an empty string
  }, 50000); // set the timeout to 50000
});

describe('requestHomonym', () => {
  test('should return a homonym for the word passed in', async () => {
    const word = 'happy';
    const homonym = await requestHomonym(word);

    expect(typeof homonym).toBe('string'); // check that the homonym is a string
    expect(homonym).not.toBe('happy'); // check that the homonym is not the same as the original word
    expect(homonym.length).toBeGreaterThan(0); // check that the homonym is not an empty string
  }, 50000); // set the timeout to 50000
});