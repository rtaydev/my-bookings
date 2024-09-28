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

The app currently fetches booking data from a mock API endpoint: `http://localhost:3001/api/bookings`. This is intended to simulate a real-world API, so there may be delays in fetching data.

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

### Changes Made

1. **Improved Loading on Customer Details Page**

   - Implemented a more efficient loading mechanism by using a combination of `ActivityIndicator` and conditional rendering to provide a better user experience during data fetching.

2. **Offline Capability**

   - Integrated `redux-persist` to cache booking data locally, allowing users to view their bookings even when offline.
   - Updated the `RootLayout` component to include `PersistGate` for persisting the Redux store.

3. **Add QR Code**

   - Added the `react-native-qrcode-svg` dependency to generate and display QR codes for each booking.
   - Updated the `BookingDetailsScreen` component to include a QR code generated from the `ticketUuid`.

4. **Code Restructuring**

   - Refactored the `CustomerDetailsScreen` and `BookingDetailsScreen` components to improve readability and maintainability.
   - Moved API URL to a constant for easier configuration and potential future changes.

5. **Mock Server Enhancements**

   - Enhanced the mock server handlers to support the new QR code functionality and offline capabilities.

6. **Documentation**
   - Updated the README to reflect the new changes and provide clear instructions on how to run the app with the new features.

### Additional Features

1. **Error Handling**

   - Improved error handling in the `BookingDetailsScreen` component to provide more user-friendly error messages.

2. **User Experience**

   - Enhanced the user interface to be more intuitive and responsive, especially when dealing with larger datasets.

3. **Performance Optimization**

   - Optimized data fetching and state management to improve the overall performance of the app.

4. **Linting and Formatting**
   - Added ESLint and Prettier configurations to ensure code consistency and maintainability.

### Dependencies Added

- `react-native-qrcode-svg`: For generating QR codes.
- `redux-persist`: For persisting the Redux store and enabling offline capabilities.

### Implementation Choices

- Chose `redux-persist` for its ease of integration with Redux and its ability to persist the store across sessions.
- Used `react-native-qrcode-svg` for its simplicity and effectiveness in generating QR codes within a React Native environment.

### How to Run

1. Install the new dependencies:

   ```sh
   npm install
   ```

2. Start the mock server:

   ```sh
   npm run server
   ```

3. Run the app:

   ```sh
   npm start
   ```

4. To test offline capabilities, disable your internet connection after the initial data fetch and navigate through the app.

### Conclusion

These changes aim to enhance the functionality, performance, and user experience of the app while ensuring it meets the specified requirements. The added offline capability and QR code generation provide significant value to the end-users.
