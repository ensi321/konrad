import React from 'react';
import Radium from 'radium';
import axios from 'axios';
import update from 'immutability-helper';

class GameStat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			away_batter: [],
			home_batter: [],
			away_pitcher: [],
			home_pitcher: [],
			show_away_team: true,
			show_batter: true
		};

		this.showAwayTeam = this.showAwayTeam.bind(this);
		this.showHomeTeam = this.showHomeTeam.bind(this);

	}
	// Store the result from ajax to this.state
	getStat(p){
		const boxscore = (typeof p === 'undefined') ? this.props.boxscore : p.boxscore;
		try{
			boxscore.batting.forEach((team) =>{
				var batter = team.batter;
				if (team.team_flag === 'home'){
					this.setState((prevState) => {
						return {
							away_batter: prevState.away_batter,
							home_batter: batter,
						}
					})
				}
				else if(team.team_flag === 'away'){
					this.setState((prevState) => {
						return {
							away_batter: batter,
							home_batter: prevState.home_batter,
						}
					})

				}
			})

		}
		catch(err){
			console.log(err);
		}

	}
	// Will display away team's batter
	showAwayTeam(){
		this.setState({show_away_team: true});
	}
	// Will display home team's batter
	showHomeTeam(){
		this.setState({show_away_team: false});
	}

	componentDidMount(){
		this.getStat();
	}

	componentWillReceiveProps(p){
		this.getStat(p);	
	}

	render(){
		const style = {
			gameStat: {
				margin: 'auto',
				width: '100%',
				textAlign: 'center'
			},
			gameStatHomeTeam: {
				marginLeft: '10%',
			},
			gameStatAwayTeam: {
				marginRight: '10%'
			},
			clickable: {
				'@media (min-width: 940px)':{
					cursor: 'pointer',
					':hover': {
						textDecoration: 'underline'
					}
				}
			},
			statTable: {
				margin: 'auto',
				width: '60%'
			}
		}
		const boxscore = this.props.boxscore;
		try{
			var stat_to_show = this.state.show_away_team ? this.state.away_batter : this.state.home_batter;

			return(
				<div style={style.gameStat}>
					<span style={[style.gameStatAwayTeam, style.clickable]} key="away_team" onClick={this.showAwayTeam}>
						{
							this.state.show_away_team ? 
								<strong> {boxscore.away_team_code.toUpperCase()} </strong>:
								boxscore.away_team_code.toUpperCase()
						}
					</span>
					|
					<span style={[style.gameStatHomeTeam, style.clickable]} key="home_team" onClick={this.showHomeTeam}>
						{
							!this.state.show_away_team ? 
								<strong> {boxscore.home_team_code.toUpperCase()} </strong>:
								boxscore.home_team_code.toUpperCase()
						}
					</span>

					<table style={style.statTable}>
						<tbody>
							<tr>
								<th>Name </th>
								<th>AB   </th>
								<th>RH   </th>
								<th>RBI  </th>
								<th>BB   </th>
								<th>SO   </th>
								<th>AVG  </th>
							</tr>
							{
								
								stat_to_show.map((batter, i) =>{
									if (i < 5){
										return (
											<tr key={i}>
												<td> {batter.name_display_first_last.split(' ')[1]} </td>
												<td> {batter.ab} </td>
												<td> {batter.hr} </td>
												<td> {batter.rbi} </td>
												<td> {batter.bb} </td>
												<td> {batter.so} </td>
												<td> {batter.avg} </td>

											</tr>
											)											
									}

								})
							}
						</tbody>


					</table>

				</div>
				)
		}
		catch(err){
			return(<div> </div>);
		}

	}

}

export default Radium(GameStat);