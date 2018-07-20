import React, { Component } from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

import { companyUsers, changeStatus } from '../../../../utils/fetchEditUsers'

class UserManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            open: false
        }
    }

    // get company subUsers
    getCompanyUsers() {
        companyUsers().then((compUsers) => {
            this.setState({ users: compUsers })
        });
    }

    handleClick = (event, data) => {
        console.log(data);
        this.setState({ data: data });
        this.handleDialogOpen();

    }

    // change user status 1=true 0=false, false deactivates account 
    changeStatus(id, status) {
        var userStatus = {
            Status: !status,
            id: id
        }
        this.handleDialogClose();
        changeStatus(userStatus)
            .then(() => {
                setTimeout(() => {
                    this.getCompanyUsers();
                }, 1000)
            })
    }

    // open dialog
    handleDialogOpen = () => {
        this.setState({ open: true })
    }

    // close dialog
    handleDialogClose = () => {
        this.setState({ open: false })
        // this.getCompanyUsers();
    }

    componentDidMount() {
        this.getCompanyUsers();
    }

    render() {

        const styles = {
            paper: {
                width: '90%',
                marginLeft: '5%',
                marginTop: '3%'
            },
            head: {
                textAlign: 'center',
                fontFamily: 'kanit',
                fontSize: '20px'
            },
            button: {
                float: 'right',
                border: '1px solid #004225'
            }
        };

        const dialog = [];
        if (this.state.open) {
            dialog.push(
                <Dialog key={this.state.data.id}
                    open={this.state.open}
                    onClose={this.handleDialogClose}
                    scroll={'paper'}
                    fullWidth={true}
                >
                    <DialogTitle>{this.state.data.fname} {this.state.data.lname}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            email: {this.state.data.email}
                        </DialogContentText>
                        <DialogContentText>
                            puhelinnumero: {this.state.data.phone}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={event => this.changeStatus(this.state.data.id, this.state.data.status)}
                            style={styles.button}>{this.state.data.status ? 'Deaktivoi' : 'Aktivoi'}</Button>
                    </DialogActions>
                </Dialog>
            )
        }

        return (
            <Paper style={styles.paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={styles.head}>Käyttäjälista</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.users.length ? this.state.users
                            .map(n => {
                                return (
                                    <TableRow
                                        key={n.id}
                                        hover
                                        onClick={event => this.handleClick(event, n)}
                                    >
                                        <TableCell>{n.fname} {n.lname}</TableCell>
                                        <TableCell>
                                            <Button style={styles.button}>Näytä</Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            }) : <TableRow><TableCell>Sinulla ei ole alakäyttäjiä</TableCell></TableRow>}
                    </TableBody>
                </Table>
                {dialog}
            </Paper>
        )
    }
}

export default UserManagement