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
    message: null,
    setMessage: ( error ) => {},
    messageType : null,
    setMessageType: ( type ) => {}
  }
);

export default VoteContext;