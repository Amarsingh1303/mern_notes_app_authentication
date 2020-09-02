import React from "react";
import { Card } from "react-bootstrap";
function NoteShow(props) {
  const { index, notid, notestitle, notesdesc } = props;
  const handleDel = (id) => {
    const { datacallback } = props;
    datacallback(id);
  };
  return (
    <div className="mx-2 my-2">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>
            {index + 1}. {notestitle}
          </Card.Title>
          <Card.Text>{notesdesc}</Card.Text>
          <button className="btn btn-primary" onClick={() => handleDel(notid)}>
            Delete
          </button>
        </Card.Body>
      </Card>
      {
        // onClick={() => handleDel(notid)}
        /* <div>
<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">{notestitle}</h5>
    <p class="card-text">{notesdesc}</p>
    <button class="btn btn-primary">Go somewhere</button>
  </div>
</div>
</div> */
      }
    </div>
  );
}

export default NoteShow;
