import React, { Component } from 'react';
import './App.css';
import firebase, { auth, provider } from './firebase.js';
import { BrowserRouter, HashRouter, Route, Link, hashHistory, Switch } from 'react-router-dom';
import withFirebaseAuth from "react-auth-firebase";
import App from './App.js';

class AccountCreate extends React.Component 
{

	state = {
		email: 'test@test.com',
			password: 'password'
	};


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

					<header>

						<div className="wrapper">

							<h1>SwampHacks</h1>
								 
						</div>

					</header>

					<div className='container'>

						<section className='add-item'>

							<form onSubmit={e => e.preventDefault()}>
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
									onClick={() => signUpWithEmail(email, password)}
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