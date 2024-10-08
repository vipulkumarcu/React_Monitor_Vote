/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Alert, Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import VoteContext from "../Context/vote-context";

function AddMonitor ( { toggle } )
{
  const context = useContext ( VoteContext );

  const [ monitorName, setMonitorName ] = useState ("");
  const [ error, setError ] = useState ("");

  function formSubmitHandler ( event )
  {
    event.preventDefault ();

    if ( !monitorName )
    {
      setError ( "Please provide a monitor name." );
      return;
    }

    const monitor = {
      Monitor_Name: monitorName
    };

    context.addMonitor ( monitor );

    setMonitorName ( "" );

    toggle ();
  }

  return (
    <Modal show = { true } onHide = { toggle } >

      <Modal.Header closeButton>
        <Modal.Title> Add Monitor </Modal.Title>
      </Modal.Header>

      <Modal.Body>

        {
          error && 
          <Alert variant = "danger" onClose = { () => setError ( null ) } dismissible >
            { error }
          </Alert>
        }

        <Form className = "m-0 p-3" style = { { textAlign: "center" } } >

          <FloatingLabel controlId = "floatingInput" label = "Candidate's Name" className = "mb-2" >
            <Form.Control type = "text" placeholder = "Enter Candidate's Name" value = { monitorName } onChange = { ( e ) => setMonitorName ( e.target.value ) } />
          </FloatingLabel>

        </Form>

      </Modal.Body>

      <Modal.Footer>
        <Button variant = "success" onClick = { formSubmitHandler } > Add Candidate </Button>
        <Button variant = "secondary" onClick = { toggle } > Close </Button>
      </Modal.Footer>

    </Modal>
  );
}

export default AddMonitor;