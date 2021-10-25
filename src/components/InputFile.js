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
                    <button className="button button--file select">Select a File</button>
                </InputFiles>

            </div>
            <style jsx>{`
                .select {
                    width: 100%;
                }
            `}</style>
        </Aux>
        
    )
}

export default InputFile