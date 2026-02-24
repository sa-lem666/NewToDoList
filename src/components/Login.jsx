import React, { useState } from 'react';    
import authToken from './authToken'

const Login = ({ setToken }) => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{

            const response = await fetch('http://localhost:8080/api/login' , {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({username: user, password})
            })

            //checks status response
            if (!response.ok){
                const errorText = await response.text();
                console.error("Server error: ", errorText);
                alert("Login failed!");
                return;
            }

            const data = await response.json();
            if(data.token){
                setToken(data.token);
            }

        } catch (err){
            console.error("Catch block error: ", err);
        }
    }



    return (
        <section className='login'>
            <h2>Login
                <form id="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" id="username" placeholder="Username" required onChange= {(e) => setUser(e.target.value)}/>

                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" placeholder="Password" required onChange= {(e) => setPassword(e.target.value)}/>
                    <button type="submit">Login</button>
                </form>
            </h2>

        </section>
    );
}

export default Login;