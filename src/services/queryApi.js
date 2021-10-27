
BASE_URL = "https://aerapidemo.azurewebsites.net/"

export const authorizeUser = async (userID,password) => {
    const url = BASE_URL + `/api/Industry/CheckLoginAndGetUserDetails/${userID},${password}`
    try {
        const userAuth = await axios.get(url);
        return await userAuth.data;
    } catch(e) {
        console.log(e)
        return {error: "Could not fetch user Auth"}
    }
}

export const fetchIndustryRecords = async (username) => {
    const url = BASE_URL + `/api/Industry/GetRecordsByUserID/${userID}`

    try {
        const industryResults = await axios.get(url);
        return await industryResults.data;
    } catch(e) {
        console.log(e)
        return {error: "Could not fetch Insutry Record results"}
    }
}

export const fetchAdminRecords = async () => {
    const url = BASE_URL + `/api/Industry/GetRecordsForAERUser`

    try {
        const industryResults = await axios.get(url);
        return await industryResults.data;
    } catch(e) {
        console.log(e)
        return {error: "Could not fetch Admin Record results"}
    }
}