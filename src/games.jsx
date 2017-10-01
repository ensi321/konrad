import React from 'react';
import axios from 'axios';

import Game from './game.jsx'

class Games extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			games: []
		};

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
			.then((res) => {
				console.log(res);
				var games = res.data.data.games.game;
				// If this day has more than one game
				if (Array.isArray(games)){
					console.log('state is set1');
					this.setState({games: games});
				}
				// Else if this day has only one game or zero game
				else {
					console.log('state is set2');
					this.setState({games: [games]});
				}
			})
			.catch(function(err){
				console.log(err);
			});
	}

	componentDidMount(){
		this.updateContent();
	}

	componentWillReceiveProps(){
		this.updateContent();	
	}


	render(){
		return(
			<div>
				<ul>
					{this.state.games.map((game, i) =>
						<Game game={game} key={i} />
					)}
				</ul>
			</div>
			)
	}

}

export default Games;