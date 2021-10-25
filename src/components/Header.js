import React, { useContext } from "react";
import Aux from '../hoc/Auxillary';
import { NavLink } from 'react-router-dom';
import { UserCxt } from '../services/userContext';

const Header = () => {
    const { userContext, setUserContext } = useContext(UserCxt);

    return (
        <Aux>
             <div className="header">
                <div className="header-container container">
                    <img src={"/images/AER_Logo.png"} alt="Alberta Energy Regulator" className="header-logo"/>
                    <div className="nav-container">
                        <img src={"/images/logo-onestop.png"} alt="one stop" className="onestop"/>
                        <nav className="nav">
                            <NavLink
                                to="/"
                                exact
                                className="nav-link"
                                activeClassName="nav-link--active"
                            >
                                Review
                            </NavLink>
                            <NavLink
                                to="/submit"
                                exact
                                className="nav-link"
                                activeClassName="nav-link--active"
                            >
                                Submit Record
                            </NavLink>
                            <button className="nav-link logout-button logout button" onClick={() =>setUserContext({})}>
                                <img src={"/images/user_icon.svg"} className="logout-icon" alt="logout"/>
                                Logout
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .header {
                    background-color: white;
                    margin-bottom: 1rem;
                }
                .header-container {
                    padding: 1rem 0;
                    display: flex;
                    flex-direction: row;
                }
                .header-logo {
                    height:100%;
                }
                .nav {
                    display: flex;
                    flex-direction: row;
                    align-items:end;
                }
                .nav > * + * {
                    margin-left: 1rem;
                }
                .nav-link {
                    text-decoration: none;
                    color: #0a5688;
                    opacity: 0.8;
                }
                .nav-link--active {
                    text-decoration: none;
                    font-weight: 500;
                    opacity: 1;
                    font-size: 1.1em;
                }
                .nav-container {
                    margin-left: auto;
                    display: flex;
                    flex-direction: column;
                    align-items: end;
                    justify-content: space-between;
                }
                .onestop {
                    max-width: 8rem;
                    width: 20vw;
                }
                .logout {
                    display: flex;
                    flex-direction:row;
                }
                .logout-icon {
                    width:2rem;
                    height:1.2rem;
                    opacity: 0.5;
                }
                .logout-button {
                    margin-top: 0.5rem;
                    background: none;
                    min-width:auto;
                    padding: 0.3rem 0.7rem 0.3rem 0.1rem;
                    border: 1px solid #ccc;
                    cursor:pointer;
                    display: flex;
                    align-items: center;
                }
            `}</style>
        </Aux>
       
    )
}

export default Header