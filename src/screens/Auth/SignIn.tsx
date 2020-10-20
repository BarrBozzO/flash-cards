import React, { useState, ReactElement } from 'react';
import { useHistory } from "react-router-dom";
import Button from "components/Button";
import useApi from "hooks/useApi";


function SignIn(): ReactElement {
    const API = useApi();
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const handleInpuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            debugger;
            const signed = await API.signIn(values.email, values.password);
            if ('error' in signed) {
                throw new Error('Something went wrong');
            }

            history.replace('/');
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
