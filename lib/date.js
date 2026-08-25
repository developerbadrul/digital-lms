export const formatMyDate = date => {
    if (!date) return "";

    try {
        const dateObj = date instanceof Date ? date : new Date(date);

        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
        };

        return new Intl.DateTimeFormat("en-BD", options).format(dateObj);
    } catch (error) {
        console.error("Error formatting date:", error);
        return "";
    }
}