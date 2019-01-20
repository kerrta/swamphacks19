import React from 'react';
import './App.js';

const styles = {
	dashboard: {
		display: 'flex',
		justifyContent: 'center',
		fontFamily: 'Open Sans',
		backgroundColor: 'White',
	},
}

class OrgDash extends React.Component {
	render() {
		return (
			<div className="OrgDash">
				<div style={styles.dashboard}>
					<div class="sidenav">

						<header>

							<div>

								<button>Close</button>

							</div>

						</header>

					</div>

					<div>

					</div>
				
				</div>
			
			</div>
		) 
	}
}

export default OrgDash;