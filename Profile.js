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