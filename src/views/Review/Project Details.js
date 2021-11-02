import React, { useContext } from "react";
import Aux from "../../hoc/Auxillary";
import LoadingButton from "../../components/LoadingButton";
import { UserCxt } from "../../services/userContext";
const dayjs = require("dayjs");

const ProjectDetails = ({
    selectedProject,
    ifDateFormat,
    handleSubmit,
    isLoading,
    setSelectedProject
}) => {
    const { userContext } = useContext(UserCxt);
    const isUserAer = userContext.Role === "AER";

    const detailsToShow = [
        "AuthorizationID",
        "SubmittedDate",
        "ApprovedDate",
        "Status",
        "UserID",
        "IndustryType",
        "IndustryName",
        "Organization",
        "FileName",
        "WellID",
        "SubmittedBy",
        "ApprovedBy",
        "Amount",
        "Risk"
    ];
    return (
        <Aux>
            {selectedProject ? <div className="background" /> : null}
            {selectedProject ? (
                <div className="selected-project shadow">
                    <div className="selected-project-header space">
                        <h2>Project Details</h2>
                        {selectedProject?.Status === "Submitted" &&
                        isUserAer ? (
                            <Aux>
                                <LoadingButton
                                    isLoading={isLoading}
                                    click={() => handleSubmit("Approved")}
                                    color="green"
                                    size="button--sm"
                                >
                                    Approve
                                </LoadingButton>
                                <LoadingButton
                                    isLoading={isLoading}
                                    click={() => handleSubmit("Denied")}
                                    color="red"
                                    size="button--sm"
                                >
                                    Deny
                                </LoadingButton>
                            </Aux>
                        ) : null}
                        <button
                            aria-label="close popup"
                            className="close"
                            onClick={() => setSelectedProject()}
                        >
                            <img src="/images/cross.svg" alt="close"></img>
                        </button>
                    </div>
                    <div className="selected-project-details">
                        {Object.keys(selectedProject)
                            .filter((record) => {
                                // if (record === "ApprovedDate") {
                                //     if (
                                //         dayjs(selectedProject[record]).isBefore(
                                //             "2000-01-01"
                                //         )
                                //     ) {
                                //         return false;
                                //     }
                                // }
                                return detailsToShow.includes(record);
                            })
                            .map((key) => {
                                return (
                                    <div>
                                        <p>
                                            <span className="h3">
                                                {key}
                                                {":  "}
                                            </span>
                                            {ifDateFormat(selectedProject, key)}
                                        </p>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            ) : null}

            <style jsx>{`
                .close {
                    padding: 0;
                    border: 1px solid #bbb;
                    width: 2rem;
                    height: 2rem;
                }
                .close:hover {
                    filter: brightness(1.3);
                }
                .background {
                    z-index: 10;
                    height: 100vh;
                    background: radial-gradient(
                        rgba(0, 0, 0, 0.1),
                        rgba(0, 0, 0, 0.8)
                    );
                    position: fixed;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    left: 0;
                    cursor: not-allowed;
                }
                .selected-project {
                    z-index: 30;
                    width: 90vw;
                    max-width: 50em;
                    position: fixed;
                    top: 50%;
                    right: 50%;
                    transform: translate(50%, -50%);
                    background-color: white;
                    margin: auto;
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
                        minmax(20rem, 1fr)
                    );
                    row-gap: 0.2rem;
                }
                .selected-project-details span {
                    color: var(--cl-primary);
                }
            `}</style>
        </Aux>
    );
};

export default ProjectDetails;
