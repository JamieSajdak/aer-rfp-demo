import axios from "axios";

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
        return { error: "Could not fetch user Auth" };
    }
};

export const fetchIndustryRecords = async (userID) => {
    const url = BASE_URL + `/api/Industry/GetRecordsByUserID/${userID}`;
    console.log(url);
    try {
        const industryResults = await axios.get(url);
        const data = await industryResults.data;
        console.log(data);
        return data;
    } catch (e) {
        console.log(e);
        return { error: "Could not fetch Insutry Record results" };
    }
};

export const fetchRecordsByWellID = async (userID, wellID) => {
    const url =
        BASE_URL + `/api/Industry/GetRecordsByWellID/${userID},${wellID}`;
    try {
        const industryResults = await axios.get(url);
        const industryData = await industryResults.data;
        return industryData;
    } catch (e) {
        console.log(e);
        return { error: "Could not fetch WellId Record results" };
    }
};

export const fetchAdminRecords = async () => {
    const url = PROXY + BASE_URL + `/api/Industry/GetRecordsForAERUser`;

    try {
        const industryResults = await axios.get(url);
        return await industryResults.data;
    } catch (e) {
        console.log(e);
        return { error: "Could not fetch Admin Record results" };
    }
};

// export const fetch
