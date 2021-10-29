import React from "react";
import Aux from "../hoc/Auxillary";

const InputTextField = (props) => {
    const inputStyle = props.icon
        ? "input-field input-field--withicon"
        : "input-field";

    const icon = <img className="icon" src={props.icon} alt={props.iconAlt} />;

    return (
        <Aux>
            <div className="input">
                <label className="input-label" htmlFor={props.for}>
                    {props.label || props.for}
                    <span aria-hidden="true">{" * "}</span>
                    <span aria-live="polite" className="input-error">
                        {props.errors[props.for]}
                    </span>
                </label>
                <div className="input">
                    <input
                        id={props.for}
                        name={props.for}
                        className={[
                            inputStyle,
                            props.errors[props.for]
                                ? "input-field--error"
                                : null
                        ].join(" ")}
                        placeholder={props.placeholder}
                        type={props.type}
                        onChange={props.change}
                        value={props.input[props.for] || ""}
                    ></input>
                    {props.icon ? icon : null}
                </div>
            </div>

            <style jsx>{`
                .icon {
                    width: 1.8rem;
                    position: absolute;
                    top: 50%;
                    transform: translate(0.2rem, -50%);
                    opacity: 0.5;
                }
            `}</style>
        </Aux>
    );
};

export default InputTextField;
