document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('process');
    const inputText = document.getElementById('inputText');
    const resultDiv = document.getElementById('bionice_reading_text');
    const loader = document.getElementById('loader');
    const resetButton = document.getElementById('reset');

    btn.addEventListener('click', () => {
        const data = inputText.value;
        if (data.trim() === '') {
            alert('Please enter a sentence.');
            return;
        }

        loader.style.display = 'block';
        let text = '';
        const lines = data.split('\n');

        lines.forEach(line => {
            const words = line.split(' ');
            words.forEach(word => {
                const length = word.length;
                if (length === 0) {
                    text += ' ';
                } else {
                    const mid = Math.ceil(length / 2);
                    text += `<b>${word.substring(0, mid)}</b>${word.substring(mid)} `;
                }
            });
            text += '<br>'; 
        });

        resultDiv.innerHTML = text;
        loader.style.display = 'none';
    });

    resetButton.addEventListener('click', () => {
        inputText.value = ''; // Clear the input box
        resultDiv.innerHTML = 'Fast ReadX your text here'; // Reset the output box
    });
});






//HERE COMES THE TESTING PART




function runTestCases() {
    const inputText = document.getElementById('inputText');
    const resultDiv = document.getElementById('bionice_reading_text');
    const loader = document.getElementById('loader');
    const processButton = document.getElementById('process');
    const resetButton = document.getElementById('reset');
    
    // Utility function to simulate button clicks
    function simulateClick(button) {
        button.click();
    }

    // Utility function to set the value of inputText
    function setInputText(value) {
        inputText.value = value;
    }

    // Test case 1: Button click without entering input
    console.log("Running Test 1: Empty input field");
    setInputText('');
    simulateClick(processButton);
    console.assert(alertMessage === 'Please enter a sentence.', "Test 1 Failed: No alert shown for empty input");

    // Test case 2: Button click with valid input text
    console.log("Running Test 2: Valid input");
    setInputText('This is a test sentence');
    simulateClick(processButton);
    console.assert(resultDiv.innerHTML.includes('<b>This</b> is'), "Test 2 Failed: Text not processed correctly");
    console.assert(loader.style.display === 'none', "Test 2 Failed: Loader not hidden after processing");

    // Test case 3: Button click with multiple lines of text
    console.log("Running Test 3: Multiple lines of input");
    setInputText('First line\nSecond line');
    simulateClick(processButton);
    console.assert(resultDiv.innerHTML.includes('<br>'), "Test 3 Failed: Multiple lines not handled correctly");

    // Test case 4: Processing a sentence with special characters
    console.log("Running Test 4: Input with special characters");
    setInputText('Hello! How are you?');
    simulateClick(processButton);
    console.assert(resultDiv.innerHTML.includes('<b>Hel</b>lo!'), "Test 4 Failed: Special characters not handled correctly");

    // Test case 5: Reset button functionality
    console.log("Running Test 5: Reset button");
    simulateClick(resetButton);
    console.assert(inputText.value === '', "Test 5 Failed: Input not cleared");
    console.assert(resultDiv.innerHTML === 'Fast ReadX your text here', "Test 5 Failed: Output not reset");

    // Test case 6: Loader visibility
    console.log("Running Test 6: Loader visibility during processing");
    setInputText('This is a loader test');
    simulateClick(processButton);
    console.assert(loader.style.display === 'block', "Test 6 Failed: Loader not shown during processing");

    // Test case 7: Empty spaces in input text
    console.log("Running Test 7: Input with only spaces");
    setInputText('   ');
    simulateClick(processButton);
    console.assert(alertMessage === 'Please enter a sentence.', "Test 7 Failed: No alert shown for spaces");

    // Test case 8: Handling a single word input
    console.log("Running Test 8: Single word input");
    setInputText('Hello');
    simulateClick(processButton);
    console.assert(resultDiv.innerHTML.includes('<b>Hel</b>lo'), "Test 8 Failed: Single word not processed correctly");

    // Test case 9: Bold logic for odd and even length words
    console.log("Running Test 9: Odd and even length words");
    setInputText('odd even');
    simulateClick(processButton);
    console.assert(resultDiv.innerHTML.includes('<b>od</b>d') && resultDiv.innerHTML.includes('<b>ev</b>en'), "Test 9 Failed: Odd/Even word length processing issue");

    console.log("All tests completed.");
}

// Define a global variable to capture alert messages
let alertMessage = '';
window.alert = function(msg) {
    alertMessage = msg;
};

// Run the test cases after DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    runTestCases();
});
