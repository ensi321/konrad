import React from 'react';
import Radium from 'radium';
import axios from 'axios';

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
			},
			inningTable: {
				margin: 'auto',
				width: '80%'
			},
			inningTableCell: {
				textAlign: 'center',
			},
			inningTableTeam: {
				paddingRight: '1rem'
			}
		}
		const boxscore = this.state.boxscore;
		try {
			console.log(boxscore);
			return (
					<div style={style.gameDetail}>
						<table style={style.inningTable}>
							<tbody>
							  <tr>
							    <th></th>
							    <th>1</th>
							    <th>2</th>
							    <th>3</th>
							    <th>4</th>
							    <th>5</th>
							    <th>6</th>
							    <th>7</th>
							    <th>8</th>
							    <th>9</th>
							    <th></th>
							    <th>R</th>
							    <th>H</th>
							    <th>E</th>
							  </tr>
							  <tr>
							    <td style={style.inningTableTeam}>{boxscore.away_team_code.toUpperCase()}</td>
							    {
							    	// This is inning score for away team
							    	boxscore.linescore.inning_line_score
							    		.map((inning, i) => {
							    			return (
							    				<td key={i} style={style.inningTableCell}> {inning.away} </td>
							    			)
							    		})
							    }
							    <td> </td>
							   	<td style={style.inningTableCell}> {boxscore.linescore.away_team_runs} </td>
							   	<td style={style.inningTableCell}> {boxscore.linescore.away_team_hits} </td>
							   	<td style={style.inningTableCell}> {boxscore.linescore.away_team_errors} </td>
							  </tr>
							  <tr>
							  	<td style={style.inningTableTeam}>{boxscore.home_team_code.toUpperCase()}</td>
							  	{
							  		// This is inning score for home team
							  		boxscore.linescore.inning_line_score
							  			.map((inning, i) => {
							  				return (
							  					<td key={i} style={style.inningTableCell}> {inning.home} </td>
							  				)
							  			})
							  	}
							  	<td> </td>
							  	<td style={style.inningTableCell}> {boxscore.linescore.home_team_runs} </td>
							  	<td style={style.inningTableCell}> {boxscore.linescore.home_team_hits} </td>
							  	<td style={style.inningTableCell}> {boxscore.linescore.home_team_errors} </td>
							  </tr>
							</tbody>
						</table>
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