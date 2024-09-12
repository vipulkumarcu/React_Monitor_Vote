/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import VoteContext from "../Context/vote-context";

function MonitorCard ( { monitor } )
{
  const context = useContext ( VoteContext );

  function voteDeletionHandler ( voteID )
  {
    context.removeStudentVote ( voteID );
  }

  function monitorDeletionHandler ()
  {
    context.removeMonitor ( monitor.ID );
  }

  const votes = context.studentList.filter ( student => student.Monitor_Name === monitor.Monitor_Name );

  return (
    <Card className = "shadow" style = { { width: '18rem' } } >

      <Card.Body>

        <Row>

          <Col>
            <Card.Title> { monitor.Monitor_Name } </Card.Title>
            <h6>
              Votes:
              <Badge pill bg = "info" text = "dark" className = "shadow ms-2" > { votes.length } </Badge>
            </h6>
          </Col>

          <Col>
            <Button variant = "outline-danger" onClick = { monitorDeletionHandler } className = "shadow" > Remove Candidate </Button>
          </Col>

        </Row>

      </Card.Body>

      <ListGroup className = "list-group-flush" >
        {
          votes.map (
            ( student ) => (
              <ListGroup.Item key = { student.ID } className = "shadow d-flex justify-content-between align-items-center" >
                { student.Student_Name }
                <Button variant = "danger" className = "ms-2" onClick = { () => voteDeletionHandler ( student.ID ) } > Delete Vote </Button>
              </ListGroup.Item>
            )
          )
        }
      </ListGroup>

    </Card>
  );
}

export default MonitorCard;