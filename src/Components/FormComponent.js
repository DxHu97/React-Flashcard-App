import React from "react";
import { useHistory} from "react-router-dom";

function FormComponent({ card, change, submit }) {
  const history = useHistory();
  
  return (
    <div>
      <form onSubmit={submit}>
        <div className="form-group">
          <label>Front</label>
          <textarea
            id = "front"
            name = "front"
            type="text"
            onChange={change}
            value={card.front}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Back</label>
          <textarea
            id = "back"
            name = "back"
            type="text"
            onChange={change}
            value={card.back}
            className="form-control"
          />
        </div>
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={() => history.goBack()}
        >
          {card.id ? "Cancel" : "Done"}
        </button>
        <button type="submit" className="btn btn-primary mx-1">
          {card.id ? "Submit" : "Save"}
        </button>
      </form>
    </div>
  );
}

export default FormComponent