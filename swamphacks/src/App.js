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
   			username: '',
   			posts: [],
			user: null,
			description: '',
			specialCircumstances: '',
			email: '',
		}

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

	handleSubmit(e) 
	{
		e.preventDefault();

		const itemsRef = firebase.database().ref('posts');

		const post = {
			user: this.state.name,
			description: this.state.description,
			specialNotes: this.state.specialNotes,
			email: this.state.email,
		}

		itemsRef.push(post);

	}

	componentDidMount() 
	{

		auth.onAuthStateChanged((user) => {
			if (user) 
			{
	  			this.setState({ user });
			} 
  		});

		const itemsRef = firebase.database().ref('posts');

		itemsRef.on('value', (snapshot) => {

			let posts = snapshot.val();
			let newState = [];

			for (let post in posts) {
				newState.push({
					id: post,
					description: posts[post].description,
					user: posts[post].user,
					email: posts[post].email,
				});
			}

			this.setState({
				posts: newState
			});

		});
	}

	removeItem(itemId) 
	{
		const itemRef = firebase.database().ref(`/posts/${itemId}`);
		itemRef.remove();
	}

	render() 
	{

		var request = (<section className='add-item'>

							<form onSubmit={this.handleSubmit}>

								<input type="text" name="name" placeholder="What's your name?" onChange={this.handleChange} value={this.state.name} />
								<input type="text" name="email" placeholder="What's your email?" onChange={this.handleChange} value={this.state.email} />
								<input type="text" name="description" placeholder="How much food?" onChange={this.handleChange} value={this.state.description} />
								<input type="text" name="specialNotes" placeholder="Special Instructions?" onChange={this.handleChange} value={this.state.specialNotes} />
								<button>Add Request</button>

	                        </form>

			            </section>)

		return (

			<div className='app'>

				<div id="main">

					<header>

						<div className="wrapper">

							<h1>FOOZOO</h1>

								<BrowserRouter>

									<Switch>

										<Route path="/AccountCreate" component={AccountCreate}></Route>

											<Link to={"/AccountCreate"}>

												{ this.state.user
													? <p></p>                
													: <button>Sign Up</button>              
												}

											</Link>

									</Switch>

								</BrowserRouter>

								{ this.state.user
									? <button onClick={this.logout}>Log Out</button>                
									: <button onClick={this.login}>Log In</button>              
								}
								 
						</div>

					</header>

					<div>

					<BrowserRouter>

						<Switch>

							<Route path="/OrgDash" component={OrgDash}></Route>
							<Link to={"/OrgDash"}><button>Dashboard</button></Link>

						</Switch>

					</BrowserRouter>

					</div>


					<div className='container'>

						{ this.state.user

							? request
			                :<p></p>
			            }

						<section className='display-item'>

							<div className="wrapper">

								<ul>

									{this.state.posts.map((post) => {

										return (

											<li key={post.id}>

												<h3>{post.user}</h3>
												<p>Requested: {post.description}</p>
												<p>Email: {post.email}</p>
												<p>

													<button onClick={() => this.removeItem(post.id)}>Remove Item</button>
									
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