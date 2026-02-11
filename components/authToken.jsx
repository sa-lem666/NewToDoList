import {useState} from 'react';

const authToken = () => {

    const getToken = () => {
        const storedToken = localStorage.getItem('token');
        if(!storedToken || storedToken === 'null' || storedToken === 'undefined'){
            return null;
        }
        return storedToken;
    }

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken) => {
        localStorage.setItem('token', userToken);
        setToken(userToken);
    }

    const removeToken = () => {
        localStorage.removeItem('token');
        setToken(null);
    }

    return {
        setToken: saveToken, 
        token,
        logout:removeToken
    }

}

export default authToken;