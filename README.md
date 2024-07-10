# Genezio TypeSafe Getting Started

In the server/ folder, you'll find the backend services that are exposed to the client-side via the project's SDK.
You can update the backend.ts file to add or modify functions, or create new backend services (new files in the server/ folder).

In the client/ folder, you have a basic React.js app that calls the hello world function from the backend. Check the src/App.tsx file to see how the Genezio project SDK is imported and how the backend function is called.

Starting from this example, you can add backend functions that access a database for specific content, call other APIs to retrieve data, and then expose all of these in the front end via the same SDK.
