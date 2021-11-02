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
import Spinner from "../components/Spiner";
import PageTitle from "../components/PageTitle";

const Submit = (props) => {
    const { userContext, formContext } = useContext(UserCxt);
    const [selectedFiles, setSelectedFiles] = useState([{}]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const formSubmit = async () => {
        try {
            setError("");
            setIsLoading(true);
            const submit = await postNewRecord(
                input,
                userContext,
                selectedFiles[0]
            );
            if (await submit.error) {
                setError(submit.error);
            } else {
                setSuccessMsg("Submission Accepted.");
            }
        } finally {
            setIsLoading(false);
            setInput({});
            setSelectedFiles([{}]);
        }
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

    const handleFileUpload = (files) => {
        Object.keys(files).forEach((fileKey) => {
            const fileReader = new FileReader();
            fileReader.onload = function () {
                setSelectedFiles([
                    { binary: fileReader.result, fileName: files[fileKey].name }
                ]);
            };
            fileReader.readAsBinaryString(files[fileKey]);
        });
    };

    const handleFormInputChange = (event) => {
        setError("");
        setSuccessMsg("");
        handleChange(event);
    };

    return (
        <Aux>
            <div>
                <PageTitle
                    title="Submit New Record"
                    image="/images/titleImage2.jpg"
                />
            </div>
            <div className="container">
                <h2>New Record Submission From</h2>
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
                            change={handleFormInputChange}
                            options={formContext.authOptions}
                            placeholder="Select Authoirization number"
                        />
                        <InputTextField
                            for="well_id"
                            label="Well ID"
                            errors={errors}
                            input={input}
                            type="text"
                            change={handleFormInputChange}
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
                            change={handleFormInputChange}
                            placeholder="Enter Industry Name"
                        />
                        <InputTextField
                            for="industry_type"
                            label="Industry Type"
                            errors={errors}
                            input={input}
                            change={handleFormInputChange}
                            placeholder="Enter Industry Type"
                        />
                        <InputTextField
                            for="amount"
                            errors={errors}
                            input={input}
                            type="number"
                            change={handleFormInputChange}
                            placeholder="Enter Amount"
                        />
                        <InputFile
                            for="auto"
                            label="Auto Populate"
                            input={input}
                            type="file"
                            change={(file) => {
                                setError("");
                                setSuccessMsg("");
                                handleAutoPopulate(file);
                            }}
                        />
                        <InputFile
                            for="file"
                            label="Supported Documentation"
                            errors={errors}
                            input={input}
                            type="file"
                            change={(files) => {
                                setError("");
                                setSuccessMsg("");
                                handleFileUpload(files);
                            }}
                        />
                    </form>
                    <div>
                        <h2>Documentation Added</h2>
                        <div className="divider" />
                        {selectedFiles.map((file) => (
                            <p>{file?.fileName}</p>
                        ))}
                    </div>
                    <div>
                        {isLoading ? (
                            <div className="button button--submit bg--secondary button--loading form-button">
                                <Spinner />
                            </div>
                        ) : (
                            <button
                                form="form"
                                className="button button--submit bg--secondary outside-button form-button"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        )}
                        <p className="error" aria-live="polite">
                            {error ? `* ${error}` : null}
                        </p>
                        <p className="error--success" aria-live="polite">
                            {successMsg ? `* ${successMsg}` : null}
                        </p>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .form-button {
                    height: 3rem;
                    width: 15rem;
                    display: block;
                    margin-left: auto;
                }
                .form {
                    margin-top: 2rem;
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
