import React, { useContext } from "react";
import { UserCxt } from "../../services/userContext";

const ReviewTable = ({
    handleSort,
    selectedHeaderIndex,
    records,
    selectedProject,
    selectProjectClick,
    ifDateFormat
}) => {
    const USER_ROLE_AER = "AER";
    const { userContext } = useContext(UserCxt);
    const isUserAer = (userContext.Role = "AER");
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

    return (
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
                                      record.id === selectedProject?.id
                                          ? "row row--selected"
                                          : isUserAer
                                          ? "row"
                                          : ""
                                  }
                                  ariaRole={isUserAer ? "button" : ""}
                                  onClick={
                                      isUserAer
                                          ? () => selectProjectClick(record)
                                          : null
                                  }
                              >
                                  {industryTableHeaders.map((column, idx) => {
                                      return (
                                          <td
                                              className={[
                                                  column.id === "Status"
                                                      ? "table-status"
                                                      : "",
                                                  record[column.id]
                                              ].join(" ")}
                                          >
                                              {ifDateFormat(record, column.id)}
                                          </td>
                                      );
                                  })}
                              </tr>
                          );
                      })}
            </tbody>
        </table>
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