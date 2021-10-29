import React, { useContext, useState } from "react";
import InputTextField from "./InputTextField";
import useForm from "../lib/useForm/useForm";
import { validateLogin } from "../lib/useForm/formValidation";
import { UserCxt } from "../services/userContext";
import { authorizeUser, fetchAuthIdsForUser } from "../services/queryApi";
import Spinner from "./Spiner";
import Modal from "./Modal";

const Layout = (props) => {
    const { userContext, setUserContext, setFormContext } = useContext(UserCxt);
    const [isLoading, setIsLoading] = useState(false);

    const submitLogin = async () => {
        try {
            setIsLoading(true);
            const userAuth = await authorizeUser(
                input.username,
                input.password
            );
            if (await !userAuth?.error) {
                userAuth.auth = "success";
                setUserContext((userContext) => ({
                    ...userContext,
                    ...userAuth
                }));
                const authIds = await fetchAuthIdsForUser(userAuth);
                if ((await authIds.length) > 0) {
                    setFormContext({
                        authOptions: authIds
                    });
                }
            } else {
                setErrors({
                    username: userAuth.error,
                    password: userAuth.error
                });
            }
        } finally {
            setIsLoading(false);
            setInput({});
        }
    };

    const { input, setInput, handleChange, handleSubmit, errors, setErrors } =
        useForm(submitLogin, validateLogin);

    return (
        <div>
            <Modal>
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
            </Modal>
            <style jsx>{`
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
