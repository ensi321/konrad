import React from 'react';
import Radium from 'radium';

class GameDetail extends React.Component {

	render(){
		const style = {
			gameDetail: {
				'@media (min-width: 812px)':{
					borderBottom: 'grey solid 1px'
				}
			}
		}
		console.log(this.props.game);
		return (
				<div style={style.gameDetail}>
					Hello
				</div>
			)
	}

}

export default Radium(GameDetail);