import React, { Component } from 'react';
import ManageUsers from '../../../containers/Admin/UserControlAndFeedback/ManageUsers'
import FeedBack from './Feedback'

import { Button } from '@material-ui/core'

class AdminIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {

        const styles = {

            button: {
                borderRadius: 25,
                marginTop: '2%',
                width: '30%',
                backgroundColor: 'white',
                color: '#004225'
            }
        }

        return (
            <div>
                <Button style={styles.button}
                    onClick={() => this.setState({ showFeedback: !this.state.showFeedback })}
                >
                {!this.state.showFeedback ? 'Näytä palautteet' : 'Näytä käyttäjät'}                
                </Button>
                {this.state.showFeedback ? <FeedBack /> : <ManageUsers /> }
            </div>
        )
    }
}
export default AdminIndex