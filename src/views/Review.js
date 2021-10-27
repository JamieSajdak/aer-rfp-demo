import React, { useContext, useEffect, useState } from "react";
import Aux from "../hoc/Auxillary";
import { UserCxt } from "../services/userContext";
import {
    fetchAdminRecords,
    fetchIndustryRecords,
    fetchRecordsByWellID,
} from "../services/queryApi";

import SelectField from "../components/SelectField";

const Review = (props) => {
    const USER_ROLE_AER = "AER";

    const { userContext } = useContext(UserCxt);
    const [records, setRecords] = useState([]);
    const [isAsc, setIsAsc] = useState(true);
    const [selectedHeaderIndex, setSelectedHeaderIndex] = useState();
    const [selectedProject, setSelectedProject] = useState();
    const [input, setInput] = useState("");

    const selecOptionsTemp = ["1", "2", "3", "4"];

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        if (userContext?.Role === USER_ROLE_AER) {
            const data = await fetchAdminRecords();
            console.log(data);
            setRecords(await data);
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

    const handleSubmit = (decision) => {
        alert("Project is: " + decision);
        setSelectedProject();
    };

    const handleSearchByWellID = async (event) => {
        const value = event.target.value;
        console.log(value);
        setInput(value);
        const recordsByWellID = await fetchRecordsByWellID(
            userContext?.UserID,
            value
        );
        setRecords(await recordsByWellID);
    };

    const industryTableHeaders = [
        {
            for: "Organization",
            click: handleSort,
            id: "Organization",
            isForIndustry: true,
        },
        {
            for: "Auth Number",
            click: handleSort,
            id: "AuthorizationID",
            isForIndustry: true,
        },
        {
            for: "Industry Type",
            click: handleSort,
            id: "IndustryType",
            isForIndustry: true,
        },
        { for: "Amt", click: handleSort, id: "Amount", isForIndustry: false },
        { for: "Risk", click: handleSort, id: "risk", isForIndustry: true },
        {
            for: "Date",
            click: handleSort,
            id: "SubmittedDate",
            isForIndustry: false,
        },
        {
            for: "Status",
            click: handleSort,
            id: "Status ",
            isForIndustry: true,
        },
    ];

    return (
        <Aux>
            <div className="container">
                <h1>{userContext?.Role} Review</h1>
                <div className="flow">
                    <div className="divider" />
                    <SelectField
                        for="authorization_num"
                        label="Authorization Number"
                        input={{ authorization_num: input }}
                        errors={{}}
                        change={handleSearchByWellID}
                        options={selecOptionsTemp}
                        placeholder="Select Authoirization number"
                    />
                    <button onClick={fetchRecords}>Cancel</button>
                    <table>
                        <thead>
                            {industryTableHeaders
                                .filter((columns) => {
                                    return userContext?.Role === USER_ROLE_AER
                                        ? true
                                        : columns.isForIndustry;
                                })
                                .map((header, index) => {
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
                                                      : userContext?.Role ===
                                                        USER_ROLE_AER
                                                      ? "row"
                                                      : ""
                                              }
                                              ariaRole={
                                                  userContext?.Role ===
                                                  USER_ROLE_AER
                                                      ? "button"
                                                      : ""
                                              }
                                              onClick={
                                                  userContext?.Role ===
                                                  USER_ROLE_AER
                                                      ? () => {
                                                            if (
                                                                selectedProject?.id ===
                                                                record.id
                                                            ) {
                                                                setSelectedProject();
                                                            } else {
                                                                setSelectedProject(
                                                                    record
                                                                );
                                                            }
                                                        }
                                                      : null
                                              }
                                          >
                                              {industryTableHeaders
                                                  .filter((column) =>
                                                      userContext?.Role ===
                                                      USER_ROLE_AER
                                                          ? true
                                                          : column.isForIndustry
                                                  )
                                                  .map((column, i) => {
                                                      if (
                                                          column.id === "Status"
                                                      ) {
                                                          return (
                                                              <td key={i}>
                                                                  <div
                                                                      className={
                                                                          "table-status table-status--" +
                                                                          record.Status
                                                                      }
                                                                  >
                                                                      {record.Status +
                                                                          "hmm"}
                                                                  </div>
                                                              </td>
                                                          );
                                                      }
                                                      return (
                                                          <td>
                                                              {
                                                                  record[
                                                                      column.id
                                                                  ]
                                                              }
                                                          </td>
                                                      );
                                                  })}
                                          </tr>
                                      );
                                  })}
                        </tbody>
                    </table>
                    <div className="space">
                        {selectedProject ? (
                            <div className="selected-project shadow">
                                <h2>Project Details</h2>
                                <div className="selected-project-details">
                                    {Object.keys(selectedProject).map((key) => {
                                        return (
                                            <div>
                                                <p>
                                                    <span className="h3">
                                                        {key.replace("_", " ")}:{" "}
                                                    </span>
                                                    {selectedProject[key]}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : null}
                        {selectedProject?.Status === "Submitted" ? (
                            <Aux>
                                <button
                                    className="button bg--secondary"
                                    onClick={() => handleSubmit("Approved")}
                                >
                                    Approve
                                </button>
                                <button
                                    className="button bg--danger"
                                    onClick={() => handleSubmit("Denied")}
                                >
                                    Deny
                                </button>
                            </Aux>
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
                    max-width: 35rem;
                    background-color: white;
                    margin-right: auto;
                }
                .selected-project h2 {
                    padding: 0.5rem 1rem;
                    background-color: var(--cl-primary);
                    color: white;
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
                    text-align: center;
                    border-radius: 1000px;
                    font-weight: 700;
                    width: 100%;
                    height: 100%;
                }
                .table-status--submitted {
                    color: var(--cl-submitted);
                }
                .table-status--denied {
                    color: var(--cl-danger);
                }
                .table-status--accepted {
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
