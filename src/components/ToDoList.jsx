import {useState} from 'react';

const ToDoList = () => {
    const [todos, setTodos] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(null);

   //Add or update task
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!taskName) return; // Prevent adding empty tasks

        if(isEditing !== null){
            //update existing task
            const updatedTodos = todos.map((todo, index) => 
                index === isEditing ? {...todo, name: taskName, desc: description} : todo
            );

            setTodos(updatedTodos);
            setIsEditing(null);
        } else {
            //add new task
            const newTodo = {name: taskName, desc: description, completed: false};
            setTodos([...todos, newTodo]);
        }

        setTaskName('');
        setDescription('');
    };

    const deleteTask = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    }

    const toggleComplete = (index) => {
        const updatedTodos = todos.map((todo, i) => 
            i === index ? {...todo, completed: !todo.completed} : todo
        );
        setTodos(updatedTodos);
    }

    const startEdit = (index) => {
        const todo = todos[index];
        if (!todo) return;
        setTaskName(todo.name || '');
        setDescription(todo.desc || '');
        setIsEditing(index);
    }

    return(
        <section className="todo-container">
        <h2>My To-Do List</h2>
        
        <form onSubmit={handleSubmit}>
            <input placeholder="Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)}/>
            <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <button type="submit">{isEditing !== null ? 'Update' : 'Add Task'}</button>
        </form>

        <hr/>

        <ul>
            {todos.map((todo, index) => (
            <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none', marginBottom: '10px' }}>
                <strong>{todo.name}</strong>: {todo.desc}
                <br/>
                <button onClick={() => toggleComplete(index)}>
                {todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => startEdit(index)}>Edit</button>
                <button onClick={() => deleteTask(index)}>Delete</button>
            </li>
            ))}
        </ul>
        </section>
    );
}

export default ToDoList;