export const validateLogin = (input) => {
    let errors = {};
    if (!input.username) {
        errors.username = "- Username required";
    }
    if (!input.password || input.password.length < 4) {
        errors.password = "- minimum 8 characters";
    }
    return errors;
};

export const validateRecordSubmit = (input) => {
    let errors = {};

    if (!input.well_id) {
        errors.well_id = "- well ID required";
    }
    if (!/^[A-Z]{2}-[\d]{2}-[\d]{2}$/.test(input.well_id)) {
        errors.well_id = "- enter a valid well ID (AA-00-00)";
    }
    if (!input.authorization_num || input.authorization_num === "") {
        errors.authorization_num = "- authorization number required";
    }
    if (!input.industry_name) {
        errors.industry_name = "- industry name required";
    }
    if (!input.industry_type || input.industry_type === "") {
        errors.industry_type = "- industry type required";
    }
    if (!input.amount) {
        errors.amount = "- amount required";
    }
    if (input.amount >= 100 || input.amount < 0) {
        errors.amount = "- value between 1-100 required";
    }
    if (!input.date) {
        errors.date = "- please enter a date";
    }
    return errors;
};
