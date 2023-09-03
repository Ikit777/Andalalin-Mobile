module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      eas: {
        projectId: "2b044a40-5746-4ede-8008-ca66914cc9c6",
      },
      appStatus: process.env.APP_STATUS,
      apiURL: process.env.API_URL,
    },
  };
};
