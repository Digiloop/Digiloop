import React, { Component } from 'react';
import { FlatButton } from 'material-ui'
import NewUser from '../../../containers/WasteProcessorAdmin/NewUser'

class UserManagement extends Component {
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
                    label={this.state.value ? "Käyttäjien hallinta" : 'Lisää käyttäjä'} onClick={this.handleChange}
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
                {this.state.value ? <NewUser handleSnackbar={this.handleSnackbar} /> : null }
            </div>
        );
    }
}
export default UserManagement