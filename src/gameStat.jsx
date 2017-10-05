import React from 'react';
import Radium from 'radium';

/*
	GameStat: Given the data from GameDetail, display stat of batters and pitchers from 
		home and away team. 2 toggles are used for users to display 1 of the 4 sets of data.

	Parent component: GameStat
	Child component: None
*/

class GameStat extends React.Component {
	constructor(props) {
		super(props);
		/*
			away_batter: List of batters from away team. Each element includes stat of that peron.
			home_batter: List of batters from home team.
			home_pitcher: List of pitchers from home team.
			home_pitcher: List of pitchers from home team.
			show_away_team: Boolean changed triggered by onclick to togger whether to show
					away team's stat or home team's.
			show_batter: Boolean changed triggered by onclick to togger whether to show
					team's batter or pitcher.
		*/
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
		this.showBatter = this.showBatter.bind(this);
		this.showPitcher = this.showPitcher.bind(this);

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
			boxscore.pitching.forEach((team) =>{
				var pitcher = team.pitcher;
				if (team.team_flag === 'home'){
					this.setState((prevState) => {
						return {
							away_pitcher: prevState.away_pitcher,
							home_pitcher: pitcher
						}
					})
				}
				else if(team.team_flag === 'away'){
					this.setState((prevState) => {
						return {
							away_pitcher: pitcher,
							home_pitcher: prevState.home_pitcher,
						}
					})

				}
			})

		}
		catch(err){
			console.log(err);
		}

	}
	// Will display away team's batter/pitcher
	showAwayTeam(){
		this.setState({show_away_team: true});
	}
	// Will display home team's batter/pitcher
	showHomeTeam(){
		this.setState({show_away_team: false});
	}

	// Will display batter
	showBatter(){
		this.setState({show_batter: true});
	}
	// Will display pitcher
	showPitcher(){
		this.setState({show_batter: false});
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
			wrapper: {
				display: 'inline-block',
				width: '50%',
			},
			gameStatHomeTeam: {
				marginLeft: '10%',
			},
			gameStatAwayTeam: {
				marginRight: '10%'
			},
			batter_btn: {
				marginRight: '7%',	
			},
			pitcher_btn: {
				marginLeft: '7%',	
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
			var stat_to_show = {};

			if (this.state.show_away_team && this.state.show_batter){
				stat_to_show = this.state.away_batter;
			}
			else if (this.state.show_away_team && !this.state.show_batter){
				stat_to_show = this.state.away_pitcher;
			}
			else if (!this.state.show_away_team && this.state.show_batter){
				stat_to_show = this.state.home_batter;
			}
			else if (!this.state.show_away_team && !this.state.show_batter){
				stat_to_show = this.state.home_pitcher;
			}
			

			return(
				<div style={style.gameStat}>
					<div style={style.wrapper} >
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
					</div>

					<div style={style.wrapper} >
						<span style={[style.batter_btn, style.clickable]} key="batter" onClick={this.showBatter}>
							{
								this.state.show_batter ? 
									<strong> Batter </strong>:
									'Batter'
							}
						</span>
						|
						<span style={[style.pitcher_btn, style.clickable]} key="pitcher" onClick={this.showPitcher}>
							{
								!this.state.show_batter ? 
									<strong> Pitcher </strong>:
									'Pitcher'
							}
						</span>
					</div>

					<table style={style.statTable}>
						<tbody>
							{
								this.state.show_batter ?
									<tr>
										<th>Name </th>
										<th>AB   </th>
										<th>RH   </th>
										<th>RBI  </th>
										<th>BB   </th>
										<th>SO   </th>
										<th>AVG  </th>
									</tr>:
									<tr>
										<th>Name </th>
										<th>H   </th>
										<th>R   </th>
										<th>ER   </th>
										<th>BB   </th>
										<th>SO   </th>
										<th>HR   </th>
										<th>ERA   </th>
									</tr>
							}
								
							{
								
								stat_to_show.map((person, i) =>{
									if (i < 5){
										if (this.state.show_batter){
											return (
												<tr key={i}>
													<td> {person.name_display_first_last.split(' ')[1]} </td>
													<td> {person.ab} </td>
													<td> {person.hr} </td>
													<td> {person.rbi} </td>
													<td> {person.bb} </td>
													<td> {person.so} </td>
													<td> {person.avg} </td>

												</tr>
												)											
										}
										else {
											return (
												<tr key={i}>
													<td> {person.name_display_first_last.split(' ')[1]} </td>
													<td> {person.h} </td>
													<td> {person.r} </td>
													<td> {person.er} </td>
													<td> {person.bb} </td>
													<td> {person.so} </td>
													<td> {person.hr} </td>
													<td> {person.era} </td>

												</tr>
												)		
										}
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