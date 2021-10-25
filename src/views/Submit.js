import React, { useState, useContext } from "react";
import useForm from "../lib/useForm/useForm";
import Aux from '../hoc/Auxillary';

import { validateRecordSubmit } from '../lib/useForm/formValidation';
import InputTextField from "../components/InputTextField";
import InputFile from "../components/InputFile";
import SelectField from "../components/SelectField";
import InputDate from "../components/InputDate";
import  { UserCxt } from '../services/userContext'

const Submit = (props) => {
    const { userContext } = useContext(UserCxt);

    const formSubmit = () => {
        alert('form submitted: ')
        setInput({})
        setSelectedFiles([])
    }

    const { input, setInput, handleChange, handleDateChange, handleSubmit, errors, handleAutoPopulate} = useForm(
        formSubmit,
        validateRecordSubmit
    )
   
    const [selectedFiles, setSelectedFiles] = useState([{}])

    const handleFileUpload = (files) => {
        console.log(files)
        Object.keys(files).forEach(fileKey => {
            const fileReader = new FileReader()
            fileReader.onload = function() {
                console.log({binary: fileReader.result, name: files[fileKey].name})
                setSelectedFiles([...selectedFiles, {binary: fileReader.result, name: files[fileKey].name}])
            }
            fileReader.readAsBinaryString(files[fileKey])
        })
    }

    const selecOptionsTemp = ["option1", "option2", "option3", "option4"]

    return (
        <Aux>
            <div className="container">
                <h1>Record Submission</h1>
                <div className="divider"/>
                <div className="container--inner flow">
                    <form className="form" id="record-submission" onSubmit={handleSubmit}>
                        <SelectField
                            for="authorization_num"
                            lable="Authorization Number"
                            errors={errors}
                            input={input}
                            change={handleChange}
                            options={selecOptionsTemp}
                            placeholder="Select Authoirization number"
                        />
                        <InputTextField 
                            for="well_id"
                            lable="Well ID"
                            errors={errors}
                            input={input}
                            type="text"
                            change={handleChange}
                            placeholder="Enter Well ID"
                        />
                        <InputDate
                            for="date"
                            lable="Submitted Date"
                            errors={errors}
                            input={input}
                            type="text"
                            change={handleDateChange}
                        />
                        <InputTextField 
                            for="industry_name"
                            lable="Industry Name"
                            errors={errors}
                            input={input}
                            type="text"
                            change={handleChange}
                            placeholder="Enter Industry Name"
                        />
                        <InputTextField
                            for="industry_type"
                            lable="Industry Type"
                            errors={errors}
                            input={input}
                            change={handleChange}
                            placeholder="Select Industry Type"
                        />
                        <InputTextField 
                            for="amount"
                            errors={errors}
                            input={input}
                            type="number"
                            change={handleChange}
                            placeholder="Enter Well ID"
                        />
                        <InputFile 
                            for="auto"
                            lable="Auto Populate"
                            input={input}
                            type="file"
                            change={file => handleAutoPopulate(file)}
                        />
                        <InputFile 
                            for="file"
                            lable="Supported Documentation"
                            errors={errors}
                            input={input}
                            type="file"
                            change={files => handleFileUpload(files)}
                        />
                    </form>
                    <div>
                        <h2>Documentation Added</h2>
                        <div className="divider"/>
                        {selectedFiles.map(file => <p>{file?.name}</p>)}
                    </div>
                    <button className="button button--submit button--submit--right" form="record-submission">Submit</button>
                </div>
            </div>
            <style jsx>{`
                .button--submit--right {
                    display:block;
                    margin-left: auto;
                    
                }
                .form {
                    margin-top: 1rem;
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    row-gap: 0.6rem;
                    column-gap: 3rem;
                }

            `}</style>
        </Aux>
    )
}

export default Submit