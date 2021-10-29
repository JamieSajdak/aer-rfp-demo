import React from "react";
import Aux from "../../hoc/Auxillary";

const ProjectDetails = ({ selectedProject, ifDateFormat, handleSubmit }) => {
    return (
        <Aux>
            <div className="space">
                {selectedProject ? (
                    <div className="selected-project shadow">
                        <div className="selected-project-header space">
                            <h2>Project Details</h2>
                            {selectedProject?.Status === "Submitted" ? (
                                <Aux>
                                    <button
                                        className="button button--sm bg--secondary"
                                        onClick={() => handleSubmit("Approved")}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="button button--sm bg--danger"
                                        onClick={() => handleSubmit("Denied")}
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
                                            {ifDateFormat(selectedProject, key)}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : null}
            </div>
            <style jsx>{`
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
            `}</style>
        </Aux>
    );
};

export default ProjectDetails;
