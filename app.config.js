import "dotenv/config";

export default {
    expo: {
        extra: {
            appStatus: process.env.APP_STATUS,
            apiURL: process.env.API_URL
        }
    }
}