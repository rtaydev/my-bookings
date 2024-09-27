# Welcome to the Direct Ferries React Native Technical Test 👋

## Overview

This React Native Expo app is a basic ferry booking system. Your task is to improve the app's functionality, focusing on the Customer Details page. You will need to implement offline capabilities, add a QR code for each booking, and optimize the loading process.

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npm start
   ```

You can log into the app with
 - Surname: Smith
 - Booking ref: ABC123

There are other users in the mock server to find

## Current App Structure

- `app/index.js`: Login screen
- `app/customer-details.js`: Customer Details screen (list of bookings)
- `app/booking-details.js`: Booking Details screen
- `server/mocks/handles.js`: The mock API handlers

The app currently fetches booking data from a mock API endpoint: `http://localhost:3001/api/bookings`. This is in 

## Tasks

1. **Improve Loading on Customer Details Page**
   - Implement a more efficient loading mechanism for the customer's bookings.   

2. **Offline Capability**
   - Implement a solution to allow users to view their bookings when offline.   

3. **Add QR Code**
   - Generate and display a QR code for each booking from the ticketUuid.
   

## Guidelines

- You are free to add any dependencies you believe will help you complete the tasks efficiently.
- You may restructure the existing code as you see fit, but please document significant changes.
- Focus on creating a smooth user experience, especially for the offline functionality.
- Consider edge cases and potential performance issues in your implementation.

## Evaluation Criteria

Your submission will be evaluated based on:

1. Functionality: Does the app work as expected and fulfill all the requirements?
2. Code Quality: Is the code well-structured, readable, and maintainable?
3. Performance: How well does the app perform, especially with larger datasets?
4. UX/UI: Is the user interface intuitive and responsive?
5. Creativity: Are there any innovative solutions or additional features that enhance the app?

## Submission

Please submit your code as a Git repository with clear commit history. Include a brief explanation of your implementation choices and any additional features you've added in the README.

Good luck!
