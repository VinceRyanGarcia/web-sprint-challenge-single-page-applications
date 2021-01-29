import React from "react";

export default function FriendForm(props) {
  const { values, submit, change, disabled, errors } = props;

  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };

  const onChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === "checkbox" ? checked : value;
    change(name, valueToUse);
  };

  return (
    <form className="form container" onSubmit={onSubmit}>
      <div className="form-group submit">

        <button disabled={disabled} id="subBtn">ADD TO ORDER</button>

        <div className="errors">
          <div>{errors.username}</div>
          <div>{errors.size}</div>
        </div>
      </div>

      <div className="form-group inputs">
       <br></br><br></br>
        <label>
         Name
          <input
            value={values.username}
            onChange={onChange}
            name="username"
            type="text"
          />
        </label>

        <label>
          Size
          <select onChange={onChange} value={values.size} name="size">
            <option value="">- Select a size -</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="extralarge">Extra Large</option>
          </select>
        </label>
      </div>

      <div className="form-group checkboxes">
        <h4>Toppings</h4>
        <label>
          cheese
          <input type="checkbox" name="cheese" checked={values.cheese} onChange={onChange}/>
        </label>
        <label>
          pepperoni
          <input type="checkbox" name="pepperoni" checked={values.pepperoni} onChange={onChange}/>
        </label>
        <label>
          sausage
          <input type="checkbox" name="sausage" checked={values.sausage} onChange={onChange}/>
        </label>
        <label>
          mushroom
          <input type="checkbox" name="mushroom" checked={values.mushroom} onChange={onChange}/>
        </label>
      </div>
<br></br>
  <div>
    <h4>Special Instructions</h4>
        <label>
          <input value={values.instructions} onChange={onChange} name="instructions" type="text"/>
        </label>
  </div>

    </form>
  );
}
