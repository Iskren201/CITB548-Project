import React, { useEffect } from "react";

const LogisticCompany = () => {
  useEffect(() => {
    console.log("LogisticCompany component is mounted");
    return () => {
      console.log("LogisticCompany component is unmounted");
    };
  }, []);
  return <div>LogisticCompanyEmplooye</div>;
};

export default LogisticCompany;
