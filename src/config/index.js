/* eslint-disable */
const config = {
  apiBaseUrl:
    process.env.NODE_ENV === "development"
      ? "https://dummyDevUrl.com"
      : "https://dummyProdUrl.com",              // website url will come here to fetch API
  
};

export default config;
