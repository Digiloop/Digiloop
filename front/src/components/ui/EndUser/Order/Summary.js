import React, { Component } from 'react';
import { AppBar, MenuItem, DropDownMenu } from 'material-ui';
import { FlatButton, IconButton, TextField } from 'material-ui';
import Forward from 'material-ui/svg-icons/navigation/arrow-forward';
import Back from 'material-ui/svg-icons/navigation/arrow-back';
import { sendRegData } from '../../../../utils/sendRegData';
import styles from '../../../../index.css';

// tee dropdownmenu

class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1
        };
    }

    handleChange = (event, index, value) => this.setState({ value });

    nextStep(event) {
        event.preventDefault();
        var data = {
            address: this.state.address,
            zipcode: this.state.zipcode,
            city: this.state.city,
            phone: this.state.phone,
            pickup: this.state.pickup
        }
        console.log(data);
        console.log(this.props);
        //console.log(this.props.values);
        this.props.saveValues(data);
        this.props.nextStep()

    }

    componentDidMount() {
        this.setState({
            'address': this.props.values.address,
            'zipcode': this.props.values.zipcode,
            'city': this.props.values.city,
            'phone': this.props.values.phone,
            'pickup': this.props.values.pickup
        })
    }

    render() {

        const styles = {
            width: '98%',
            backgroundColor: '#FFFFFF',
            borderRadius: 4,
            borderWidth: 0.5,
            borderColor: '#d6d7da',

            tdStyle: {
                width: '40%'
            },
            trStyle: {
                display: 'block',
                width: '98%',
                overflowX: 'scroll',
                whiteSpace: 'nowrap',
                marginTop: '10vh'
            },
            dropDown: {
                width: '31%',
                backgroundColor: 'white',
                marginLeft: '2%',
                marginTop: '10%',
                float: 'left'
            }
        };

        return (
            <div className="Container">
                <table className="orderStructure">
                    <tbody>
                        <tr>
                            <td>
                                <label style={{ float: 'left', position: 'absolute', marginLeft: '2%' }}>Yhteystiedot</label><br />
                                <pre>{this.props.values.address} {this.props.values.phone} <br />
                                {this.props.values.zipcode} {this.props.values.city}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}>
                                <FlatButton
                                    label='Lisää Laitteita'
                                    style={{ borderRadius: 25 }}
                                    backgroundColor={'#FFF'}
                                     />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div >
        );
    }
}

export default Summary;
