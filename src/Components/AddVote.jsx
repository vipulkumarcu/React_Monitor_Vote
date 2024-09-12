/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import VoteContext from "../Context/vote-context";

function AddVote ( { toggle } )
{
  const context = useContext ( VoteContext );

  const [ studentName, setStudentName ] = useState ( "" );
  const [ monitorName, setMonitorName ] = useState ( "" );

  function formSubmitHandler ( event )
  {
    event.preventDefault ();

    if ( !studentName || !monitorName || monitorName === "Select Monitor" )
    {
      context.setError ( "Please fill in all fields." );
      return;
    }

    const vote = {
      Student_Name: studentName,
      Monitor_Name: monitorName
    };

    context.addStudentVote ( vote );
    setStudentName ( "" );
    setMonitorName ( "" );

    toggle ();
  }

  return (
    <Modal show={true} onHide = { toggle } >

      <Modal.Header closeButton >
        <Modal.Title> Cast Your Vote Here </Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <Form className="m-0 p-3" style={{ textAlign: "center" }}>

          <FloatingLabel controlId = "floatingInput" label = "Student Name" className = "mb-2">
            <Form.Control type = "text" placeholder = "Enter Your Name" value = { studentName } onChange = { ( e ) => setStudentName ( e.target.value ) } />
          </FloatingLabel>

          <Form.Select aria-label = "Select Monitor" className = "mb-2" value = { monitorName } onChange = { ( e ) => setMonitorName ( e.target.value ) } >
            <option> Select Monitor </option>
            {
              context.monitorList.map (
                ( monitor ) => (
                  <option key = { monitor.ID } value = { monitor.Monitor_Name } > { monitor.Monitor_Name } </option>
                )
              )
            }
          </Form.Select>

        </Form>

      </Modal.Body>

      <Modal.Footer>
        <Button variant = "outline-success" onClick = { formSubmitHandler }> Cast </Button>
        <Button variant = "outline-secondary" onClick = { toggle }> Close </Button>
      </Modal.Footer>

    </Modal>
  );
}

export default AddVote;