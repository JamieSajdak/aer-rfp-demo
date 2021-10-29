import React from "react";
import Aux from "../hoc/Auxillary";

const Modal = (props) => {
    return (
        <Aux>
            <div className="background"></div>
            <div className="panel">{props.children}</div>
            <style jsx>{`
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
