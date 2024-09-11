/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Badge, Button, Card, ListGroup } from "react-bootstrap";
import VoteContext from "../Context/vote-context";

function MonitorCard ( props )
{
  const context = useContext ( VoteContext );

  function voteDeletionHandler ( voteID )
  {
    context.removeStudentVote ( voteID );
  }

  const votes = context.studentList.filter ( ( student ) => student.Monitor_Name === props.monitorName );

  return (
    <Card style = { { width: '18rem' } }>

      <Card.Body>
        <Card.Title> { props.monitorName } </Card.Title>
        <h5>
          Votes:
          <Badge pill bg = "warning" text = "dark" className = "ms-2"> { votes.length } </Badge>
        </h5>
      </Card.Body>

      <ListGroup className = "list-group-flush">
        {
          votes.map ( ( student ) =>
            (
              <ListGroup.Item key = { student.ID } className = "d-flex justify-content-between align-items-center">
                { student.Student_Name }
                <Button variant = "danger" className = "ms-2" onClick = { () => voteDeletionHandler ( student.ID ) }> Delete Vote </Button>
              </ListGroup.Item>
            )
          )
        }
      </ListGroup>

    </Card>
  )
}

export default MonitorCard;