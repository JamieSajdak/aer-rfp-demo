import React from "react";
import Aux from '../hoc/Auxillary'
import InputFiles from 'react-input-files';

const InputFile = (props) => {


    return (
        <Aux>
            <div className="input">
                <lable className="input-lable" for={props.for}>
                        {props.lable ||props.for}
                </lable>
                <InputFiles onChange={props.change}>
                    <button className="input-field button bg--primary select">Select a File</button>
                </InputFiles>

            </div>
            <style jsx>{`
                .select {
                    padding:0;
                    width: 100%;
                    --fg: white;
                    --bg: var(--cl-primary);
                    border-color: var(--cl-primary);
                    border-radius: 0;
                }
            `}</style>
        </Aux>
        
    )
}

export default InputFile