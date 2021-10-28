import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";

import { UserCxt } from "../../services/userContext";
import {
    fetchAdminRecords,
    fetchIndustryRecords,
    fetchRecordsByAuthID,
    putRecord
} from "../../services/queryApi";

import SelectField from "../../components/SelectField";

import Aux from "../../hoc/Auxillary";
import ReviewTable from "./ReviewTable";
import Spinner from "../../components/Spiner";

const Review = (props) => {
    const USER_ROLE_AER = "AER";

    const { userContext, formContext } = useContext(UserCxt);
    const [records, setRecords] = useState([]);
    const [isAsc, setIsAsc] = useState(true);
    const [selectedHeaderIndex, setSelectedHeaderIndex] = useState();
    const [selectedProject, setSelectedProject] = useState();
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log(formContext);
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        setIsLoading(true);
        if (userContext?.Role === USER_ROLE_AER) {
            const data = await fetchAdminRecords();
            if (!data?.error) {
                setRecords(await data);
            } else {
                setRecords([data]);
            }
        } else {
            const data = await fetchIndustryRecords(userContext.UserID);
            setRecords(await data);
        }
        setIsLoading(false);
        setInput("");
    };

    const handleSort = (event, index) => {
        let sortedRecords = [...records];
        if (event.target.id === "Risk") {
            sortedRecords = [...records].sort((a, b) => {
                console.log(a, b);
                if (a.Risk === "High") {
                    return isAsc ? -1 : 1;
                } else if (a.Risk === "Medium" && b.Risk === "Low") {
                    return isAsc ? -1 : 1;
                }
                return isAsc ? 1 : -1;
            });
        } else {
            sortedRecords = [...records].sort((a, b) => {
                if (a[event.target.id] < b[event.target.id]) {
                    return isAsc ? -1 : 1;
                }
                return isAsc ? 1 : -1;
            });
        }
        setRecords(sortedRecords);
        setIsAsc(!isAsc);
        setSelectedHeaderIndex(index);
    };

    const handleSubmit = async (decision) => {
        alert("Project is: " + decision);
        const put = await putRecord(
            selectedProject,
            decision,
            userContext.UserID
        );
        setSelectedProject();
        fetchRecords();
    };

    const handleSearchByWellID = async (event) => {
        const value = event.target.value;
        setInput(value);
        const recordsByWellID = await fetchRecordsByAuthID(
            userContext?.UserID,
            userContext?.Role,
            value
        );
        setSelectedProject();
        setRecords(await recordsByWellID);
    };

    const ifDateFormat = (record, column) => {
        if (
            column === "SubmittedDate" ||
            (column === "ApprovedDate" && record[column])
        ) {
            const date = new dayjs(record[column]);
            return date.format("DD-MMM-YYYY").toUpperCase();
        }
        return record[column];
    };

    const selectProjectClick = (record) => {
        if (selectedProject?.id === record.id) {
            setSelectedProject();
        } else {
            setSelectedProject(record);
        }
    };

    return (
        <Aux>
            <div className="container">
                <h1>{userContext?.Role} Review</h1>
                <div className="flow">
                    <div className="divider" />
                    <div className="auth-container">
                        <SelectField
                            for="authorization_num"
                            label="Authorization Number"
                            input={{ authorization_num: input }}
                            errors={{}}
                            change={handleSearchByWellID}
                            options={formContext.authOptions}
                            placeholder="Select Authoirization number"
                        >
                            {isLoading ? (
                                <div className="cancel">
                                    <Spinner />
                                </div>
                            ) : (
                                <button
                                    onClick={fetchRecords}
                                    className="cancel"
                                >
                                    <img
                                        src={"/images/refrechIcon.svg"}
                                        alt="refresh"
                                    ></img>
                                </button>
                            )}
                        </SelectField>
                    </div>
                    {records[0]?.error ? (
                        <p>Error connecting to the server</p>
                    ) : null}

                    <ReviewTable
                        handleSort={handleSort}
                        selectedHeaderIndex={selectedHeaderIndex}
                        records={records}
                        selectedProject={selectedProject}
                        selectProjectClick={selectProjectClick}
                        ifDateFormat={ifDateFormat}
                        userContext
                    />

                    <div className="space">
                        {selectedProject ? (
                            <div className="selected-project shadow">
                                <div className="selected-project-header space">
                                    <h2>Project Details</h2>
                                    {selectedProject?.Status === "Submitted" ? (
                                        <Aux>
                                            <button
                                                className="button button--sm bg--secondary"
                                                onClick={() =>
                                                    handleSubmit("Approved")
                                                }
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="button button--sm bg--danger"
                                                onClick={() =>
                                                    handleSubmit("Denied")
                                                }
                                            >
                                                Deny
                                            </button>
                                        </Aux>
                                    ) : null}
                                </div>
                                <div className="selected-project-details">
                                    {Object.keys(selectedProject).map((key) => {
                                        return (
                                            <div>
                                                <p>
                                                    <span className="h3">
                                                        {key.replace("_", " ")}:{" "}
                                                    </span>
                                                    {ifDateFormat(
                                                        selectedProject,
                                                        key
                                                    )}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .search-input {
                    max-width: 20rem;
                    background-image: url("./images/searchIcon.svg");
                    background-repeat: no-repeat;
                    background-position: right;
                }
                .selected-project {
                    width: 100%;

                    background-color: white;
                    margin-right: auto;
                }
                .selected-project-header {
                    padding: 0.5rem 1rem;
                    background-color: var(--cl-primary);
                    color: white;
                    display: flex;
                    align-items: center;
                }
                .selected-project-header h2 {
                    color: white;
                    margin-right: auto;
                }
                .selected-project-details {
                    text-transform: capitalize;
                    padding: 1rem;
                    display: grid;
                    grid-template-columns: repeat(
                        auto-fill,
                        minmax(15rem, 1fr)
                    );
                    row-gap: 0.2rem;
                }
                .selected-project-details span {
                    color: var(--cl-primary);
                }
                .row {
                    cursor: pointer;
                    height: 3.25rem;
                }
                .row:hover {
                    background-color: #eee;
                }
                .table-status {
                    color: white;
                    font-weight: 700;
                }
                .Submitted {
                    color: var(--cl-submitted);
                }
                .Denied {
                    color: var(--cl-danger);
                }
                .Approved {
                    color: var(--cl-light-green);
                }
                .submit-buttons-container {
                    display: flex;
                    margin-top: 2rem;
                    justify-content: end;
                }
                .row--selected {
                    background-color: #eee;
                }
                .auth-container {
                    max-width: 30rem;
                }
                .cancel {
                    background-color: var(--cl-primary);
                    border: none;
                    color: white;
                    width: 3rem;
                    padding: 0.2rem;
                }
            `}</style>
        </Aux>
    );
};

export default Review;
