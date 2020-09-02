import React from "react";

function ErrorNotice(props) {
  return (
    <div
      className="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      <strong>Holy guacamole!</strong>
      {props.message}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={props.clear}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}

export default ErrorNotice;
