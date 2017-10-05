import React from 'react';
import Radium from 'radium';
import GameDetail from './gameDetail.jsx'

/*
	Game: A display of the score, teams and their logos in a game. Data of this game is given by Games. 
		Also include an arrow button which will show/hide the detail stat of the game by render/un-render
		gameDetail component.
	Parent component: Games
	Child component: GameDetail
*/


class Game extends React.Component {
	constructor(props) {
		super(props);
		/*
			show_detail: Boolean that changed when the detail button is clicked. 
				If true, render gameDetail component, render none if false.
		*/
		this.state = {
			show_detail: false
		}
		this.onClick = this.onClick.bind(this);
	}

	// This is triggered when user pushes the detail button
	onClick(){
		// Toggle to show/hide the detail
		const show_detail = this.state.show_detail;
		this.setState({show_detail: !show_detail});
		
	}



	render(){
		const style = {
			noGame: {
				display: 'block',
				textAlign: 'center',
				fontSize: '2rem'
			},
			game: {
				position: 'relative',
				borderTop: 'grey solid 1px',
				marginTop: '0.5rem',
				display: 'block',
				verticalAlign: 'top',
				'@media (min-width: 812px)':{
					display: 'inline-block',
					width: '48%',
					border: 'grey solid 1px',
					borderBottom: '0',
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
			gameFooter: {
				position: 'relative',
				width: '100%',
				borderBottom: 'grey solid 1px',
			},
			status: {
				marginLeft: '10px',
				display: 'inline-block'
			},
			detailBtn: {
				textDecoration: 'none',
				display: 'inline-block',
				width: '0.5rem',
				position: 'absolute',
				left: '50%',
				bottom: '2px',


				padding: '2px 15px',
				borderRadius: '45%',
				backgroundColor: '#f1f1f1',
				textAlign: 'center',
				'@media (min-width: 812px)':{
					':hover': {
						backgroundColor: '#ddd'
					}
				}

			},

			downArrow: {
				transform: 'rotate(45deg)',
				'WebkitTransform': 'rotate(45deg)',
				border: 'solid black',
				borderWidth: '0 2px 2px 0',
				display: 'inline-block',
				padding: '2px',
			},
			upArrow: {
				transform: 'rotate(-135deg)',
				'WebkitTransform': 'rotate(45deg)',
				border: 'solid black',
				borderWidth: '0 2px 2px 0',
				display: 'inline-block',
				padding: '2px',
			}

		};
		const game = this.props.game;

		// There is no game for this day if game is undefined
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
			var awayTeamScore = game.linescore === undefined? 0 : parseInt(game.linescore.r.away, 10);
			var homeTeamScore = game.linescore === undefined? 0 : parseInt(game.linescore.r.home, 10);

			var awayTeamWon = awayTeamScore > homeTeamScore? true : false;


			return (
				<div style={[style.game]}>
					<img src={require('./img/141.jpg')} style={style.teamLogo} alt="Blue Jays Logo"/>
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

					<img src={require('./img/140.jpg')} style={style.teamLogo} alt="Rangers Logo"/>
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

					<br />

					<div className="game-footer" style={style.gameFooter}>
						<div className="status" style={style.status}>
							{game.status.status}
						</div>

						<div className="detail-btn" style={style.detailBtn} onClick={this.onClick}>
							{this.state.show_detail ?
								<div style={style.upArrow}></div> :
								<div style={style.downArrow}></div>
							}
							
						</div>
					</div>
					
					{ this.state.show_detail ? <GameDetail game={game}/> : null }


				</div>
			)	
		}
		
	}
}

export default Radium(Game);