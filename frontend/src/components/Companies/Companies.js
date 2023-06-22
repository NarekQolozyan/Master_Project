import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCompanies } from "../../features/companySlice";
import NavBar from "../navbar/Nav-bar";
import './Companies.css'

const CompanyList = () => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.allCompanies);
  const loading = useSelector((state) => state.company.loading);
  const error = useSelector((state) => state.company.error);
  console.log(companies)
  useEffect(() => {
    dispatch(fetchAllCompanies());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
    <NavBar />
    <h1 className="title">Registered Companies</h1>
    <div className="company-list">
      {companies && companies.length > 0 ? (
        companies.map((company) => (
          <div key={company.id} className="company-item">
            <h2 className="company-name">{company.name}</h2>
            <p className="company-email">Email: {company.email}</p>
            <p className="company-created-at">
              Created At: {company.createdAt.substring(0, 10)}
            </p>
            {/* Display other company data */}
          </div>
        ))
      ) : (
        <div>No companies found.</div>
      )}
    </div>
  </div>
  );
};

export default CompanyList;
