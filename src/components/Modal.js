import React from "react";
import Aux from "../hoc/Auxillary";

const Modal = (props) => {
    return (
        <Aux>
            <div className="background"></div>
            <div className="panel">{props.children}</div>
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
                .panel {
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
            `}</style>
        </Aux>
    );
};

export default Modal;
