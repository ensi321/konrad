import React from 'react';
import axios from 'axios';
import Radium from 'radium';

import Game from './game.jsx'

class Games extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			games: []
		};

	}

	// Call mlb api. Get data and then update current state
	updateContent(p){
		const current_date = (typeof p === 'undefined') ? this.props.current_date : p.current_date;


		var year = String(current_date.getFullYear());
		var month = String(current_date.getMonth() + 1);
		var day = String(current_date.getDate());

		day = day.length > 1 ? day : '0' + day;
		month = month.length > 1 ? month : '0' + month;

		var url = `http://gd2.mlb.com/components/game/mlb/year_${year}/month_${month}/day_${day}/master_scoreboard.json`;


		axios.get(url)
			.then((res) => {
				var games = res.data.data.games.game;
				// If this day has more than one game
				if (Array.isArray(games)){
					this.setState({games: games});
				}
				// Else if this day has only one game or zero game
				else {
					this.setState({games: [games]});
				}

			})
			.catch((err) => {
				console.log(err);
				this.forceUpdate();
			});
	}

	componentDidMount(){
		this.updateContent();
	}

	componentWillReceiveProps(p){
		this.updateContent(p);	
	}


	render(){
		const style = {
			gamesWrapper: {
				marginTop: '5rem'
			}

		};
		const fav_team = this.props.fav_team;

		// Return games that involves the fav team first
		return(
			<div style={style.gamesWrapper}>
				{this.state.games.map((game, i) =>{
					// We take advantage of the lazy evaluation here
					// If there is no game, render it as normal
					if (game === undefined || game.away_team_id == fav_team || game.home_team_id == fav_team
						){
						return (
							<Game game={game} key={i} />	
							);
					}
				})}

				{this.state.games.map((game, i) =>{

					if (game !== undefined && game.away_team_id != fav_team && game.home_team_id != fav_team
						){
						return (
							<Game game={game} key={i} />	
							);
					}
				})}

					
				

			</div>
			)
	}

}

export default Radium(Games);