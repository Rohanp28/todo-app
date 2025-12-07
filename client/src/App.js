import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Fetch todos from API
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data);
    } catch (error) {
      alert('Failed to fetch todos. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    try {
      const response = await axios.post(`${API_URL}/todos`, {
        text: inputText,
        completed: false
      });
      setTodos([...todos, response.data]);
      setInputText('');
    } catch (error) {
      alert('Failed to add todo');
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      const response = await axios.put(`${API_URL}/todos/${id}`, {
        completed: !todo.completed
      });
      setTodos(todos.map(t => t.id === id ? response.data : t));
    } catch (error) {
      alert('Failed to update todo');
    }
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const saveEdit = async (id) => {
    if (!editText.trim()) {
      cancelEdit();
      return;
    }

    try {
      const response = await axios.put(`${API_URL}/todos/${id}`, {
        text: editText.trim()
      });
      setTodos(todos.map(t => t.id === id ? response.data : t));
      setEditingId(null);
      setEditText('');
    } catch (error) {
      alert('Failed to update todo');
    }
  };

  const handleEditKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      saveEdit(id);
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      setTodos(todos.filter(t => t.id !== id));
    } catch (error) {
      alert('Failed to delete todo');
    }
  };

  const clearCompleted = async () => {
    try {
      await axios.delete(`${API_URL}/todos`);
      setTodos(todos.filter(t => !t.completed));
    } catch (error) {
      alert('Failed to clear completed todos');
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter(t => !t.completed).length;
  const completedTodosCount = todos.filter(t => t.completed).length;

  return (
    <div className="app">
      <div className="todo-container">
        <h1 className="todo-title">My Todo List</h1>
        
        <form onSubmit={addTodo} className="todo-form">
          <input
            type="text"
            className="todo-input"
            placeholder="What needs to be done?"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button type="submit" className="add-button">Add</button>
        </form>

        {loading && <div className="loading">Loading...</div>}

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({todos.length})
          </button>
          <button
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active ({activeTodosCount})
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({completedTodosCount})
          </button>
        </div>

        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              {filter === 'all' 
                ? 'No todos yet. Add one above!' 
                : filter === 'active' 
                ? 'No active todos!' 
                : 'No completed todos!'}
            </div>
          ) : (
            filteredTodos.map(todo => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''} ${editingId === todo.id ? 'editing' : ''}`}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="todo-checkbox"
                  disabled={editingId === todo.id}
                />
                {editingId === todo.id ? (
                  <>
                    <input
                      type="text"
                      className="todo-edit-input"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => handleEditKeyPress(e, todo.id)}
                      autoFocus
                    />
                    <div className="todo-actions">
                      <button
                        onClick={() => saveEdit(todo.id)}
                        className="save-button"
                        aria-label="Save"
                        title="Save (Enter)"
                      >
                        ✓
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="cancel-button"
                        aria-label="Cancel"
                        title="Cancel (Esc)"
                      >
                        ✕
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="todo-text">{todo.text}</span>
                    <div className="todo-actions">
                      <button
                        onClick={() => startEdit(todo.id, todo.text)}
                        className="edit-button"
                        aria-label="Edit todo"
                        title="Edit"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="delete-button"
                        aria-label="Delete todo"
                        title="Delete"
                      >
                        ×
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>

        {completedTodosCount > 0 && (
          <button onClick={clearCompleted} className="clear-button">
            Clear Completed ({completedTodosCount})
          </button>
        )}
      </div>
    </div>
  );
}

export default App;

