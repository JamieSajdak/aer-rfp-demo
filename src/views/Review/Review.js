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
import ProjectDetails from "./Project Details";

const Review = (props) => {
    const USER_ROLE_AER = "AER";

    const { userContext, formContext } = useContext(UserCxt);
    const [records, setRecords] = useState([]);
    const [isAsc, setIsAsc] = useState(true);
    const [selectedHeaderIndex, setSelectedHeaderIndex] = useState();
    const [selectedProject, setSelectedProject] = useState();
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
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
        } finally {
            setIsLoading(false);
            setInput("");
        }
    };

    const handleSort = (event, index) => {
        let sortedRecords = [...records];
        if (event.target.id === "Risk") {
            sortedRecords = [...records].sort((a, b) => {
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
        let isSuccessfull = false;
        try {
            const put = await putRecord(
                selectedProject,
                decision,
                userContext.UserID
            );

            if (await !put.error) {
                isSuccessfull = true;
            }
        } catch (e) {
            console.log(e);
        } finally {
            alert(
                "Report " + decision + " " + isSuccessfull
                    ? "Success"
                    : "FAIL - server error"
            );
            setSelectedProject();
            fetchRecords();
        }
    };

    const handleSearchByAuthId = async (event) => {
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
            <ProjectDetails
                selectedProject={selectedProject}
                ifDateFormat={ifDateFormat}
                handleSubmit={handleSubmit}
                setSelectedProject={setSelectedProject}
            />
            <div className="container">
                <h1>
                    {userContext?.Role === "IND" ? "Industry User" : "Aer User"}{" "}
                    Review
                </h1>
                <div className="flow">
                    <div className="divider" />
                    <div className="auth-container">
                        <SelectField
                            for="authorization_num"
                            label="Authorization Number"
                            input={{ authorization_num: input }}
                            errors={{}}
                            change={handleSearchByAuthId}
                            options={formContext.authOptions}
                            placeholder="Select Authoirization number"
                        >
                            <button onClick={fetchRecords} className="cancel">
                                <img
                                    src={"/images/refrechIcon.svg"}
                                    alt="refresh"
                                ></img>
                            </button>
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
                        isLoading={isLoading}
                    />
                    \
                </div>
            </div>

            <style jsx>{`
                .search-input {
                    max-width: 20rem;
                    background-image: url("./images/searchIcon.svg");
                    background-repeat: no-repeat;
                    background-position: right;
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
