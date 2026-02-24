import React, {useState} from "react";

const Register = ({ setToken }) => {

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
        try {
            const res = await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const body = await res.text();

            if (!res.ok) {
                console.error('Registration failed', res.status, body);
                alert('Registration failed: ' + (body || res.status));
                return;
            }

            let data = null;
            if (body) {
                try { data = JSON.parse(body); } 
                catch (err) {
                    console.warn('Response not JSON:', err, body);
                }
            }

            if (data?.token) setToken(data.token);
            console.log(data ?? body);
        } catch (err) {
            console.error('Registration error:', err);
            alert('An error occurred during registration');
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