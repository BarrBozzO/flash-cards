import React, { useState } from 'react';
import Button from "components/Button";
import useApi from "hooks/useApi";

function SignIn() {
    const API = useApi();
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInpuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            const signed = await API.signin(values.email, values.password);

            if ('error' in signed) {
                throw new Error('Something went wrong');
            }

            window.location.replace('/');
        } 
        catch (error){
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div>
                <label htmlFor={'email'} >Email</label>
                <input name="email" type="email" onChange={handleInpuChange} />
            </div>
            <div>
                <label htmlFor={'password'} >Password</label>
                <input name="password" type="password" onChange={handleInpuChange} />
            </div>
            <Button onClick={handleSubmit} disabled={isLoading}>Sign In</Button>
        </div>
    )
}

export default SignIn;
