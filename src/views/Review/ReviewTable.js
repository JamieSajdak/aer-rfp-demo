import React, { useContext } from "react";
import { UserCxt } from "../../services/userContext";
import Aux from "../../hoc/Auxillary";
import Spinner from "../../components/Spiner";

const ReviewTable = ({
    handleSort,
    selectedHeaderIndex,
    records,
    selectedProject,
    selectProjectClick,
    ifDateFormat,
    isLoading
}) => {
    const USER_ROLE_AER = "AER";
    const { userContext } = useContext(UserCxt);
    const isUserAer = userContext.Role === "AER";

    const industryTableHeaders = [
        {
            for: "Well ID",
            click: handleSort,
            id: "WellID",
            isForIndustry: true
        },
        {
            for: "User",
            click: handleSort,
            id: "UserID",
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

    return (
        <Aux>
            <div className="twrap">
                <table className="full">
                    <thead>
                        <tr>
                            {industryTableHeaders.map((header, index) => {
                                return (
                                    <TableHeaderCell
                                        key={index}
                                        for={header.for}
                                        id={header.id}
                                        click={handleSort}
                                        index={index}
                                        selectedIndex={selectedHeaderIndex}
                                    />
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td
                                    colSpan={
                                        Object.keys(industryTableHeaders).length
                                    }
                                >
                                    <div className="table-loading">
                                        <Spinner grey />
                                    </div>
                                </td>
                            </tr>
                        ) : records?.error ? null : (
                            records.map((record, index) => {
                                return (
                                    <tr
                                        key={index}
                                        index={index}
                                        className={
                                            record.id === selectedProject?.id
                                                ? "row row--selected"
                                                : isUserAer
                                                ? "row"
                                                : ""
                                        }
                                        role={isUserAer ? "button" : ""}
                                        onClick={
                                            isUserAer
                                                ? () =>
                                                      selectProjectClick(record)
                                                : null
                                        }
                                    >
                                        {industryTableHeaders.map(
                                            (column, idx) => {
                                                return (
                                                    <td
                                                        key={idx}
                                                        className={[
                                                            column.id ===
                                                            "Status"
                                                                ? "table-status"
                                                                : "",
                                                            record[column.id]
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
                            })
                        )}
                    </tbody>
                </table>
            </div>
            <style jsx>{`
                .table-loading {
                    height: 6rem;
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
                @media (max-width: 500px) {
                    .twrap {
                        width: 100%;
                        overflow-x: auto;
                    }
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

export default ReviewTable;
