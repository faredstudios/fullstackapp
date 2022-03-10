import React, {Component} from 'react';

class Homepage extends Component {
	render(){
		return(
		<div>
			<h1>HOME</h1>
			<img src={require('./images/daytoner2.jpg').default} alt=""/>
		</div>
		)
	}
}
export default Homepage;