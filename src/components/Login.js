import React, { useContext } from 'react'
import InputTextField from './InputTextField'
import useForm from '../lib/useForm/useForm';
import { validateLogin } from '../lib/useForm/formValidation';
import { UserCxt } from '../services/userContext';


const Layout = (props) => {
    const images = process.env.PUBLIC_URL + "/images/";
    const { userContext } = useContext(UserCxt);
    
    const submitLogin = () => {
        console.log(errors)
        if(Object.values(errors).every(err => err === null)) {
            props.handleLogin(input)
        }
        if(userContext?.auth === 'false') {
            const errorString = "- username or password incorrect"
            setInput({})
            setErrors({username: errorString, password: errorString})
        }
    }

    const { input, setInput, handleChange, handleSubmit, errors, setErrors} = useForm(
        submitLogin,
        validateLogin
    )

    return (
        <div>
            <div className="login-background">
            </div>
            <div className="login-panel">
                <form className="login-container" onSubmit={handleSubmit}> 
                    <img src={images + "login.jpg"} className="login-image" alt="login"/>
                    <h1 className="login-title title">User Login</h1>
                    <InputTextField 
                        placeholder="Enter Username" 
                        for="username" 
                        icon={images + "user_black.png"} 
                        type="text" 
                        input={input}
                        change={handleChange}
                        errors={errors}
                    />
                    <InputTextField 
                        placeholder="Enter Password" 
                        for="password" 
                        icon={images + "lock_black.png"} 
                        type="password"
                        input={input}
                        change={handleChange}
                        errors={errors}/>
                    <button className="button button--submit" >Submit</button>
                </form>
            </div>
            <style jsx>{`
            .login-panel {
                z-index: 20;
                width: 90%;
                height: 80%;
                max-width: 400px;
                max-height: 600px;
                background-color: white;
                position: fixed;
                top: 50%;
                right: 50%;
                transform: translate(50%, -50%);
                filter: drop-shadow(4px 4px 4px rgba(0,0,0,0.2));
              }
            .login-container {
                width: 70%;
                height: 100%;
                display: flex;
                flex-direction: column;
                margin: auto;
                padding:2rem 0;
            }
            .login-container > * {
                margin-left: auto;
                margin-right: auto;
            }
            .login-container > *+ * {
                margin-top: 1.5rem;
            }
            .login-background {
                z-index: 10;
                height: 100vh;
                background-color: black;
                opacity: 0.5;
                position: fixed;
                top: 0;
                bottom: 0;
                right: 0;
                left: 0;
                cursor:not-allowed;
            }
            .login-image {
                max-height: 6rem;
                height: 10vh;
                
            }
            .button {
                margin-top: auto;
            }
            `}</style>
        </div>
        
    )
    
}

export default Layout