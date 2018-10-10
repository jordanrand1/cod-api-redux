# cod-api-redux

## Get Call of Duty Stats

This is a Redux reducer I have created to use with React.

I'm hoping as soon as Black Ops 4 api comes out, that it will be as simple as changing the title to "bo4" to retieve the data. Unfortunately I won't know until it is released.

### Example data:
```
  // bo3, iw, wwii
  const title = "bo3";
  // psn, xbl, steam
  const platform = "psn";
  //username
  const username = "Randbo13";
  //amount of days (used for recent matches)
  const days = 7;
  //core, hc, arena
  const type = "core";
  //alltime, monthly, weekly
  const time = "monthly";
  // career, war (Team Deathmatch), dm (Free-For-All), conf (Kill Confirmed), ctf (Capture The Flag), sd (Search & Destroy), dom (Domination), ball (Gridiron), hp (Hardpoint), 1v1, raid (War)
  const mode = "war";
```

### Reducer:
# NOTE THERE IS A DEBUGGER IN THE CATCH FOR NOW (I HAVEN'T HANDLED THE ERRORS YET)
getDataFromAPI is where the magic happens. The uri that is passed in is built in the other functions.
```
import React from 'react';
import axios from 'axios';
import { setFlash } from './flash';

const DATA = 'DATA';

const BASE_URL = 'https://my.callofduty.com/api/papi-client';

const getDataFromAPI = (uri) => {
  debugger
  return (dispatch) => {
    axios.get(uri)
      .then( res => dispatch({
        type: DATA,
        data: res.data.data
      }) )
      .catch( res => {debugger})
  }
}
```
### Leaderboard
```
export const getLeaderboard = (params) => {
  const { title, platform, time, type, mode, username } = params
  const leaderboardEndpoint = BASE_URL + '/leaderboards/v2'
  const uri = 
    `${leaderboardEndpoint}/title/${title}/platform/${platform}/time/${time}/type/${type}/mode/${mode}/gamer/${username}`
  return getDataFromAPI(uri)
}
```
#### returns
```
{ title: 'wwii',
  platform: 'psn',
  leaderboardType: 'core',
  gameMode: 'war',
  page: 3969,
  resultsRequested: 20,
  totalPages: 288978,
  sort: null,
  columns: 
   [ 'prestige',
     'totalXp',
     'kills',
     'deaths',
     'assists',
     'score',
     'timePlayed' ],
  entries: 
   [ { rank: 79361,
       username: 'itsESPALDINHO79',
       updateTime: 294760,
       rating: 5972,
       values: [Object] },
     { rank: 79380,
       username: 'Consisttt',
       updateTime: 7900,
       rating: 5972,
       values: [Object] } ] }
```
### Profile
```
export const getProfile = (params) => {
  const { title, platform, username } = params
  const profileEndpoint = BASE_URL + '/crm/cod/v2'
  const uri = 
    `${profileEndpoint}/title/${title}/platform/${platform}/gamer/${username}/profile`
  return getDataFromAPI(uri)
}
```
#### returns
```
{ title: 'bo3',
  platform: 'psn',
  username: 'Randbo13',
  mp: 
   { lifetime: { all: [Object], mode: [Object] },
     weekly: { all: [Object], mode: [Object] },
     level: 42,
     maxLevel: 0,
     levelXpRemainder: 26990,
     levelXpGained: 13010,
     prestige: 0,
     prestigeId: 0,
     maxPrestige: 0 },
  zombies: 
   { lifetime: { all: {}, mode: {} },
     weekly: { all: {}, mode: {} } },
  engagement: null 
 }
```
### Recent Matches
```
export const getMatches = (params) => {
  const { title, platform, username, days } = params
  const matchesEndpoint = BASE_URL + '/crm/cod/v2'
  const uri = 
    `${matchesEndpoint}/title/${title}/platform/${platform}/gamer/${username}/matches/days/${days}`
  return getDataFromAPI(uri)
}
```
#### returns
```
[ { utcStartSeconds: 1518474308,
    utcEndSeconds: 1518474994,
    duration: 685,
    map: 'mp_france_village',
    mode: 'hp',
    result: 'none',
    winningTeam: 'allies',
    privateMatch: false,
    gameBattle: false,
    playlistName: null,
    player: 
     { awards: [Object],
       team: 'axis',
       rank: 41,
       prestige: 5,
       loadouts: [Object]
     },
    playerStats: 
     { kills: 0,
       shotsMissed: 634,
       kdRatio: 0,
       distanceTravelled: 90335.734375,
       divisionXpMountain: 0,
       accuracy: 0.25323910482921086,
       divisionXpExpeditionary: 0,
       divisionXpInfantry: 0,
       divisionXpArmored: 0,
       shotsLanded: 215,
       divisionXpAirborne: 0,
       avgSpeed: 174.0572967529297,
       avgKillDistance: 465.7652587890625,
       score: 6900,
       totalXp: 4000,
       timePlayed: 685.9,
       headshots: 0,
       divisionXpNone: 0,
       assists: 10,
       divisionXpResistance: 0,
       shotsFired: 849,
       deaths: 0
     }
  }
]
```

### end of file
```
export default (state = {}, action) => {
  switch (action.type) {
    case DATA:
      return action.data;
    default:
      return state;
  }
};
```

### Example React component:
```
import React from 'react';
import {
  Dropdown,
  Form,
  Button,
} from 'semantic-ui-react';
import { connect } from 'react-redux';

//reducer function
import { getProfile } from '../reducers/codapi';

class Profile extends React.Component {

  state = {
    title: '',
    platform: '',
    username: '',
    days: '',
    type: '',
    time: '',
    mode: '',
  }

  //handle change of inputs and setting state
  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  //calls the reducer function and is stored in props
  handleSubmit = (e) => {
    const { dispatch } = this.props
    dispatch(getProfile(this.state))
  }

  render() {
    const platforms =
    [
      {
        text: 'PlayStation',
        value: 'psn'
      },
      {
        text: 'XBOX',
        value: 'xbl'
      },
      {
        text: 'PC (Steam)',
        value: 'steam'
      },
    ]

    const titles =
    [
      {
        text: 'Black Ops 3',
        value: 'bo3'
      },
      {
        text: 'WWII',
        value: 'wwii'
      },
      {
        text: 'Infinite Warfare',
        value: 'iw'
      },
    ]

    return (
      <>
        <Dropdown 
          placeholder="Select Platform" 
          options={platforms} 
          onChange={(e, data) => this.setState({ platform: data.value })}
        />
        <Form.Input
            value={this.state.username}
            name='username'
            placeholder='Username'
            onChange={this.handleChange}
          >
        </Form.Input>
        <Dropdown 
          placeholder="Select Title" 
          options={titles} 
          onChange={(e, data) => this.setState({ title: data.value })}
        />
        <Button onClick={this.handleSubmit}>Submit</Button>
      </>
    )
  }
}

//maps redux state to props
const mapStateToProps = (state) => {
  return { data: state.codapi }
}

export default connect(mapStateToProps)(Profile)
```
