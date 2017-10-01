import React from 'react';


class Game extends React.Component {
	render(){
		if (this.props.game === undefined){
			return (
				<div>
					<span>
						No game found
					</span>
				</div>
			)
		}
		else {
			return (
				<div>
					hey 
					{console.log(this.props.game.home_team_name + ' ' + this.props.game.away_team_name)}
				</div>
			)	
		}
		
	}
}

export default Game;