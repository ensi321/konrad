import React from 'react';
import Radium from 'radium';
import axios from 'axios';

import GameInning from './gameInning';
import GameStat from './gameStat';

class GameDetail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			boxscore: {}
		};

	}

	// Call mlb api. Get data and then update current state
	updateContent(p){
		const game = (typeof p === 'undefined') ? this.props.game : p.game;

		if (typeof game === 'undefined'){
			return
		}

		const game_data_dir = game.game_data_directory;

		var url = `http://gd2.mlb.com${game_data_dir}/boxscore.json`;

		axios.get(url)
			.then((res) => {
				this.setState({boxscore: res.data.data.boxscore});

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
			gameDetail: {
				'@media (min-width: 812px)':{
					borderBottom: 'grey solid 1px'
				}
			}
		}
		const boxscore = this.state.boxscore;
		try {
			return (
					<div style={style.gameDetail}>
						<GameInning boxscore={boxscore} />

						<GameStat boxscore={boxscore} />

					</div>
			)
		}
		catch(err){
			// This is probably due to the fact that props hasnt populated yet
			return (
				<div>
					Loading
				</div>
				);
		}
		
	}

}

export default Radium(GameDetail);