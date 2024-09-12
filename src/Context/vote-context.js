 /* eslint-disable no-unused-vars */
import React from "react";

const VoteContext = React.createContext (
  {
    monitorList: [],
    addMonitor: ( monitor ) => {},
    removeMonitor: ( monitorID ) => {},
    studentList: [],
    addStudentVote: ( vote ) => {},
    removeStudentVote: ( voteID ) => {},
    error: null,
    setError: ( error ) => {}
  }
);

export default VoteContext;