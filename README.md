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
