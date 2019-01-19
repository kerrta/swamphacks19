import React from 'react';
import './App.js';

const styles = {
	dashboard: {
		display: 'flex',
		justifyContent: 'center',
		fontFamily: 'Open Sans',
		backgroundColor: 'White',
		fontSize: 150,

	}
}

class OrgDash extends React.Component {
	render() {
		return (
			<div className="OrgDash">
				<div style={styles.dashboard}>
					<h1>Hello</h1>
				</div>
			</div>
		) 
	}
}

export default OrgDash;