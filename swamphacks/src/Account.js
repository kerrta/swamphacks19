import React, { Component } from 'react';
import './App.css';
import firebase, { auth, provider } from './firebase.js';

class Account extends React.Component
{
	constructor ()
	{
		super();

		this.state = {
			user: null,
			name: '',
			email: '',
			password: '',
			location: null,
			posts: null,
		}

		

	}

	render ()
	{

	}
}