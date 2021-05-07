import React, { useState,useEffect,useReducer,useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const emailValidator = (state,action) =>{
  if(action.type == 'USER_INPUT'){
    return {value:action.val, isValid:action.val.includes('@')};
  }
  if(action.type == 'INPUT_BLUR'){
    return {value:state.value, isValid:state.value.includes('@')}
  }
  return {value:'',isValid:false}
}

const passwordValidator = (state,action) =>{
  if(action.type == 'USER_INPUT'){
    return {value:action.val, isValid:action.val.trim().length > 6};
  }
  if(action.type == 'INPUT_BLUR'){
    return {value:state.value, isValid:state.value.trim().length > 6}
  }
  return {value:'',isValid:false}
}

const Login = (props) => {
  const ctx = useContext(AuthContext)

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailValidator, {value:'',isValid:null});
  const [passwordState, dispatchPassword] = useReducer(passwordValidator, {value:'',isValid:null});

  const { isValid:EmailValid } = emailState;
  const { isValid:passwordValid } = passwordState;
  
  useEffect(() => {
   const timer =  setTimeout(()=>{
      console.log('Checking form Validaty!');
      setFormIsValid(
        EmailValid && passwordValid
      );
    },500);

    return ()=>{
      console.log('cleanup');
      clearTimeout(timer);
    }
    
  }, [EmailValid,passwordValid])

  const emailChangeHandler = (event) => {
        dispatchEmail({type:'USER_INPUT',val:event.target.value})

      //   setFormIsValid(
      //   event.target.value.includes('@') && passwordState.isValid
      // );
    // setEnteredEmail(event.target.value);  
  };

  const passwordChangeHandler = (event) => {

    dispatchPassword({type:'USER_INPUT',val:event.target.value})
    
    // setEnteredPassword(event.target.value);

    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR'})
    // setEmailIsValid(emailState.isValid);
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'INPUT_BLUR'})
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
