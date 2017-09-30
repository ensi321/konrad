import React from 'react';
import axios from 'axios';

class Games extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			games: []
		}

	}

	updateContent(){
		var current_date = this.props.current_date;
		var year = String(current_date.getFullYear());
		var month = String(current_date.getMonth() + 1);
		var day = String(current_date.getDate());

		day = day.length > 1 ? day : '0' + day;
		month = month.length > 1 ? month : '0' + month;

		var url = `http://gd2.mlb.com/components/game/mlb/year_${year}/month_${month}/day_${day}/master_scoreboard.json`;



		axios.get(url)
			.then(function(res){
				var games = res.data.data.games.game;
				// If this day has more than one game
				if (Array.isArray(games)){
					this.setState({games: {games}});
				}
				// Else if this day has only one game
				else {
					this.setState({games: [{games}]});
				}
			})
			.catch(function(err){
				console.log(err);
			});
	}

	componentDidMount(){
		this.updateContent();
	}

	componentDidUpdate(){
		this.updateContent();
	}

	render(){
		return(
			<div>
				{console.log(this.state)}
			</div>
			)
	}

}

export default Games;