import React, { useContext } from "react";
import Aux from "../hoc/Auxillary";
import { NavLink } from "react-router-dom";
import { UserCxt } from "../services/userContext";
import Modal from "./Modal";

const Header = () => {
    return (
        <Aux>
            <div className="header">
                <div className="container space">
                    <img
                        src={"/images/AER_Logo.png"}
                        alt="Alberta Energy Regulator"
                        className="header-logo"
                    />
                    <div className="nav-container">
                        <img
                            src={"/images/logo-onestop.png"}
                            alt="one stop"
                            className="onestop"
                        />
                        <div className="desktop">
                            <Nav />
                        </div>

                        <button className="menu-button">
                            <img
                                src="/images/downarrow.svg"
                                alt="drop down menu"
                                className="menu-icon"
                            ></img>
                        </button>
                        <div className="menu">
                            <Modal>
                                <div className="menu-container">
                                    <Nav />
                                </div>
                            </Modal>
                            <Nav />
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .menu-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .menu-icon {
                    width: 2rem;
                }
                .nav-container {
                    margin-left: auto;
                    display: flex;
                    flex-direction: column;
                    align-items: end;
                    justify-content: space-between;
                }
                .header {
                    background-color: white;
                    margin-bottom: 1rem;
                    padding: 1rem 0;
                }
                .header-logo {
                    height: auto;
                    max-height: 4.5rem;
                    max-width: 20vw;
                    object-fit: contain;
                }
                @media (max-width: 500px) {
                    .desktop {
                        display: none;
                    }
                }
                @media (min-width: 500px) {
                    .menu .menu-button {
                        display: none;
                    }
                }
            `}</style>
        </Aux>
    );
};

const Nav = () => {
    const { setUserContext } = useContext(UserCxt);
    return (
        <Aux>
            <nav className="space nav">
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
                <button
                    className="nav-link logout button bg--primary"
                    onClick={() => setUserContext({})}
                >
                    <img
                        src={"/images/user_icon.svg"}
                        className="logout-icon"
                        alt="logout"
                    />
                    Logout
                </button>
            </nav>
            <style jsx>{`
                .nav {
                    align-items: end;
                    display: flex;
                    flex-direction: column;
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
                .onestop {
                    max-width: 8rem;
                    width: 20vw;
                }
                .logout {
                    --bg: white;
                    --fg: var(--cl-primary);
                    border-color: var(--cl-primary);
                    margin-top: 0.5rem;
                    min-width: auto;
                    padding: 0.3rem 0.7rem 0.3rem 0.1rem;
                    display: flex;
                    align-items: center;
                    font-size: 0.8rem;
                }
                .logout-icon {
                    width: 2rem;
                    height: 1.2rem;
                    opacity: 0.5;
                }
                @media (min-width: 500px) {
                    .nav {
                        flex-direction: row;
                        align-items: end;
                    }
                    .onestop {
                        display: inline-block;
                        max-width: 8rem;
                        width: 20vw;
                    }
                }
            `}</style>
        </Aux>
    );
};

export default Header;
