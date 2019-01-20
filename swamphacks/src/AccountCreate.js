import React, { Component } from 'react';
import './App.css';
import firebase, { auth, provider } from './firebase.js';
import { BrowserRouter, HashRouter, Route, Link, hashHistory, Switch } from 'react-router-dom';
import withFirebaseAuth from "react-auth-firebase";
import App from './App.js';

class AccountCreate extends React.Component 
{

	constructor()
	{
		super();

		this.state = {
		    email: 'test@test.com',
			password: 'password',
			name: 'name',
			location: 'location',
			phoneNumber: 'phone number',
			type: 'type'
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}
	


	handleInputChange(event)
	{
		 this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit(event)
	{
		 event.preventDefault();
		 const { email, password } = this.state;
	firebase
			 .auth()
			 .createUserWithEmailAndPassword(email, password)
			 .then((user) => {
				 this.props.history.push('/');
			 })
			 .catch((error) => {
				 this.setState({ error: error });
			 });

			 const user = {
				 email: this.state.email,
				 password: this.state.password,
				 name: this.state.name,
				 location: this.state.location,
				 phoneNumber: this.state.phoneNumber,
				 type: this.state.type
			 }

	firebase.database()
			.ref('users')
			.orderByChild("email")
			.equalTo(user.email)
			.once("value", snapshot => {
				const userData = snapshot.val();

				if(!userData)
				{
					const userRef = firebase.database().ref('users');

					 userRef.push(user);

					 this.setState({
						 email: '',
						 password: '',
						 name: '',
						 location: '',
						 phoneNumber: '',
						 type: ''
					});
				}

		 	});
		 
	 };

	render() 
	{
		const { signInWithEmail,
				signUpWithEmail,
				signInWithGoogle,
				signInWithFacebook,
				signInWithGithub,
				signInWithTwitter,
				googleAccessToken,
				facebookAccessToken,
				githubAccessToken,
				twitterAccessToken,
				twitterSecret,
				user,
				error,
				signOutsignUpWithEmail } = this.state;

		const { email, password } = this.state;
		
		return (
			<div className='app'>

				<div id="main">

					<div className='containerSignUp'>

						<section className='add-item'>

							<form onSubmit={this.handleSubmit}>
								<input
									type="text"
									placeholder="Email"
									onChange={e =>
										this.setState({
											email: e.target.value
										})
									}
									value={email}
								/>{" "}
								<br />
								<input
									type="password"
									placeholder="Password"
									onChange={e => this.setState({ password: e.target.value })}
									value={password}
								/>{" "}
								<br />
								<button
									type="submit"
									onClick={() => firebase.auth().createUserWithEmailAndPassword(email, password)}
								>
									SignUp
								</button>
							</form>

						</section>

					</div>

				</div>

			</div>

		)
	}
}

const authConfig = {
	email: {
		verifyOnSignup: false,
		saveUserInDatabase: true
	},
	google: {
		// scopes: ["admin.datatransfer", "contacts.readonly"], // optional
		// customParams: {
		//   login_hint: "user@example.com"
		// },
		// redirect: true, // default is popup: true, redirect: true,
		returnAccessToken: true,
		// scopes: [], // array
		saveUserInDatabase: true
	},
	facebook: {
		// scopes: ["admin.datatransfer", "contacts.readonly"], // optional
		// customParams: {
		//   login_hint: "user@example.com"
		// },
		redirect: true, // default is popup: true, redirect: true,
		returnAccessToken: true,
		saveUserInDatabase: true
	},
	github: {
		// redirect: true,
		returnAccessToken: true,
		saveUserInDatabase: true
	},

	twitter: {
		// redirect: true,
		returnAccessToken: true,
		returnSecret: true,
		saveUserInDatabase: true
	}
};

export default withFirebaseAuth(AccountCreate, firebase, authConfig);