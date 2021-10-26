import React from "react";
import Aux from '../hoc/Auxillary'

const SelectField = (props) => {
    return (
        <Aux>
            <div className="input">
                <label className="input-label">
                        {props.label ||props.for}
                        <span aria-hidden="true">{' * '}</span>
                        <span aria-live="polite"  className="input-error">{props.errors[props.for]}</span>
                </label>

                    <select 
                        id={props.for}
                        name={props.for}
                        className={[" input-field arrow" , props.errors[props.for] ? "input-field--error": null].join(" ")} 
                        placeholder={props.placeholder} 
                        type={props.type} 
                        onChange={props.change}
                        value={props.input[props.for] || "inital_option"}
                    >   
                    <option className="inital_option" value="">{props.placeholder}</option>
                    {props.options.map((option, index) => {
                            return (
                                <option className="select-option" value={option}>{option}</option>
                            )
                        })}
                    </select>

            </div>
            <style jsx>{`
            .arrow {
                background-image: url('/images/downarrow.svg');
                background-repeat: no-repeat;
                background-position: right;
            }
            `}</style>
        </Aux>

    )
}

export default SelectField