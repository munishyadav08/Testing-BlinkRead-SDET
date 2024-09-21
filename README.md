# Blink Read Web Application - Test Cases and Explanation

## Overview

This repository contains a simple web application for converting text input into a bolded reading format where the first half of each word is bolded. This document explains the test cases used to verify the correct functionality of the application, which are written in JavaScript. The tests simulate user actions and validate the outcomes using assertions.

The tests are automatically run once the DOM is fully loaded, ensuring core functionalities like input processing, loader display, reset button behavior, and special character handling work as expected.

---

## How the Test Cases Work

### 1. **Simulating Button Clicks**

The function `simulateClick(button)` simulates a click event on a specified button (e.g., `process` or `reset`). This is essential for simulating user behavior programmatically in the tests.

```javascript
function simulateClick(button) {
    button.click();
}
```
## Setting Input Values
To simulate user input, the function setInputText(value) sets the value of the text area programmatically.
```
function setInputText(value) {
    inputText.value = value;
}
```
##3. Capturing Alert Messages
Since real alert dialogs block the test execution, we override window.alert to capture the alert messages instead of showing them, allowing us to verify them in tests.

```
let alertMessage = '';
window.alert = function(msg) {
    alertMessage = msg;
};
```
##4. Test Case Execution
All the test cases are defined inside the runTestCases() function. They simulate different user interactions with the web page and validate the results using console.assert statements to check for expected behavior.

Test Case 1: Empty Input Field
Scenario: Clicking the "Convert" button with an empty input field.
Expected Behavior: An alert should be shown with the message "Please enter a sentence."
Test Assertion: The alert message matches the expected text.

```
console.log("Running Test 1: Empty input field");
setInputText('');
simulateClick(processButton);
console.assert(alertMessage === 'Please enter a sentence.', "Test 1 Failed: No alert shown for empty input");
```
### Test Case 2: Valid Input Text
Scenario: Entering a valid sentence and clicking "Convert".
Expected Behavior: The loader should appear, and the result should show the first half of each word bolded.
Test Assertions:

The result contains the correct HTML structure.
The loader is hidden after processing.
```
console.log("Running Test 2: Valid input");
setInputText('This is a test sentence');
simulateClick(processButton);
console.assert(resultDiv.innerHTML.includes('<b>This</b> is'), "Test 2 Failed: Text not processed correctly");
console.assert(loader.style.display === 'none', "Test 2 Failed: Loader not hidden after processing");
```
Test Case 3: Multiple Lines of Text
Scenario: Entering text with multiple lines.
Expected Behavior: The result should process each line separately, with lines split by <br> tags.
Test Assertion: The result contains <br> tags for line breaks.

```
console.log("Running Test 3: Multiple lines of input");
setInputText('First line\nSecond line');
simulateClick(processButton);
console.assert(resultDiv.innerHTML.includes('<br>'), "Test 3 Failed: Multiple lines not handled correctly");
```
Test Case 4: Special Characters
Scenario: Entering text with special characters.
Expected Behavior: Special characters like punctuation should be preserved in the result, and bolding should apply only to the word's text.
Test Assertion: The result contains special characters, with words bolded correctly.

```
console.log("Running Test 4: Input with special characters");
setInputText('Hello! How are you?');
simulateClick(processButton);
console.assert(resultDiv.innerHTML.includes('<b>Hel</b>lo!'), "Test 4 Failed: Special characters not handled correctly");
```
Test Case 5: Reset Button Functionality
Scenario: Clicking the "Reset" button after processing some text.
Expected Behavior: The input field should clear, and the result should reset to its default message.
Test Assertions:

The input field is cleared.
The result area is reset to its default state.
```
console.log("Running Test 5: Reset button");
simulateClick(resetButton);
console.assert(inputText.value === '', "Test 5 Failed: Input not cleared");
console.assert(resultDiv.innerHTML === 'Fast ReadX your text here', "Test 5 Failed: Output not reset");
```
Test Case 6: Loader Visibility
Scenario: Clicking the "Convert" button and ensuring the loader appears while processing text.
Expected Behavior: The loader should be visible during the text processing and hidden afterward.
Test Assertion: The loader is visible during the processing.

```
console.log("Running Test 6: Loader visibility during processing");
setInputText('This is a loader test');
simulateClick(processButton);
console.assert(loader.style.display === 'block', "Test 6 Failed: Loader not shown during processing");
```
Test Case 7: Input with Only Spaces
Scenario: Entering only spaces in the input field and clicking "Convert".
Expected Behavior: An alert should be triggered asking for valid input.
Test Assertion: The alert message is displayed.

```
console.log("Running Test 7: Input with only spaces");
setInputText('   ');
simulateClick(processButton);
console.assert(alertMessage === 'Please enter a sentence.', "Test 7 Failed: No alert shown for spaces");
```
Test Case 8: Single Word Input
Scenario: Entering a single word and clicking "Convert".
Expected Behavior: The word should be processed with its first half bolded.
Test Assertion: The word is bolded correctly in the result.

```
console.log("Running Test 8: Single word input");
setInputText('Hello');
simulateClick(processButton);
console.assert(resultDiv.innerHTML.includes('<b>Hel</b>lo'), "Test 8 Failed: Single word not processed correctly");
```
Test Case 9: Handling Odd and Even Length Words
Scenario: Entering words with both odd and even lengths.
Expected Behavior: Odd and even-length words should be bolded correctly.
Test Assertion: Both odd and even-length words are bolded as expected.

```
console.log("Running Test 9: Odd and even length words");
setInputText('odd even');
simulateClick(processButton);
console.assert(resultDiv.innerHTML.includes('<b>od</b>d') && resultDiv.innerHTML.includes('<b>ev</b>en'), "Test 9 Failed: Odd/Even word length processing issue");
```
###How to Run the Tests
The tests are set to automatically run after the page is fully loaded using the DOMContentLoaded event. As soon as the page is loaded, the runTestCases() function executes the test cases in sequence.

```
document.addEventListener('DOMContentLoaded', () => {
    runTestCases();
});
```
## Summary
This automated testing script is designed to simulate user actions and validate the web application's behavior, ensuring its core features function as expected.
It uses utilities for simulating clicks, setting input values, and capturing alert messages.
Each test case targets a specific feature or edge case (e.g., empty input, multi-line input, special characters, etc.).
The results of each test are logged to the browser's console, with any failures clearly marked.
