import React from 'react';
import Games from './games.jsx';
import Radium from 'radium';
import Pikaday from 'pikaday';

var INITIAL_DATE = new Date(2017, 2, 5)
// Initial favourite team is blue jay
var INITIAL_FAV_TEAM = '141';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			current_date: INITIAL_DATE,
			fav_team: INITIAL_FAV_TEAM
		}
		this.nextDay = this.nextDay.bind(this);
		this.previousDay = this.previousDay.bind(this);
		this.today = this.today.bind(this);

	}

	// This would advance the current_date to the next day
	nextDay(){
		var new_date = new Date(this.state.current_date.getTime());
		new_date.setDate(new_date.getDate() + 1);
		this.picker.setDate(new_date);
		this.setState({current_date: new_date, fav_team: this.state.fav_team});
	}

	// Decrement current date by 1
	previousDay(){
		var new_date = new Date(this.state.current_date.getTime());
		new_date.setDate(new_date.getDate() - 1);
		this.picker.setDate(new_date);
		this.setState({current_date: new_date, fav_team: this.state.fav_team});
	}

	// Set current date to today

	today(){
		var new_date = new Date();
		this.picker.setDate(new_date);
		this.setState({current_date: new_date, fav_team: this.state.fav_team});
	}

	componentDidMount(){
		// Populate the pikaday for date picker
		var picker = new Pikaday({
			field: this.refs.datepicker,
			defaultDate: this.state.current_date,
			setDefaultDate: true,
			position: 'bottom right',
	        onSelect: (date) => {
	 			this.setState({current_date: date, fav_team: this.state.fav_team});       	

	        }
		});
		this.picker = picker;
	}


	render() {
		const style = {
			body: {
				"fontSize": "1.5rem",
				"lineHeight": "1.5",
				"fontFamily": '"proxima-nova","Proxima Nova","Helvetica Neue",Helvetica,Arial,sans-serif',
				"color": '#3E4956',
				position: 'relative'
			},
			appHeader: {
				position: 'relative',
				width: '100%',
				margin: 'auto',
				marginTop: '2.2rem',
				textAlign: 'center'
			},
			currentDate: {
				display: 'inline-block',
				color: '#3498DB',
				width: '50%',
				marginLeft: '1rem',
				marginRight: '1rem',
				fontSize: '2.2rem',
				textAlign: 'center',
				

				'@media (min-width: 484px)':{
					whiteSpace: 'nowrap'
				},

				'@media (min-width: 940px)':{
					width: '310px',
					marginLeft: '2.2rem',
					marginRight: '2.2rem',
					':hover': {
						color: '#ff8000'
					}
				}
			},
			dayButton: {
				textDecoration: 'none',
				display: 'inline-block',
				padding: '8px 20px',
				borderRadius: '50%',
				backgroundColor: '#f1f1f1',
				cursor: 'pointer',
				'@media (min-width: 940px)':{
					':hover': {
						backgroundColor: '#ddd'
					}
				}

			},
			todayButton: {
				display: 'none',
				position: 'absolute',
				margin: 'auto',
				left: '10%',
				top: '0',
				bottom: '0',
				padding: '8px 20px',
				cursor: 'pointer',

				color: '#3498D8',
				background: 'transparent',
				border: '2px solid #3498DB',
				borderRadius: '60px',
				'@media (min-width: 940px)':{
					'display': 'inline-block'
				}

			}


		};
		return (
			<div style={style.body}>
				<div className="appHeader" style={style.appHeader}>
					<button onClick={this.today}  key="today" style={style.todayButton}> Today </button>
					<a onClick={this.previousDay} style={[style.dayButton, style.previousButton]} key="previous"> &#8249; </a>
					<div style={style.currentDate} ref="datepicker">
						{this.state.current_date.toDateString()}
					</div>
					<a onClick={this.nextDay} style={[style.dayButton, style.nextButton]} key="next"> &#8250; </a>
				</div>
				<Games current_date={this.state.current_date} fav_team={this.state.fav_team} />
			</div>
		);
	}
}

export default Radium(App);