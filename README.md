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

   - Implemented a more efficient loading mechanism by using a combination of `ActivityIndicator` and conditional rendering to provide a better user experience during data fetching. This ensures that users are visually informed about the loading state and reduces the perceived waiting time.

2. **Offline Capability**

   - Integrated `redux-persist` to cache booking data locally, allowing users to view their bookings even when offline. This was achieved by configuring the Redux store to use `redux-persist` and setting up the `PersistGate` in the `RootLayout` component to delay the rendering of the app's UI until the persisted state has been retrieved and saved to Redux.

3. **Add QR Code**

   - Added the `react-native-qrcode-svg` dependency to generate and display QR codes for each booking. The `BookingDetailsScreen` component was updated to include a QR code generated from the `ticketUuid`, providing users with a scannable code for their booking.

4. **Code Restructuring**

   - Refactored the `CustomerDetailsScreen` and `BookingDetailsScreen` components to improve readability and maintainability. This involved breaking down large components into smaller, reusable components and organizing the code in a more logical manner.
   - Moved the API URL to a constant file for easier configuration and potential future changes, ensuring that the API endpoint can be updated in a single location without modifying multiple files.

5. **Mock Server Enhancements**

   - Enhanced the mock server handlers to support the new QR code functionality and offline capabilities. This included updating the mock API responses to include the `ticketUuid` field and ensuring that the mock server can simulate offline scenarios.

6. **Documentation**

   - Updated the README to reflect the new changes and provide clear instructions on how to run the app with the new features. This includes detailed steps for setting up the development environment, running the app, and testing the offline capabilities.

7. **Styling/Navigation**

   - Improved the styling and navigation of the application to enhance the overall user experience and visual appeal. This involved updating the styles to be more consistent and modern, as well as improving the navigation flow to make it more intuitive for users.

### Additional Features

1. **Error Handling**

   - Improved error handling in the `BookingDetailsScreen` component to provide more user-friendly error messages. This ensures that users are informed about any issues that occur during data fetching and provides guidance on how to resolve them.

2. **User Experience**

   - Enhanced the user interface to be more intuitive and responsive, especially when dealing with larger datasets. This includes optimizing the layout and interactions to ensure a smooth and pleasant user experience.

3. **Performance Optimization**

   - Optimized data fetching and state management to improve the overall performance of the app. This involved using memoization techniques and optimizing the Redux selectors to reduce unnecessary re-renders and improve the app's responsiveness.

4. **Linting and Formatting**

   - Added ESLint and Prettier configurations to ensure code consistency and maintainability. This helps to enforce coding standards and automatically format the code, making it easier to read and maintain.

5. **Testing**

   - Added basic unit tests for the components and reducers to ensure the app's functionality. This includes testing the key functionalities and edge cases to ensure the app behaves as expected.

### Dependencies Added

- `react-native-qrcode-svg`: For generating QR codes.
- `redux-persist`: For persisting the Redux store and enabling offline capabilities.

### Implementation Choices

- Chose `redux-persist` for its ease of integration with Redux and its ability to persist the store across sessions. This ensures that the app's state is saved and restored seamlessly, providing a consistent user experience.
- Used `react-native-qrcode-svg` for its simplicity and effectiveness in generating QR codes within a React Native environment. This library was chosen for its ease of use and compatibility with the existing codebase.

### How to Run

1. Install the new dependencies:

   ```sh
   npm install
   ```

2. Run the app:

   ```sh
   npm start
   ```

3. To test offline capabilities, disable your internet connection after the initial data fetch and navigate through the app. This will allow you to verify that the booking data is correctly cached and accessible even when offline.

### Conclusion

These changes aim to enhance the functionality, performance, and user experience of the app while ensuring it meets the specified requirements. The added offline capability and QR code generation provide significant value to the end-users, making the app more robust and user-friendly. The improvements in loading mechanisms, error handling, and performance optimization contribute to a smoother and more reliable user experience. The detailed documentation and testing ensure that the app is easy to set up, run, and maintain, providing a solid foundation for future development.
