import React from "react";
import { useParams } from "react-router-dom";

function Teacher_time_table(props) {
  const { email } = useParams();

  return <div>{email}</div>;
}

export default Teacher_time_table;
