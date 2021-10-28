import React, { useState, useContext } from "react";
import useForm from "../lib/useForm/useForm";
import Aux from "../hoc/Auxillary";

import { validateRecordSubmit } from "../lib/useForm/formValidation";
import InputTextField from "../components/InputTextField";
import InputFile from "../components/InputFile";
import SelectField from "../components/SelectField";
import InputDate from "../components/InputDate";
import { UserCxt } from "../services/userContext";
import { postNewRecord } from "../services/queryApi";

const Submit = (props) => {
    const { userContext, formContext } = useContext(UserCxt);

    const formSubmit = async () => {
        const submit = await postNewRecord(input, userContext);
        alert("form submitted: ", await submit);
        setInput({});
        setSelectedFiles([]);
    };

    const {
        input,
        setInput,
        handleChange,
        handleDateChange,
        handleSubmit,
        errors,
        handleAutoPopulate
    } = useForm(formSubmit, validateRecordSubmit);

    const [selectedFiles, setSelectedFiles] = useState([{}]);

    const handleFileUpload = (files) => {
        console.log(files);
        Object.keys(files).forEach((fileKey) => {
            const fileReader = new FileReader();
            fileReader.onload = function () {
                console.log({
                    binary: fileReader.result,
                    name: files[fileKey].name
                });
                setSelectedFiles([
                    ...selectedFiles,
                    { binary: fileReader.result, name: files[fileKey].name }
                ]);
            };
            fileReader.readAsBinaryString(files[fileKey]);
        });
    };

    return (
        <Aux>
            <div className="container">
                <h1>Record Submission</h1>
                <div className="divider" />
                <div className="container--inner flow">
                    <form
                        className="form"
                        id="record-submission"
                        onSubmit={handleSubmit}
                    >
                        <SelectField
                            for="authorization_num"
                            label="Authorization Number"
                            errors={errors}
                            input={input}
                            change={handleChange}
                            options={formContext.authOptions}
                            placeholder="Select Authoirization number"
                        />
                        <InputTextField
                            for="well_id"
                            label="Well ID"
                            errors={errors}
                            input={input}
                            type="text"
                            change={handleChange}
                            placeholder="Enter Well ID"
                        />
                        <InputDate
                            for="date"
                            label="Submitted Date"
                            errors={errors}
                            input={input}
                            type="text"
                            change={handleDateChange}
                        />
                        <InputTextField
                            for="industry_name"
                            label="Industry Name"
                            errors={errors}
                            input={input}
                            type="text"
                            change={handleChange}
                            placeholder="Enter Industry Name"
                        />
                        <InputTextField
                            for="industry_type"
                            label="Industry Type"
                            errors={errors}
                            input={input}
                            change={handleChange}
                            placeholder="Enter Industry Type"
                        />
                        <InputTextField
                            for="amount"
                            errors={errors}
                            input={input}
                            type="number"
                            change={handleChange}
                            placeholder="Enter Amount"
                        />
                        <InputFile
                            for="auto"
                            label="Auto Populate"
                            input={input}
                            type="file"
                            change={(file) => handleAutoPopulate(file)}
                        />
                        <InputFile
                            for="file"
                            label="Supported Documentation"
                            errors={errors}
                            input={input}
                            type="file"
                            change={(files) => handleFileUpload(files)}
                        />
                    </form>
                    <div>
                        <h2>Documentation Added</h2>
                        <div className="divider" />
                        {selectedFiles.map((file) => (
                            <p>{file?.name}</p>
                        ))}
                    </div>
                    <button
                        className="button bg--secondary form-button"
                        form="record-submission"
                    >
                        Submit
                    </button>
                </div>
            </div>
            <style jsx>{`
                .form-button {
                    display: block;
                    margin-left: auto;
                }
                .form {
                    margin-top: 1rem;
                    display: grid;
                    grid-template-columns: repeat(
                        auto-fill,
                        minmax(300px, 1fr)
                    );
                    row-gap: 0.6rem;
                    column-gap: 3rem;
                }
            `}</style>
        </Aux>
    );
};

export default Submit;
