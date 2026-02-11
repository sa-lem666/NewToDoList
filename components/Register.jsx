import React, {useState} from "react";
import authToken from "./authToken";

const Register = () => {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = null;

        try{
            const response = await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(formData)
            });

            data = await response.json();

            if(data.token){
                setToken(data.token);//save token and log in user
            }

            console.log(data);
        } catch(error){
            console.error("An error occured during registration");
            alert("An error occurred during registration");
            return;
        }
    }

    return (
        <section className="register">
            <h2>Register</h2>
            <form id="register-form" onSubmit={handleSubmit}>
                <label htmlFor="reg-username">Username: </label>
                <input type="text" name="username" id="reg-username" placeholder="Username" required onChange={handleChange}/>

                <label htmlFor="reg-password">Password: </label>
                <input type="password" name="password" id="reg-password" placeholder="Password" required onChange={handleChange}/>
                <button type="submit">Register</button>
            </form>
        </section>
    );

}

export default Register;