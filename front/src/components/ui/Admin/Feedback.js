import React, { Component } from 'react'
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, TextField, Button } from '@material-ui/core';

// fetches
import { addFeedback } from '../../../utils/editFeedback'

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // feedback dialog
            scroll: 'paper',
            dialogOpen: true,

            // failure dialog
            open: false,

            // feedback text
            title: '',
            text: ''
        }
    }

    handleFeedbackChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    };


    sendFeedback = (title, text) => {
        if (this.state.title !== '' && this.state.text !== '') {
            this.setState({
                title: title,
                text: text
            })
            addFeedback(this.state.title, this.state.text)
                .then(() => {
                    this.handleDialogClose();
                })
        }
        else {
            this.handleFailureDialogOpen();
        }
    }

    // open dialog
    handleDialogOpen = () => {
        this.setState({
            open: false,
            dialogOpen: true
        })
    }

    // close dialog
    handleDialogClose = () => {
        this.setState({
            dialogOpen: false,
            title: '',
            text: ''
        })
        this.props.onUpdate(false);
    }

    // open failure dialog
    handleFailureDialogOpen = () => {
        this.setState({ open: true })
    }

    // close failure dialog
    handleFailureDialogClose = () => {
        this.setState({ open: false })
    }

    render() {

        const dialog = [];
        if (this.state.dialogOpen) {
            dialog.push(
                <Dialog key={'feedback'} // Feedback dialog
                    open={this.state.dialogOpen}
                    scroll={this.state.scroll}
                    fullWidth
                >
                    <DialogTitle>Anna palautetta</DialogTitle>
                    <DialogContent>
                        <DialogContentText></DialogContentText>
                        <TextField
                            id='title'
                            autoFocus
                            fullWidth
                            label='Aihe'
                            onChange={this.handleFeedbackChange('title')}
                        />
                        <TextField
                            id='text'
                            label='Teksti'
                            fullWidth
                            multiline
                            rows='3'
                            rowsMax='8'
                            onChange={this.handleFeedbackChange('text')}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogClose}>Peruuta</Button>
                        <Button onClick={this.sendFeedback}>Lähetä</Button>
                    </DialogActions>
                </Dialog>
            )
        }

        return (
            <div>
                {dialog}

                {
                    <Dialog key='Fail'
                        style={{ visibility: 'visible' }}
                        open={this.state.open}
                        onClose={this.handleFailureDialogClose}
                        scroll='paper'
                    >
                        <DialogTitle>Täytä kaikki kentät</DialogTitle>
                    </Dialog>
                }
            </div>
        )
    }
}
export default Feedback