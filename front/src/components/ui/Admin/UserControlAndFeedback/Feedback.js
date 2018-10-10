import React, { Component } from 'react';
import { Table, TableBody, TableRow, TableCell } from '@material-ui/core'
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core'
import moment from 'moment'

import { getFeedback } from '../../../../utils/editFeedback'

class FeedBack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbacks: [],
            showFeedback: false,
            open: false,
            dialog: []
        }
    }

    // get feedbacks from server
    getFeedbacks() {
        getFeedback().then((feedback) => {
            this.setState({ feedbacks: feedback })
        });
    }

    // get clicked feedback info
    feedbackInfo = (event, data) => {
        console.log(data)
        this.setState({ info: data })
        this.handleDialogOpen();
    }

    // open dialog
    handleDialogOpen = () => {
        this.setState({ open: true })
    }

    // close dialog
    handleDialogClose = () => {
        this.setState({ open: false })
    }

    componentDidMount() {
        this.getFeedbacks();
    }

    render() {
 
        const dialog = [];
        if (this.state.open) {
            dialog.push(
                <Dialog key={this.state.info.feedback_id}
                open={this.state.open}
                onClose={this.handleDialogClose}
                scroll={'paper'}
                fullWidth
                >
                <DialogTitle>{this.state.info.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {this.state.info.text}
                    </DialogContentText>
                    <DialogContentText style={{ marginTop: '2%', textAlign: 'right' }}>
                        Ilmoitettu: {moment.unix(this.state.info.timestamp / 1000).format('DD.MM.YYYY')}
                    </DialogContentText>
                    <DialogContentText style={{ marginTop: '2%', textAlign: 'right' }}>
                        Ilmoittaja: {this.state.info.user_id}
                    </DialogContentText>
                </DialogContent>
                </Dialog>
            )
        }

        return (
            <div>
                <h1>Palauteboksi</h1>
                <Table style={{ width: '80%', margin: 'auto', marginTop: '2%', backgroundColor: '#FFF' }}>
                    {dialog}
                    <TableBody>
                        {this.state.feedbacks.length ?
                            this.state.feedbacks
                                .map(n => {
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.feedbackInfo(event, n)}
                                            key={n.feedback_id}>
                                            <TableCell>{n.title}</TableCell>
                                            <TableCell>{moment.unix(n.timestamp / 1000).format('DD.MM.YYYY')}</TableCell>
                                            <TableCell>{n.text}</TableCell>
                                        </TableRow>
                                    )
                                })
                            : <TableRow><TableCell>null</TableCell></TableRow>}
                    </TableBody>
                </Table>
            </div>
        )
    }
}
export default FeedBack