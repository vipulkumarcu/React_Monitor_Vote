/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import VoteContext from "./vote-context";

function VoteProvider ( props )
{
  const [ monitorList, setMonitorList ] = useState ( [] );
  const [ studentList, setStudentList ] = useState ( [] );
  const [ error, setError ] = useState ( null );

  useEffect (
    () => {
      fetchData ();
    }, []
  );

  // Function to fetch data from Firebase and update local state
  async function fetchData ()
  {
    try
    {
      const monitorsResponse = await fetch ( `https://monitor-voting-default-rtdb.firebaseio.com/monitor-list.json` );

      const studentsResponse = await fetch ( `https://monitor-voting-default-rtdb.firebaseio.com/students-votes.json` );

      if ( !monitorsResponse.ok || !studentsResponse.ok )
      {
        throw new Error ( "Failed to fetch data" );
      }

      const monitorsData = await monitorsResponse.json();
      const studentsData = await studentsResponse.json();

      const loadedMonitors = [];
      for ( const key in monitorsData )
      {
        loadedMonitors.push ( { ID: key, Monitor_Name: monitorsData[key].Monitor_Name } );
      }

      const loadedStudents = [];
      for ( const key in studentsData )
      {
        loadedStudents.push ( { ID: key, ...studentsData[key] } );
      }

      setMonitorList ( loadedMonitors );
      setStudentList ( loadedStudents );
    }
    
    catch ( error )
    {
      setError ( error.message );
    }
  }

  // Function to add a Student's vote in the database
  async function addStudentVote ( vote )
  {
    try
    {
      const response = await fetch ( `https://monitor-voting-default-rtdb.firebaseio.com/students-votes.json`,
        {
          method: "POST",
          body: JSON.stringify ( vote ),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if ( !response.ok )
      {
        throw new Error ( "Failed to add vote" );
      }

      const data = await response.json();
      setStudentList ( ( prevList ) => [ ...prevList, { ...vote, ID: data.name } ] );
    }
    
    catch ( error )
    {
      setError ( error.message );
    }
  }

  // Function to remove a Student's vote from the database
  async function removeStudentVote ( voteID )
  {
    try
    {
      await fetch ( `https://monitor-voting-default-rtdb.firebaseio.com/students-votes/${voteID}.json`,
        {
          method: "DELETE"
        }
      );

      setStudentList ( ( prevList ) => prevList.filter ( ( vote ) => vote.ID !== voteID ) );
    }
    
    catch ( error )
    {
      setError ( error.message );
    }
  }

  // Function to add a Monitor to the database
  async function addMonitor ( monitor )
  {
    try
    {
      const response = await fetch ( `https://monitor-voting-default-rtdb.firebaseio.com/monitor-list.json`,
        {
          method: "POST",
          body: JSON.stringify ( monitor ),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if ( !response.ok )
      {
        throw new Error ( "Failed to add monitor" );
      }

      const data = await response.json();
      setMonitorList ( ( prevList ) => [ ...prevList, { ...monitor, ID: data.name } ] );
    }
    
    catch ( error )
    {
      setError ( error.message );
    }
  }

  // Function to remove a Monitor from the database
  async function removeMonitor ( monitorID )
  {
    try
    {
      await fetch ( `https://monitor-voting-default-rtdb.firebaseio.com/monitor-list/${monitorID}.json`,
        {
          method: "DELETE"
        }
      );

      setMonitorList ( ( prevList ) => prevList.filter ( ( monitor ) => monitor.ID !== monitorID ) );
    }
    
    catch ( error )
    {
      setError ( error.message );
    }
  }

  const contextValue = {
    monitorList,
    addMonitor,
    removeMonitor,
    studentList,
    addStudentVote,
    removeStudentVote,
    error,
    setError
  };

  return (
    <VoteContext.Provider value = { contextValue }>
      { props.children }
    </VoteContext.Provider>
  );
}

export default VoteProvider;