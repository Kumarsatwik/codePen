## CodePen Clone Project

This is a CodePen clone project built using React, Redux, Tailwind CSS, Node.js, and MongoDB. It allows users to write HTML, CSS, and JavaScript code, save their code snippets, share them with others, and login to access additional features.

### Features

1. **Code Editor**: Users can write HTML, CSS, and JavaScript code in a code editor with syntax highlighting.
2. **Save Code**: Users can save their code snippets to their account for future reference.
3. **Share Code**: Users can share their code snippets with others by generating shareable links.
4. **Login**: Users can create an account or login using their credentials to access additional features.
5. **User Dashboard**: Authenticated users have access to a dashboard where they can manage their saved code snippets.

### Technologies Used

- **Frontend**:
  - React: A JavaScript library for building user interfaces.
  - Redux: A predictable state container for JavaScript apps.
  - Tailwind CSS: A utility-first CSS framework for quickly building custom designs.
  - Shadcn : A UI component library for building designs.

- **Backend**:
  - Node.js: A JavaScript runtime environment that executes JavaScript code outside a web browser.
  - Express.js: A web application framework for Node.js.
  - MongoDB: A NoSQL database for storing user accounts and code snippets.

### Getting Started

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Install Dependencies**:
   ```bash
   cd codepen-clone
   cd client && npm install
   cd server && npm install
   ```

3. **Set up Environment Variables**:
   - Create a `.env` file in the `client` directory and add your frontend environment variables.
      - VITE_SERVER_URL= < server running url >
   - Create a `.env` file in the `server` directory and add your backend environment variables.
      - PORT= < PORT on server will running >
      - MONGODB_URL= < mongodb database URL>

4. **Start the Development Servers**:
   ```bash
   # Start the frontend server
   cd client && npm start

   # Start the backend server
   cd server && npm start
   ```

5. **Open the Application**:
   Open your web browser and navigate to `http://localhost:5173 ` to view the application.

### Folder Structure

- **client**: Contains the frontend code built using React and Tailwind CSS.
- **server**: Contains the backend code built using Node.js, Express.js, and MongoDB.

### Acknowledgments

- Inspired by CodePen - https://codepen.io/

Feel free to customize this README according to your project's specific details and requirements.
