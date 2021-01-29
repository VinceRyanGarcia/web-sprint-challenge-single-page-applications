import React, { useState, useEffect } from "react";
import Pizza from "./component/Pizza";
import FriendForm from "./component/FriendForm";
import * as yup from "yup";
import schema from "./validation/formSchema";
import axios from "axios";
import { Link, Switch, Route } from 'react-router-dom';

const initialFormValues = {
  username: "",
  size:"",
  cheese: false,
  pepperoni: false,
  sausage: false,
  mushroom: false,
  instructions: "",

};
const initialFormErrors = {
  username: "",
  size:"",
  instructions: "",


};
const initialFriends = [];
const initialDisabled = true;

export default function App() {
  const [friends, setFriends] = useState(initialFriends); 
  const [formValues, setFormValues] = useState(initialFormValues); 
  const [formErrors, setFormErrors] = useState(initialFormErrors); 
  const [disabled, setDisabled] = useState(initialDisabled); 

  const postNewFriend = (newFriend) => {
    axios
      .post("https://reqres.in/api/friends", newFriend)
      .then((res) => {
        setFriends([res.data, ...friends]);
        setFormValues(initialFormValues);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const inputChange = ( name, value ) => {
    yup.reach( schema, name)
     .validate( value )
     .then( () => {
       setFormErrors( {
         ...formErrors,
         [ name ]: "",
       } )
     } )
     .catch( err => {
       setFormErrors( {
         ...formErrors,
         [ name ]: err.errors[ 0 ],
       } )
     } )
     setFormValues({
       ...formValues,
       [ name ]: value,
     } )
  }


  

  const formSubmit = () => {
    const newFriend = {
      username: formValues.username.trim(),
      toppings: ["cheese", "pepperoni", "sausage", "mushroom"].filter(
        (toppings) => formValues[toppings] 
      ),
      size: formValues.size,
      instructions: formValues.instructions,
    };
    postNewFriend(newFriend);
  };


  useEffect(() => {

    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    
    <div className="container">
      <div>header thingy</div>
      <h1>Lambda Eats</h1>
      <div>links 
      <Link to ='/'>Home</Link>
      <Link to = '/FriendForm'>Order</Link>
      </div>
      
      <Switch>
        <Route path ={'/FriendForm'}>
      <FriendForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
  

      {friends.map((friend) => {
        return <Pizza key={friend.id} details={friend} />;
      })}
          </Route>
      </Switch>
    </div>
  );
}
