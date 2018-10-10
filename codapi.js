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

