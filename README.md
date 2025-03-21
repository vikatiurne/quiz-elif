**Base level**

To run the Application, you need to start both the client and backend servers. Follow the steps below for each part.

Prerequisites
Make sure you have the following installed on your machine:

Node.js (version 14 or higher)
npm (comes with Node.js)
Running the Backend Server
Navigate to the backend directory: cd path/to/your/project/server

Install backend dependencies: npm install

3.Set up environment variables:Create a .env file in the server directory and add the following variables PORT=5000 API_URL=http://localhost:5000 CLIENT_URL=http://localhost:3000, MONGODB_URL=mongodb://127.0.0.1:27017/quiz 

Start the backend server npm run dev

Running the Frontend 
Navigate to the frontend directory: cd path/to/your/project/client

Install frontend dependencies: npm install

3.Set up environment variables:Create a .env.local file in the client directory and add the following variable NEXT_PUBLIC_API_URL=http://localhost:5000 

Start the frontend server: npm run dev
The frontend server will run on http://localhost:3000.
