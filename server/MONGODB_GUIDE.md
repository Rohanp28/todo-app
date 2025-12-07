# MongoDB Collection Viewing Guide

## Important Notes

1. **MongoDB creates collections lazily** - The `todos` collection will only appear in MongoDB after you create your first todo item through the app.

2. **Database Name**: The app uses the database name `todoapp` (or whatever you specify in MONGODB_URI)

3. **Collection Name**: Mongoose automatically pluralizes the model name, so `Todo` model becomes `todos` collection (lowercase, plural)

## How to View Collections in MongoDB

### Using MongoDB Shell (mongosh)

1. **Open MongoDB Shell**:

   ```bash
   mongosh
   ```

2. **List all databases**:

   ```javascript
   show dbs
   ```

3. **Switch to your database**:

   ```javascript
   use todoapp
   ```

4. **List collections** (will be empty until first todo is created):

   ```javascript
   show collections
   ```

5. **View all todos**:

   ```javascript
   db.todos.find().pretty();
   ```

6. **Count todos**:

   ```javascript
   db.todos.countDocuments();
   ```

7. **View a specific todo**:
   ```javascript
   db.todos.findOne();
   ```

### Using MongoDB Compass (GUI Tool)

1. **Download MongoDB Compass** (if not installed):

   - Download from: https://www.mongodb.com/try/download/compass

2. **Connect to MongoDB**:

   - Connection string: `mongodb://localhost:27017`
   - Click "Connect"

3. **Navigate to your database**:

   - Click on `todoapp` database in the left sidebar
   - You should see `todos` collection (after first todo is added)

4. **View documents**:
   - Click on `todos` collection
   - All todo documents will be displayed

### Quick Test

To verify everything is working:

1. **Start your server**:

   ```bash
   cd server
   npm start
   ```

2. **Create a todo** through the frontend app or using curl:

   ```bash
   curl -X POST http://localhost:5000/api/todos \
     -H "Content-Type: application/json" \
     -d '{"text":"Test todo"}'
   ```

3. **Check MongoDB**:
   ```bash
   mongosh
   use todoapp
   show collections
   db.todos.find().pretty()
   ```

## Troubleshooting

### Collection not showing up?

1. **Make sure you've created at least one todo** - Collections are created on first insert
2. **Check you're in the correct database**: `use todoapp`
3. **Verify connection**: Check server logs for "MongoDB Connected" message
4. **Check database name**: The database name is in your `.env` file or defaults to `todoapp`

### Still can't see it?

Run this in mongosh to check:

```javascript
// List all databases
show dbs

// Check if todoapp exists
use todoapp

// List collections (should show 'todos' after first insert)
show collections

// If collection exists, view documents
db.todos.find()
```

## Collection Structure

The `todos` collection will contain documents like:

```json
{
  "_id": ObjectId("..."),
  "text": "Your todo text",
  "completed": false,
  "createdAt": ISODate("2024-..."),
  "updatedAt": ISODate("2024-...")
}
```
