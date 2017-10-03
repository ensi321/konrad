import React from 'react';
import Radium from 'radium';
import axios from 'axios';

class GameInning extends React.Component {
	render(){
		const style = {
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

		const boxscore = this.props.boxscore;
		try {
			return(
				<div>
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
			return (
				<div>
				</div>
				)
		}
	}

}

export default Radium(GameInning);