/* eslint-disable no-unused-vars */
import React from "react";

const VoteContext = React.createContext (
  {
    monitorList: [],
    studentList: [],
    addStudentVote: ( vote ) => {},
    removeStudentVote: ( voteID ) => {},
  }
);

export default VoteContext;