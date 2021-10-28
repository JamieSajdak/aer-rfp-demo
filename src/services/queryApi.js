import axios from "axios";
const dayjs = require("dayjs");

const PROXY = "https://afternoon-sierra-79620.herokuapp.com/";
const BASE_URL = PROXY + "https://aerapidemo.azurewebsites.net";

export const authorizeUser = async (userID, password) => {
    const url =
        BASE_URL +
        `/api/Industry/CheckLoginAndGetUserDetails/${userID},${password}`;

    try {
        const user = await axios.get(url);
        const userData = await user.data;
        return userData[0];
    } catch (e) {
        console.log(e);
        return { error: e };
    }
};

export const fetchIndustryRecords = async (userID) => {
    const url = BASE_URL + `/api/Industry/GetRecordsByUserID/${userID}`;
    return fetchRecords(url);
};

export const fetchRecordsByAuthID = async (userID, Role, AuthID) => {
    const url =
        BASE_URL +
        `/api/Industry/GetRecordsByAuthorizationID/${userID},${Role},${AuthID}`;

    return await fetchRecords(url);
};

export const fetchAdminRecords = async () => {
    const url = PROXY + BASE_URL + `/api/Industry/GetRecordsForAERUser`;
    return fetchRecords(url);
};

const fetchRecords = async (url) => {
    try {
        const records = await axios.get(url);
        let data = records.data;
        data = data.map((record) => {
            delete record._rid;
            delete record._etag;
            delete record._self;
            delete record._attachments;
            delete record._ts;
            delete record.LocalFilePath;
            return {
                ...record,
                Risk:
                    record?.Amount > 100
                        ? "High"
                        : record?.Amount > 50
                        ? "Medium"
                        : "Low"
            };
        });
        return data;
    } catch (e) {
        console.log(e);
        return { error: e };
    }
};

export const fetchAuthIdsForUser = async ({ UserID }) => {
    const url = BASE_URL + `/api/Industry/GetAuthorizationByUserID/${UserID}`;
    try {
        const authIds = await axios.get(url);
        return await authIds.data.map((obj) => obj.authorizationID);
    } catch (e) {
        console.log(e);
        return { error: e };
    }
};

export const postNewRecord = async (record, { UserID, Organization }) => {
    const date = new dayjs(record.date);
    const url = BASE_URL + "/api/Industry";
    const newRecord = {
        id: UserID + record.well_id,
        UserID: UserID,
        WellID: record.well_id,
        AuthorizationID: "Auth4",
        IndustryType: record.industry_type,
        SubmittedID: record.SubmittedID + 1,
        SubmittedBy: UserID,
        SubmittedDate: date.format("YYYY-MM-DD"),
        IndustryName: record.industry_name,
        ApprovedID: record.ApprovedID + 1,
        ApprovedBy: null,
        ApprovedDate: "1900-01-01",
        Organization: Organization,
        Amount: record.amount,
        Status: "Submitted",
        FileName: null,
        LocalFilePath: null
    };

    try {
        const post = await axios.post(url, newRecord);
        return post;
    } catch (e) {
        return { error: "Could post record" };
    }
};

export const putRecord = async (record, decision, userID) => {
    const url = BASE_URL + "/api/Industry";

    const updatedRecord = {
        ...record,
        Status: decision,
        ApprovedDate: new dayjs().format("YYYY-MM-DD"),
        ApprovedBy: userID
    };

    console.log(updatedRecord);

    try {
        const put = await axios.put(url, updatedRecord);
        return put;
    } catch (e) {
        console.log(e);
        return { error: e };
    }
};
