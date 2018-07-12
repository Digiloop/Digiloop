import React, { Component } from 'react';
import { FlatButton } from 'material-ui'
import UserInfo from '../../../containers/EndUser/Profile/UserInfo'
import ChangePassword from './ChangePassword'

class ProfileMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: true
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleSnackbar = (snackbarvalue) => {
        this.props.onUpdate(snackbarvalue)
    }

    handleChange = (value) => {
        this.setState({
            value: !value
        })
    }

    render() {
        return (
            <div>
                <FlatButton key={'i'}
                    label="Vaihda salasana" onClick={this.handleChange}
                    hoverColor="#8CE30B"
                    style={{ margin: '5px' }}
                    backgroundColor="#A6CE6B"
                    labelStyle={{
                        fontFamily: 'kanit',
                        float: 'left',
                        borderRadius: '0',
                        fontSize: '17px',
                        color: '#004225'
                    }} />
                {this.state.value ? <UserInfo handleSnackbar={this.handleSnackbar} /> : <ChangePassword handleSnackbar={this.handleSnackbar} />}
            </div>
        );
    }
}
export default ProfileMain