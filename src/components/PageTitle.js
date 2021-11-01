import React from "react";
import Aux from "../hoc/Auxillary";

const PageTitle = (props) => {
    return (
        <Aux>
            <div className="title">
                <div className="titleContainer container">
                    <h1 className="titleText">{props.title}</h1>
                </div>
                <div className="overlay" />
            </div>
            <style jsx>{`
                .title {
                    height: 25rem;
                    background-image: url(${props.image});
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;
                    margin-bottom: 2rem;
                    display: flex;
                    position: relative;
                }
                .titleText {
                    font-size: 4rem;
                    color: white;
                }
                .overlay {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    opacity: 0.95;
                    background-image: linear-gradient(
                        rgba(0, 0, 0, 0),
                        var(--cl-primary-dark)
                    );
                }
                .titleContainer {
                    padding: 2rem 0;
                    z-index: 4;
                    margin: 0 auto;
                    height: 100%;
                    display: flex;
                    align-items: end;
                }
            `}</style>
        </Aux>
    );
};

export default PageTitle;
