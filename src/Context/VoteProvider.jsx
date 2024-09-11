/* eslint-disable react/prop-types */
import { useState } from "react";
import VoteContext from "./vote-context";

function VoteProvider ( props )
{
  const monitorList = [ "Karan", "Tushar", "Abhinav" ];
  const [ studentList, setStudentList ] = useState ( [] );

  function addStudentVote ( vote )
  {
    setStudentList ( ( prevList ) => ( [ ...prevList, vote ] ) );
  }

  function removeStudentVote ( voteID )
  {
    setStudentList ( ( prevList ) => prevList.filter ( ( vote ) => vote.ID !== voteID ) );
  }

  const contextValue  = {
    monitorList,
    studentList,
    addStudentVote,
    removeStudentVote,
  };

  return (
    <VoteContext.Provider value = { contextValue  }>
      { props.children }
    </VoteContext.Provider>
  )
}

export default VoteProvider;