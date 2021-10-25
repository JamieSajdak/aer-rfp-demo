
export const authorizeUser = async (input) => {
    if(input.username === "jam" && input.password === "1234") {
        return {
        auth: "success",
        role: "industry",
        username: "Jamie Sajdak",
        organization: "Adastra"
        }
    } 
    if(input.username === "lena" && input.password === "1234") {
        return {
        auth: "success",
        role: "aer",
        username: "Lena Sajdak",
        organization: "Adastra"
        }
    } 
    return {auth: "false"}
}

export const fetchRecords = async (username) => {
    return [
        {
            username: "jam",
            authorization_num: "A23rl-234kjd",
            industry_type: "C industry",
            amount: 1,
            risk: "medium",
            status: "submitted",
            organization: "adastra",
            well_id: "eir-343-sdf-3",
            date_submitted: "10-22-2021"
        },
        {
            username: "sam",
            authorization_num: "B23rl-234kjd",
            industry_type: "A industry",
            amount: 7,
            risk: "high",
            status: "accepted",
            organization: "Bdastra",
            well_id: "eir-343-sdf-3",
            date_submitted: "10-22-2021"
        },
        {
            username: "adam",
            authorization_num: "C23rl-234kjd",
            industry_type: "B industry",
            amount: 2,
            risk: "low",
            status: "denied",
            organization: "Cdastra",
            well_id: "eir-343-sdf-3",
            date_submitted: "10-22-2021"
        }
    ]
}