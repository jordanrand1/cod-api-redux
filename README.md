# cod-api-redux

## Get Call of Duty Stats

This is a Redux reducer I'm using with React.

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

export const getLeaderboard = (params) => {
  const { title, platform, time, type, mode, username } = params
  const leaderboardEndpoint = BASE_URL + '/leaderboards/v2'
  const uri = 
    `${leaderboardEndpoint}/title/${title}/platform/${platform}/time/${time}/type/${type}/mode/${mode}/gamer/${username}`
  return getDataFromAPI(uri)
}

export const getProfile = (params) => {
  const { title, platform, username } = params
  const profileEndpoint = BASE_URL + '/crm/cod/v2'
  const uri = 
    `${profileEndpoint}/title/${title}/platform/${platform}/gamer/${username}/profile`
  return getDataFromAPI(uri)
}

export const getMatches = (params) => {
  const { title, platform, username, days } = params
  const matchesEndpoint = BASE_URL + '/crm/cod/v2'
  const uri = 
    `${matchesEndpoint}/title/${title}/platform/${platform}/gamer/${username}/matches/days/${days}`
  return getDataFromAPI(uri)
}

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
