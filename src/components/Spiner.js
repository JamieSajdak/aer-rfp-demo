import React from "react";
import Aux from "../hoc/Auxillary";

const Spinner = (props) => {
    const classes = ["Loader-container", ""];
    return (
        <Aux>
            <div className="Loader-container">
                <div className={props?.grey ? "Loader grey" : "Loader"}></div>
            </div>
            <style jsx>{`
                .Loader,
                .Loader:after {
                    border-radius: 50%;
                    width: 100%;
                    height: 100%;
                }
                .Loader {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    bottom: 0;
                    border-top: 0.3em solid rgba(255, 255, 255, 0.3);
                    border-right: 0.3em solid rgba(255, 255, 255, 0.3);
                    border-bottom: 0.3em solid rgba(255, 255, 255, 0.3);
                    border-left: 0.3em solid rgba(255, 255, 255, 0.8);
                    -webkit-transform: translateZ(0);
                    -ms-transform: translateZ(0);
                    transform: translateZ(0);
                    -webkit-animation: load8 1.1s infinite linear;
                    animation: load8 1.1s infinite linear;
                }
                .grey {
                    border-top: 0.3em solid rgba(180, 180, 180, 0.3);
                    border-right: 0.3em solid rgba(180, 180, 180, 0.3);
                    border-bottom: 0.3em solid rgba(180, 180, 180, 0.3);
                    border-left: 0.3em solid rgba(180, 180, 180, 0.8);
                }
                @-webkit-keyframes load8 {
                    0% {
                        -webkit-transform: rotate(0deg);
                        transform: rotate(0deg);
                    }
                    100% {
                        -webkit-transform: rotate(360deg);
                        transform: rotate(360deg);
                    }
                }
                @keyframes load8 {
                    0% {
                        -webkit-transform: rotate(0deg);
                        transform: rotate(0deg);
                    }
                    100% {
                        -webkit-transform: rotate(360deg);
                        transform: rotate(360deg);
                    }
                }

                .Loader-container {
                    margin: auto;
                    position: relative;
                    aspect-ratio: 1 / 1;
                    height: 100%;
                    transform: translate(-50%, -50%);
                }
            `}</style>
        </Aux>
    );
};

export default Spinner;
