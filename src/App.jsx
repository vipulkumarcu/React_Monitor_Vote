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
  const [ isVisible, setIsVisible ] = useState ( false );
  const [ addMonitor, setAddMonitor ] = useState ( false );

  function modalToggle ()
  {
    setIsVisible ( prev => !prev );
  }

  function monitorToggle ()
  {
    setAddMonitor ( prev => !prev );
  }

  return (
    <Container className = "m-6 p-3">

      {
        context.error && 
        <Alert variant = "danger" onClose = { () => context.setError ( null ) } dismissible >
          { context.error }
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
            ( <AddMonitor toggle = { monitorToggle } /> ) :
            ( <Button variant = "outline-dark" className = "shadow" onClick = { monitorToggle } > Add Monitor </Button> )
          }
        </Col>
      </Row>

      <div className = "text-center mb-4" >
        {
          isVisible ?
          ( <AddVote toggle = { modalToggle } /> ) :
          ( <Button variant = "outline-primary" className = "shadow" onClick = { modalToggle } > Add Vote </Button> )
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