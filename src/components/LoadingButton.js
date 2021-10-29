import React from "react";
import Spinner from "./Spiner";
import Aux from "../hoc/Auxillary";

const LoadingButton = (props) => {
    return (
        <Aux>
            {props.isLoading ? (
                <div
                    className={`button button--submit bg--secondary button--loading ${props.color} ${props.size}`}
                >
                    <Spinner />
                </div>
            ) : (
                <button
                    className={`button button--submit bg--secondary ${props.size} ${props.color}`}
                    onClick={props?.click ? props.click : null}
                >
                    {props.children}
                </button>
            )}
            <style jsx>{`
                .red {
                    --bg: var(--cl-danger);
                }
                .green {
                    --bg: var(--cl-light-green);
                }
            `}</style>
        </Aux>
    );
};

export default LoadingButton;
