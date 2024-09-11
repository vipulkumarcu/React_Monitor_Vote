import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useState } from 'react';
import { Badge, Button, Col, Container, Row } from 'react-bootstrap';
import AddVote from './Components/AddVote';
import MonitorCard from './Components/MonitorCard';
import VoteContext from './Context/vote-context';

function App ()
{
  const context = useContext ( VoteContext );

  const [ isVisible, setIsVisible ] = useState ( false );

  function modalToggle ()
  {
    setIsVisible ( prev => !prev )
  }

  return (
    <Container className="my-4">

      <h1 className = "text-center mb-4"> Vote </h1>

      <h3 className = "text-center mb-4"> Total Votes: 
        <Badge pill bg = "warning" text = "dark" className = "ms-2"> { context.studentList.length } </Badge>
      </h3>

      <div className = "text-center mb-4">
        { isVisible ?
          (
            <AddVote toggle={modalToggle} />
          )
          :
          (
            <Button variant = "outline-primary" onClick = { modalToggle }> Add Vote </Button>
          )
        }
      </div>

      <Row className = "g-4">
        {
          context.monitorList.map (
            ( monitor, index ) => (
              <Col md = { 4 } key = { index }>
                <MonitorCard monitorName = { monitor } />
              </Col>
            )
          )
        }
      </Row>

    </Container>
  )
}

export default App