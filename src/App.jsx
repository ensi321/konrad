import React from 'react';
import Games from './games.jsx'

var INITIAL_DATE = new Date(2016, 8, 24)

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			current_date: INITIAL_DATE
		}
		this.nextDay = this.nextDay.bind(this);
		this.previousDay = this.previousDay.bind(this);

	}

	// This would advance the current_date to the next day
	nextDay(){
		var new_date = new Date(this.state.current_date.getTime());
		new_date.setDate(new_date.getDate() + 1);
		this.setState({current_date: new_date});
	}

	previousDay(){
		var new_date = new Date(this.state.current_date.getTime());
		new_date.setDate(new_date.getDate() - 1);
		this.setState({current_date: new_date});
	}

	render() {

		return (
		 <div>
		 	<button onClick={this.previousDay}> Previous </button>
		    {this.state.current_date.toDateString()}
		    <button onClick={this.nextDay}> Next </button>
		    <Games current_date={this.state.current_date} />
		 </div>
		);
	}
}

export default App;