import React from 'react';
import axios from 'axios';
import Radium from 'radium';

import Game from './game.jsx'

/*
	Games: Get data of games given the date. Sort the games based on fav_team. And render 
		Game component for each game in the retrieved data
	Parent component: App
	Child component: Game

*/

class Games extends React.Component {

	constructor(props) {
		super(props);
		/*
			games: A list of games that are retrieved by requesting to gd2.mlb. Then
				a Game component is rendered for each game in games.
		*/
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

	// Given games and fav_team, sort games such that games that involves
	// fav_team will be placed at the beginning of the list
	sortGames(games, fav_team){
		// Return if there is no game in games
		if (games[0] === undefined){
			return games;
		}

		// List of games that involve fav_team
		var fav_team_game = [];
		games.forEach((game) => {
			if (game.away_team_id == fav_team || game.home_team_id == fav_team){
				fav_team_game.push(game);
			}
		});

		// Get the rest of the games
		games = games.filter((game) => {
			return (game.away_team_id != fav_team && game.home_team_id != fav_team)
		});

		// Concat them together
		return fav_team_game.concat(games);

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
				marginTop: '2rem'
			}

		};
		const fav_team = this.props.fav_team;
		var games = this.state.games;

		// We want to sort the games such that games with fav_team
		// will be at the beginning of the list
		games = this.sortGames(games, fav_team);

		// Return games that involves the fav team first
		return(
			<div style={style.gamesWrapper}>
				{games.map((game, i) =>{
					return (
						<Game game={game} key={i} />	
						);

				})}
			</div>
			)
	}

}

export default Radium(Games);