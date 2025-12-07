# Environment Setup

Create a `.env` file in the `server` directory with the following content:

## For Local MongoDB

```
MONGODB_URI=mongodb://localhost:27017/todoapp
PORT=5000
```

## For MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Get your connection string
5. Add your `.env` file:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp?retryWrites=true&w=majority
PORT=5000
```

Replace `username`, `password`, and `cluster` with your actual MongoDB Atlas credentials.

## Notes

- The `.env` file is already in `.gitignore` and won't be committed to version control
- Make sure MongoDB is running before starting the server
- The database name `todoapp` will be created automatically if it doesn't exist
