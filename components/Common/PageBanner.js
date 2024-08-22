import React from "react";
import Link from "next/link";

const PageBanner = ({
  pageTitle
}) => {
  return (
    <>
      <div className="page-title-area" >
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="page-title-content">
                <h2>{pageTitle}</h2>
                <ul>
                  
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageBanner;
