import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import firebase, { auth, provider } from './firebase.js';
import OrgDash from './OrgDash.js';
import AccountCreate from './AccountCreate.js';
import { BrowserRouter, Route, Link, hashHistory, Switch } from 'react-router-dom';

class App extends Component 
{

	constructor() 
	{

		super();

		this.state = {
			// name: '',
   //          role: '', // ORG, POI, VOL
   //          quantity: '', // AMOUNT OF MATERIAL TO TRANSPORT
   //          description: '',
   //          location: null,
   			currentItem: '',
   			username: '',
   			items: [],
			user: null
		}

		console.log(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
    }

	handleChange(e) 
	{

		this.setState({
		  [e.target.name]: e.target.value
		});

	}

	logout() 
	{
		auth.signOut()
		.then(() => {

			this.setState({
				user: null
			});
	  
		});
	}

	login() 
	{
		auth.signInWithPopup(provider) 
		  .then((result) => {
			  const user = result.user;

			  this.setState({
				  user
			  });

		  });
	}

    // signup()
    // {

        
    //     var email = document.getElementById('email').value;
    //     var password = document.getElementById('password').value;

    //     auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
    //         var errorCode = error.code;
    //         var errorMessage = error.message;

    //         if (errorCode == 'auth/weak-password') {
    //             alert('Weak password');
    //         } else {
    //             alert(errorMessage);
    //         }

    //         console.log(error);
    //     });
    // }

	handleSubmit(e) 
	{
		e.preventDefault();

		const itemsRef = firebase.database().ref('items');

		const item = {
			title: this.state.quantity,
			user: this.state.name
		}

		itemsRef.push(item);

		this.setState({
			quantity: '',
			name: ''
		});
	}

	componentDidMount() 
	{

		auth.onAuthStateChanged((user) => {
			if (user) 
			{
	  			this.setState({ user });
			} 
  		});

		const itemsRef = firebase.database().ref('items');

		itemsRef.on('value', (snapshot) => {

			let items = snapshot.val();
			let newState = [];

			for (let item in items) {
				newState.push({
					id: item,
					title: items[item].title,
					user: items[item].user
				});
			}

			this.setState({
				items: newState
			});

		});
	}

	removeItem(itemId) 
	{
		const itemRef = firebase.database().ref(`/items/${itemId}`);
		itemRef.remove();
	}

	render() 
	{
		return (

			<div className='app'>

				<div id="main">

					<header>

						<div className="wrapper">

							<h1>SwampHacks</h1>

								{ this.state.user
									? <button onClick={this.logout}>Log Out</button>                
									: <button onClick={this.login}>Log In</button>              
								}
								 
						</div>

					</header>

					<BrowserRouter>

						<Switch>

							<Route path="/OrgDash" component={OrgDash}></Route>
							<Link to={"/OrgDash"}>Dash</Link>

						</Switch>

					</BrowserRouter>

					<BrowserRouter>

						<Switch>

							<Route path="/AccountCreate" component={AccountCreate}></Route>
							<Link to={"/AccountCreate"}>Sign Up</Link>

						</Switch>

					</BrowserRouter>

					<div className='container'>

						<section className='add-item'>

							<form onSubmit={this.handleSubmit}>

								<input type="text" name="name" placeholder="What's your name?" onChange={this.handleChange} value={this.state.name} />
								<input type="text" name="quantity" placeholder="How much food?" onChange={this.handleChange} value={this.state.quantity} />
								<button>Add Request</button>

	                        </form>
	                        <form>
	                        	<button onClick=<OrgDash />>Dashboard</button>
	                        </form>

	                    </section>

						<section className='display-item'>

							<div className="wrapper">

								<ul>

									{this.state.items.map((item) => {

										return (

											<li key={item.id}>

												<h3>{item.title}</h3>
												<p>brought by: {item.user}

													<button onClick={() => this.removeItem(item.id)}>Remove Item</button>
									
												</p>

											</li>

										)

									})}

								</ul>

							</div>

						</section>

					</div>

				</div>

			</div>

		);

	}

}

export default App;