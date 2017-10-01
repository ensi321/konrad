import React from 'react';
import Radium from 'radium';

class Game extends React.Component {
	render(){
		const style = {
			noGame: {
				display: 'block',
				textAlign: 'center',
				fontSize: '2rem'
			},
			game: {
				borderTop: 'grey solid 1px',
				borderBottom: 'grey solid 1px',
				marginTop: '0.5rem',
				display: 'block',
				'@media (min-width: 812px)':{
					display: 'inline-block',
					width: '48%',
					border: 'grey solid 1px',
					marginLeft: '1%'

				}

			},
			teamLogo: {
				verticalAlign: 'middle'
			},
			teamName: {
				display: 'inline-block',
				marginLeft: '5%',
				width: '50%'
			},
			teamScore: {
				display: 'inline-block',
				marginLeft: '15%'
			},
			status: {
				marginLeft: '10px'
			}

		};
		const game = this.props.game;

		if (game === undefined){
			return (
				<div style={[style.noGame]}>
					<span>
						No games today
					</span>
				</div>
			)
		}
		else {
			// Find out who won the game. Set the booleans to T/F which will be used for styling in return
			// statement
			var awayTeamScore = game.linescore === undefined? 0 : parseInt(game.linescore.r.away);
			var homeTeamScore = game.linescore === undefined? 0 : parseInt(game.linescore.r.home);

			var awayTeamWon = awayTeamScore > homeTeamScore? true : false;

			return (
				<div style={[style.game]}>
					<img src={require("./img/tor.jpg")} style={style.teamLogo}/>
					<div className="away_team" style={style.teamName}>
						{
							awayTeamWon ? 
								<strong> {game.away_team_name} </strong>:
								game.away_team_name
							
						}
					</div>

					<div className="away_team_score" style={style.teamScore}>
						{game.linescore === undefined? '-' : game.linescore.r.away}
					</div>

					<br/>

					<img src={require("./img/tex.jpg")} style={style.teamLogo}/>
					<div className="home_team" style={style.teamName}>
						{
							!awayTeamWon ? 
								<strong> {game.home_team_name} </strong>:
								game.home_team_name
							
						}
					</div>

					<div className="home_team_score" style={style.teamScore}>
						{game.linescore === undefined? '-' : game.linescore.r.home}
					</div>

					<div className="status" style={style.status}>
						{game.status.status}
					</div>



				</div>
			)	
		}
		
	}
}

export default Radium(Game);