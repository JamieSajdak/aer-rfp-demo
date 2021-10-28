import React, { useContext, useState } from "react";
import InputTextField from "./InputTextField";
import useForm from "../lib/useForm/useForm";
import { validateLogin } from "../lib/useForm/formValidation";
import { UserCxt } from "../services/userContext";
import { authorizeUser, fetchAuthIdsForUser } from "../services/queryApi";
import Spinner from "./Spiner";

const Layout = (props) => {
    const { setUserContext, setFormContext } = useContext(UserCxt);
    const [isLoading, setIsLoading] = useState(false);

    const submitLogin = async () => {
        console.log("Loging in");
        setIsLoading(true);
        const userAuth = await authorizeUser(input.username, input.password);
        if (await userAuth?.UserID) {
            userAuth.auth = "success";
            setUserContext(userAuth);
            const authIds = await fetchAuthIdsForUser(userAuth.UserID);
            const authIdLength = await authIds.length;
            console.log(await authIds);
            if (authIdLength > 0) {
                setFormContext({
                    authOptions: [
                        ...(await authIds.map(
                            (authId) => authId.authorizationID
                        ))
                    ]
                });
            }
        } else {
            setIsLoading(false);
            const errorString = "- error connecting to server";
            setInput({});
            setErrors({ username: errorString, password: errorString });
        }
    };
    const { input, setInput, handleChange, handleSubmit, errors, setErrors } =
        useForm(submitLogin, validateLogin);

    return (
        <div>
            <div className="background"></div>
            <div className="login-panel">
                <form
                    className="login-container flow flow--between"
                    onSubmit={handleSubmit}
                >
                    <img
                        src={"/images/login.jpg"}
                        className="login-image"
                        alt="login"
                    />
                    <h1 className="login-title title">User Login</h1>
                    <div className="inputs flow--gap">
                        <InputTextField
                            placeholder="Enter Username"
                            for="username"
                            icon={"/images/user_black.png"}
                            type="text"
                            input={input}
                            change={handleChange}
                            errors={errors}
                        />
                        <InputTextField
                            placeholder="Enter Password"
                            for="password"
                            icon={"/images/lock_black.png"}
                            type="password"
                            input={input}
                            change={handleChange}
                            errors={errors}
                        />
                    </div>
                    {isLoading ? (
                        <div className="button button--submit bg--secondary button--loading">
                            <Spinner />
                        </div>
                    ) : (
                        <button className="button button--submit bg--secondary">
                            Login
                        </button>
                    )}
                </form>
            </div>
            <style jsx>{`
                .background {
                    z-index: 10;
                    height: 100vh;
                    background: radial-gradient(
                        rgba(0, 0, 0, 0.1),
                        rgba(0, 0, 0, 0.8)
                    );
                    position: fixed;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    left: 0;
                    cursor: not-allowed;
                }
                .login-panel {
                    z-index: 20;
                    width: 90%;
                    height: 90vh;
                    max-width: 400px;
                    max-height: 600px;
                    background-color: white;
                    position: fixed;
                    top: 50%;
                    right: 50%;
                    transform: translate(50%, -50%);
                    filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.2));
                }
                .login-container {
                    width: 70%;
                    margin: auto;
                    height: 80%;
                }
                .login-container > * {
                    margin-left: auto;
                    margin-right: auto;
                }
                .login-image {
                    max-height: 6rem;
                    height: 10vh;
                }
                .inputs {
                    width: 100%;
                    --gap: 0.5rem;
                }
            `}</style>
        </div>
    );
};

export default Layout;
