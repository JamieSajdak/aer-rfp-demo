import React, { useContext, useEffect, useState } from "react";
import Aux from "../../hoc/Auxillary";
import { UserCxt } from "../../services/userContext";
import {
    fetchAdminRecords,
    fetchIndustryRecords,
    fetchRecordsByAuthID,
    putRecord
} from "../../services/queryApi";

import SelectField from "../../components/SelectField";
import dayjs from "dayjs";

const Review = (props) => {
    const USER_ROLE_AER = "AER";

    const { userContext, formContext } = useContext(UserCxt);
    const [records, setRecords] = useState([]);
    const [isAsc, setIsAsc] = useState(true);
    const [selectedHeaderIndex, setSelectedHeaderIndex] = useState();
    const [selectedProject, setSelectedProject] = useState();
    const [input, setInput] = useState("");

    const isUserAer = userContext.Role === USER_ROLE_AER;

    useEffect(() => {
        console.log(formContext);
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
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
        setInput("");
    };

    const handleSort = (event, index) => {
        const sortedRecords = [...records].sort((a, b) => {
            if (a[event.target.id] < b[event.target.id]) {
                return isAsc ? -1 : 1;
            }
            return isAsc ? 1 : -1;
        });
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
        console.log(put);
        setSelectedProject();
        fetchRecords();
    };

    const handleSearchByWellID = async (event) => {
        const value = event.target.value;
        setInput(value);
        const recordsByWellID = await fetchRecordsByAuthID(
            userContext?.UserID,
            value
        );
        setSelectedProject();
        setRecords(await recordsByWellID);
    };

    const industryTableHeaders = [
        {
            for: "Organization",
            click: handleSort,
            id: "Organization",
            isForIndustry: true
        },
        {
            for: "Auth Number",
            click: handleSort,
            id: "AuthorizationID",
            isForIndustry: true
        },
        {
            for: "Industry Type",
            click: handleSort,
            id: "IndustryType",
            isForIndustry: true
        },
        { for: "Amt", click: handleSort, id: "Amount", isForIndustry: false },
        { for: "Risk", click: handleSort, id: "Risk", isForIndustry: true },
        {
            for: "Date",
            click: handleSort,
            id: "SubmittedDate",
            isForIndustry: false
        },
        {
            for: "Status",
            click: handleSort,
            id: "Status",
            isForIndustry: true
        }
    ].filter((column) => {
        return userContext?.Role === USER_ROLE_AER
            ? true
            : column.isForIndustry;
    });

    const selectProjectClick = (record) => {
        if (selectedProject?.id === record.id) {
            setSelectedProject();
        } else {
            setSelectedProject(record);
        }
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
                    <table>
                        <thead>
                            {industryTableHeaders.map((header, index) => {
                                return (
                                    <TableHeaderCell
                                        for={header.for}
                                        id={header.id}
                                        click={handleSort}
                                        index={index}
                                        selectedIndex={selectedHeaderIndex}
                                    />
                                );
                            })}
                        </thead>
                        <tbody>
                            {records?.error
                                ? null
                                : records.map((record, index) => {
                                      return (
                                          <tr
                                              index={index}
                                              className={
                                                  record.id ===
                                                  selectedProject?.id
                                                      ? "row row--selected"
                                                      : isUserAer
                                                      ? "row"
                                                      : ""
                                              }
                                              ariaRole={
                                                  isUserAer ? "button" : ""
                                              }
                                              onClick={
                                                  isUserAer
                                                      ? () =>
                                                            selectProjectClick(
                                                                record
                                                            )
                                                      : null
                                              }
                                          >
                                              {industryTableHeaders.map(
                                                  (column, idx) => {
                                                      return (
                                                          <td
                                                              className={[
                                                                  column.id ===
                                                                  "Status"
                                                                      ? "table-status"
                                                                      : "",
                                                                  record[
                                                                      column.id
                                                                  ]
                                                              ].join(" ")}
                                                          >
                                                              {ifDateFormat(
                                                                  record,
                                                                  column.id
                                                              )}
                                                          </td>
                                                      );
                                                  }
                                              )}
                                          </tr>
                                      );
                                  })}
                        </tbody>
                    </table>
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
                }
            `}</style>
        </Aux>
    );
};

const TableHeaderCell = (props) => {
    return (
        <th>
            <div className="table-header-container">
                {props.for}
                <button
                    className={`table-header-button ${
                        props.index === props.selectedIndex
                            ? "table-header-button--selected"
                            : ""
                    }`}
                    id={props.id}
                    onClick={(event) => props.click(event, props.index)}
                ></button>
            </div>
        </th>
    );
};

export default Review;
