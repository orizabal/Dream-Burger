import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    componentDidMount () {
        console.log('[Auth.js]: in componentDidMount() line 47.');
        console.log('buildingBurger: ' + this.props.buildingBurger + ', redirectPath: ' + this.props.authRedirectPath);
        console.log(!this.props.buildingBurger && this.props.authRedirectPath !== '/');
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            console.log('[Auth.js]: will set auth redirect path to /');
            this.props.onSetAuthRedirectPath('/');
        }
    }

    checkValidity(value, rules) {
        let isValid = true;

        if(!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        console.log(isValid);
        return isValid;
    };

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };

        this.setState ({
            controls: updatedControls
        });
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return{isSignUp: !prevState.isSignUp};
        })
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        };

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));

        if (this.props.loading) {
            form = <Spinner/>
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        console.log('[Auth,js]: line 143 - !buildingBurger:' + !this.props.buildingBurger + ', authRedirectPath: ' + this.props.authRedirectPath);
        console.log('[Auth.js]: line 144 - this.props.isAuthenticated: ' + this.props.isAuthenticated);
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            console.log('[Auth.js]: line 144: will set auth redirect path to /');
            this.props.onSetAuthRedirectPath('/');
        } else if (!this.props.buildingBurger && this.props.isAuthenticated) {
            console.log('[Auth.js]: line 149: will set auth redirect path to /checkout');
            this.props.onSetAuthRedirectPath('/checkout');
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            console.log(this.props.authRedirectPath);
            console.log(this.props.token);
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">{this.state.isSignUp ? 'Sign Up' : 'Login'}</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Success">Switch to {this.state.isSignUp ? 'Login' : 'Sign Up'}</Button>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token, // Take this out after you're done goofin
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);