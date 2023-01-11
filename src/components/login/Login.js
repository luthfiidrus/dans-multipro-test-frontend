import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({
        usernameIsEmpty: null,
        passwordIsEmpty: null,
        wrongPassword: null,
        userNotFound: null
    });

    const handleSubmit = async () => {
        let errorObj = {};
        if (username === '') {
            errorObj.usernameIsEmpty = 'Username is required';
        }
        if (password === '') {
            errorObj.passwordIsEmpty = 'Password is required';
        }
        if (Object.keys(errorObj).length > 0) {
            setError(errorObj);
        }
        else {
            await axios.post('http://localhost:8080/login', {
                username: username,
                password: password
            },
            {
                withCredentials: true
            })
            .then((res) => {
                console.log(res);
                navigate('/job-list');
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    setError({ 
                        ...error,
                        userNotFound: 'User not found' 
                    });
                }
                else if (err.response.status === 400) {
                    setPassword('');
                    setError({ 
                        ...error,
                        wrongPassword: 'Wrong password' 
                    });
                }
            });
        }
    }

    console.log(error);

    return (
        <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "100vh" }}>
            <div style={{ maxWidth: "80vw", minWidth: "50vw" }}>
                <h3>Sign In</h3>
                <div className="mb-3">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        className={`form-control ${error.usernameIsEmpty !== null || error.userNotFound !== null ? 'border border-danger' : null }`}
                        placeholder="Enter username"
                        onChange={(e) => { setUsername(e.target.value)}}
                    />
                    {
                        error.usernameIsEmpty !== null ?
                        <div className="text-danger">
                            {error.usernameIsEmpty}
                        </div>
                        :
                        null
                    }
                    {
                        error.userNotFound !== null ?
                        <div className="text-danger">
                            {error.userNotFound}
                        </div>
                        :
                        null
                    }
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        className={`form-control ${error.passwordIsEmpty !== null || error.wrongPassword !== null ? 'border border-danger' : null }`}
                        placeholder="Enter password"
                        onChange={(e) => { setPassword(e.target.value)}}
                    />
                    {
                        error.passwordIsEmpty !== null ?
                        <div className="text-danger">
                            {error.passwordIsEmpty}
                        </div>
                        :
                        null
                    }
                    {
                        error.wrongPassword !== null ?
                        <div className="text-danger">
                            {error.wrongPassword}
                        </div>
                        :
                        null
                    }
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary" onClick={() => handleSubmit()}>
                        Submit
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Login;