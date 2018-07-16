import React, { Component } from 'react';
import { FlatButton } from 'material-ui'
import UserInfo from '../../../containers/Admin/Profile/UserInfo'
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
            value: !this.state.value
        })
    }

    render() {
        return (
            <div>
                <FlatButton key={'i'}
                    label={this.state.value ? "Vaihda salasana" : 'Muokkaa tietoja'} onClick={this.handleChange}
                    hoverColor="#8CE30B"
                    style={{ margin: '3%' }}
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