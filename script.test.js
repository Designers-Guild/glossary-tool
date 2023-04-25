const { requestSynonym } = require("./src/script");

const chrome = require('sinon-chrome');

describe("requestSynonym function", () => {
  test("should return a synonym for the provided word", async () => {
    const word = "happy";
    const synonym = await requestSynonym(word);
    expect(synonym).not.toBe("");
  });
});


// Import the code to test
const {getLanguage} = require('./src/script');

// Test case
test('language should be retrieved from storage', () => {
  // Mock the chrome.storage.sync.get method
  const mockGet = jest.fn().mockImplementation((keys, callback) => {
    callback({ language: 'en' });
  });
  chrome.storage.sync.get = mockGet;

  // Call the function to get the language
  getLanguage();

  // Expect the language to be retrieved and logged
  expect(mockGet).toHaveBeenCalledTimes(1);
  expect(mockGet).toHaveBeenCalledWith(['language'], expect.any(Function));
  expect(console.log).toHaveBeenCalledWith('Language: en');
});
