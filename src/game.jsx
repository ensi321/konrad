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
				border: 'black solid 1px'
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
			return (
				<div style={[style.game]}>
					{[game.home_team_name, 
					game.linescore === undefined? '' : game.linescore.r.home, 
					game.away_team_name,
					game.linescore === undefined? '' : game.linescore.r.away,
					game.status.status ].join(' ')}


				</div>
			)	
		}
		
	}
}

export default Radium(Game);