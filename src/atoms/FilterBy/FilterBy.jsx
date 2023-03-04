import React from "react";
import "./filterby.scss";

function FilterBy({ content, status = false }) {
  return (
    <div className={!status ? `pill-filter` : `pill-filter active`}>
      {content}
    </div>
  );
}

export default FilterBy;
