import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useState } from 'react';
import { Alert, Badge, Button, Col, Container, Row } from 'react-bootstrap';
import AddVote from './Components/AddVote';
import MonitorCard from './Components/MonitorCard';
import VoteContext from './Context/vote-context';
import AddMonitor from './Components/AddMonitor';

function App ()
{
  const context = useContext ( VoteContext );

  const [ addVote, setAddVote ] = useState ( false );
  const [ addMonitor, setAddMonitor ] = useState ( false );

  function addVoteModalToggler ()
  {
    setAddVote ( prev => !prev );
  }

  function addMonitorModalToggler ()
  {
    setAddMonitor ( prev => !prev );
  }

  function alertMessageHandler ()
  {
    context.setMessage ( null );
    context.setMessageType ( null );
  }

  return (
    <Container className = "m-6 p-3">

      {
        context.message && 
        <Alert variant = { context.messageType } onClose = { alertMessageHandler } dismissible >
          { context.message }
        </Alert>
      }

      <h1 className = "text-center mb-4" > Vote </h1>

      <Row className = "m-6 p-3" >
        <Col md = { 8 } >
          <h3 className = "text-center mb-4" >Total Votes:
            <Badge pill bg = "warning" text = "dark" className = "shadow ms-2" > { context.studentList.length } </Badge>
          </h3>
        </Col>

        <Col md = { 3 } >
          {
            addMonitor ? 
            ( <AddMonitor toggle = { addMonitorModalToggler } /> ) :
            ( <Button variant = "outline-dark" className = "shadow" onClick = { addMonitorModalToggler } > Add Monitor </Button> )
          }
        </Col>
      </Row>

      <div className = "text-center mb-4" >
        {
          addVote ?
          ( <AddVote toggle = { addVoteModalToggler } /> ) :
          ( <Button variant = "outline-primary" className = "shadow" onClick = { addVoteModalToggler } > Add Vote </Button> )
        }
      </div>

      <Row className = "g-4 m-6 p-3">
        {
          context.monitorList.map (
            ( monitor ) => (
              <Col md = { 4 } key = { monitor.ID } >
                <MonitorCard monitor = { monitor } />
              </Col>
            )
          )
        }
      </Row>

    </Container>
  )
}

export default App;