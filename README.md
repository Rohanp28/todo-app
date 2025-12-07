# Fullstack Todo App

A modern, fullstack todo application built with React (frontend) and Node.js/Express (backend).

## Features

- ✅ Create, read, update, and delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Filter todos (All, Active, Completed)
- ✅ Clear all completed todos
- ✅ Beautiful, modern UI with smooth animations
- ✅ Responsive design for mobile and desktop
- ✅ Persistent data storage with MongoDB

## Project Structure

```
TODO-app/
├── client/          # React frontend
│   ├── public/
│   ├── src/
│   └── package.json
├── server/          # Express backend
│   ├── config/
│   │   └── database.js    # MongoDB connection
│   ├── models/
│   │   └── Todo.js        # Todo model/schema
│   ├── server.js
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB (local installation or MongoDB Atlas account)

### Backend Setup

1. **Install MongoDB** (if not already installed):

   - **Local MongoDB**: Download and install from [MongoDB Community Server](https://www.mongodb.com/try/download/community)
   - **MongoDB Atlas** (Cloud): Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. Navigate to the server directory:

   ```bash
   cd server
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. **Set up environment variables**:

   - Create a `.env` file in the `server` directory
   - Add your MongoDB connection string:
     ```
     MONGODB_URI=mongodb://localhost:27017/todoapp
     ```
   - For MongoDB Atlas, use:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp
     ```
   - Optional: Set custom port (defaults to 5000):
     ```
     PORT=5000
     ```

5. **Start MongoDB** (if using local installation):

   ```bash
   # Windows
   mongod

   # macOS/Linux
   sudo systemctl start mongod
   # or
   mongod
   ```

6. Start the server:

   ```bash
   npm start
   ```

   For development with auto-reload:

   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:5000` and automatically connect to MongoDB

### Frontend Setup

1. Open a new terminal and navigate to the client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React app:

   ```bash
   npm start
   ```

   The app will open in your browser at `http://localhost:3000`

## API Endpoints

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a single todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `DELETE /api/todos` - Delete all completed todos
- `GET /api/health` - Health check

## Usage

1. Make sure both the backend and frontend servers are running
2. Open the app in your browser (usually `http://localhost:3000`)
3. Add todos by typing in the input field and clicking "Add"
4. Toggle todo completion by clicking the checkbox
5. Filter todos using the filter buttons (All, Active, Completed)
6. Delete individual todos using the × button
7. Clear all completed todos using the "Clear Completed" button

## Technologies Used

- **Frontend**: React, CSS3
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose ODM
- **HTTP Client**: Axios

## Troubleshooting

### Can't see the collection in MongoDB?

**Important**: MongoDB creates collections lazily. The `todos` collection will only appear after you create your first todo item through the app.

**To view collections**:

1. **Using MongoDB Shell**:

   ```bash
   mongosh
   use todoapp
   show collections
   db.todos.find().pretty()
   ```

2. **Using MongoDB Compass**:

   - Connect to `mongodb://localhost:27017`
   - Navigate to `todoapp` database
   - The `todos` collection will appear after first todo is created

3. **Quick test** - Create a todo through the app, then check MongoDB again.

For more detailed instructions, see `server/MONGODB_GUIDE.md`

### Connection Issues?

- Make sure MongoDB is running: `mongod` (or check Windows Services)
- Verify your `.env` file has the correct `MONGODB_URI`
- Check server logs for connection errors

## Future Enhancements

- Add user authentication
- Add todo categories/tags
- Add due dates and reminders
- Add drag-and-drop reordering
- Add dark mode

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.
