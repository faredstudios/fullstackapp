import React, {Component} from 'react';
import './styles/Homepage.css';

class Homepage extends Component {
	render(){
		return(
		<React.Fragment>
			<div className="newsContainer">
				LATEST NEWS
				<div className="newsRow">
					<div className="newsItem">
						<div className="newsImage">
						</div>
						<label className="newsLabel">Dev Update 1</label>
					</div>
					<div className="newsItem">
						<div className="newsImage">
						</div>
						<label className="newsLabel">Dev Update 2</label>
					</div>
					<div className="newsItem">
						<div className="newsImage">
						</div>
						<label className="newsLabel">Dev Update 3</label>
					</div>
				</div>
			</div>
		</React.Fragment>
		)
	}
}
export default Homepage;