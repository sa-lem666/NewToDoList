import './App.css';
import Login from './components/Login';
import authToken from './components/authToken';
import Register from './components/Register';
import ToDoList from './components/ToDoList';


function App() {
  const { token, setToken, logout } = authToken();

  if(token){
    return(
      <>
        <button onClick={logout} style={{float: 'right'}}>Logout</button>
        <ToDoList />
      </>
    );
  }

  return (
    <>
      <section id='root'>
        <h1>Welcome to My To-Do List App</h1>
        <Login setToken={setToken}/>
        
        <Register setToken={setToken}/>
      </section>
    </>
  )
}

export default App
