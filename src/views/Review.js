import React, { useContext, useEffect, useState } from "react";
import Aux from '../hoc/Auxillary';
import { UserCxt } from "../services/userContext";
import { fetchRecords } from '../services/queryApi';

const Review = (props) => {
    const { userContext } = useContext(UserCxt);
    const [ records, setRecords ] = useState([]);
    const [ isAsc, setIsAsc ] = useState(true);
    const [ selectedHeaderIndex, setSelectedHeaderIndex ] = useState();
    const [ selectedProject , setSelectedProject]= useState();
    const [ searchString, setSearchString ] = useState("");

    useEffect(() => {
        console.log(userContext)
        async function fetch() {
            const data = await fetchRecords()
            setRecords(data)
        }   
        fetch()
    },[])

    const handleSort = (event,index) => {
        const sortedRecords = [...records].sort((a,b) => {
            if(a[event.target.id] < b[event.target.id]) {
                return isAsc ? -1 : 1
            }
            return isAsc ? 1 : -1
        })
        setRecords(sortedRecords);
        setIsAsc(!isAsc)
        setSelectedHeaderIndex(index)
    }

    const handleSubmit = (decision) => {
        alert("Project is: " + decision)
        setSelectedProject()
    }

    const industryTableHeaders = [
        // {for: "User Name", click: handleSort, id:"username", isForIndustry: false},
        {for: "Organization", click: handleSort, id:"organization", isForIndustry: false},
        {for: "Auth Number", click: handleSort, id:"authorization_num", isForIndustry: true},
        {for: "Industry Type", click: handleSort, id:"industry_type", isForIndustry: true},
        {for: "Amt", click: handleSort, id:"amount", isForIndustry: false},
        {for: "Risk", click: handleSort, id:"risk", isForIndustry: true},
        {for: "Date", click: handleSort, id:"date_submitted", isForIndustry: false},
        {for: "Status", click: handleSort, id:"status", isForIndustry: true}
    ]

    return (
        <Aux>
            <div className="container">
                <h1>{userContext?.role} Review</h1>
                <div className="divider"/>
                <div className="flow">
                    <div className="input">
                        <label for="search" className="input-lable">Search by Authorization Number</label>
                        <input className="input-field search-input"
                            value={searchString}
                            onChange={(event)=> setSearchString(event.target.value)}></input>
                    </div>
                    <table>
                        <thead>
                            {industryTableHeaders.filter(columns => {
                                return userContext?.role === "aer" ? true : columns.isForIndustry
                            }).map((header,index) => {
                                return (
                                <TableHeaderCell 
                                    for={header.for} 
                                    id={header.id}
                                    click={handleSort}
                                    index={index}
                                    selectedIndex={selectedHeaderIndex}
                                />)
                            })}
                        </thead>
                        <tbody>
                            {records.filter(record => {
                                return  record.authorization_num.toLowerCase().includes(searchString.toLowerCase())
                            }).map((record) => {
                                return (
                                    <tr className={record.authorization_num === selectedProject?.authorization_num ? "row row--selected" : 
                                        userContext?.role === 'aer' ? "row" : ""}
                                        ariaRole={userContext?.role === "aer" ? "button": ""}
                                        onClick={userContext?.role === "aer" ? () => {
                                            if(selectedProject?.authorization_num === record.authorization_num) {
                                                setSelectedProject()
                                            } else {
                                                setSelectedProject(record)
                                            }
                                        
                                        } : null}
                                    >
                                        {industryTableHeaders
                                        .filter(column => userContext?.role === "aer" ? true : column.isForIndustry)
                                        .map(column => {
                                            if(column.id === "status") {
                                                return (
                                                <td><div className={"table-status table-status--" + record.status}>
                                                    {record.status}
                                                </div></td>)
                                            }
                                            return <td>{record[column.id]}</td>
                                        })}
                                    </tr> 
                                )
                            })}
                        </tbody>    
                    </table>
                    {
                        selectedProject?.status === "submitted" ? 
                        <div className="submit-buttons-container space">
                            <button className="button button--submit" onClick={() => handleSubmit("Approved")}>Approve</button>
                            <button className="button button--deny" onClick={() => handleSubmit("Denied")}>Deny</button>
                        </div>
                        : null
                    }
                    {
                        selectedProject ?
                        <div className="selected-project shadow">
                            <h2>Project Details</h2>
                            <div className="selected-project-details">
                            {Object.keys(selectedProject).map(key => {
                                return (
                                    <div>
                                        <p><span className="h3">{key}: </span>{selectedProject[key]}</p>
                                    </div>
                                )
                            })}
                            </div>
                        </div> : null
                    }
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
                    max-width: 35rem;
                    padding: 1rem;
                    background-color: white;
                }
                .selected-project-details {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
                    row-gap: 0.2rem;
                }
                .selected-project-details span {
                    color: #0a5688;
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
                    height:100%;
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
    )
}

const TableHeaderCell = (props) => {
    return (
        <th>
            <div className="table-header-container" >
                {props.for}
                <button className={`table-header-button ${props.index === props.selectedIndex ? "table-header-button--selected" : ""}`} id={props.id} onClick={(event) => props.click(event,props.index)}></button>
            </div>
        </th>
    )
}

export default Review