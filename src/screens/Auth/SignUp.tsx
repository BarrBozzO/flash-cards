import React, { useState } from 'react';
import Button from "components/Button";
import useApi from "hooks/useApi";

function SignUp() {
    const API = useApi();
    const [values, setValues] = useState({
        email: '',
        password: '',
        confirm_password: ''
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
            const signed = await API.signUp(values.email, values.password);

            if ('error' in signed) {
                throw new Error('Something went wrong');
            }

            window.location.replace('/auth/signin');
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
            <div>
                <label htmlFor={'confirm_password'} >Confirm Password</label>
            <input name="confirm_password" type="password" />
            </div>
            <Button onClick={handleSubmit} disabled={isLoading} >Sign Up</Button>
        </div>
    )
}

export default SignUp
