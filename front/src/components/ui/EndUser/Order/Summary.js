import React, { Component } from 'react';
import { AppBar, MenuItem, DropDownMenu, Divider } from 'material-ui';
import { FlatButton, IconButton, TextField } from 'material-ui';
import Forward from 'material-ui/svg-icons/navigation/arrow-forward';
import Back from 'material-ui/svg-icons/navigation/arrow-back';
import { sendRegData } from '../../../../utils/sendRegData';
import styles from '../../../../index.css';
import { sendItemData } from '../../../../utils/sendItem';


class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1
        };
        this.addressToCoords = this.addressToCoords.bind(this);
    }

    addressToCoords(address) {

        this.geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === window.google.maps.GeocoderStatus.OK) {
                return {
                    lat: results[0].geometry.viewport.f.b,
                    long: results[0].geometry.viewport.b.b
                }
                console.log("geocode results")
                console.log(results[0].geometry.viewport.b.b)
                console.log(results[0].geometry.viewport.f.b)
            }
        })
    }

    componentDidMount() {
        this.geocoder = new window.google.maps.Geocoder();
        this.addressToCoords("Ståhlberginkatu 10, Lahti")
    }

    handleChange = (event, index, value) => this.setState({ value });

    sendData(event) {
        event.preventDefault();
        /*
        var itemData = {
            pickupaddr: this.props.values.pickupaddr,
            zipcode: this.props.values.zipcode,
            city: this.props.values.city,
            phone: this.props.values.phone,
            pickupInstructions: this.props.values.pickupInstructions,
            iscompany: this.props.values.iscompany,
            category: this.props.values.category,
            subCat: this.props.values.subCat,
            pcs: this.props.values.pcs,
            size: this.props.values.size,
            weight: this.props.values.weight,
            description: this.props.values.description
        }*/
        sendItemData(JSON.stringify(this.props.values));
        //this.props.saveValues(itemData);
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

        let items = [];

        for(let i = 0; i < this.props.values.length; i++){
            items.push(
                <tr key={"itemPreparationListing" + i}>
                    <td><pre>
                        {this.props.values[i].category}/{this.props.values[i].subCat}<br />
                        {this.props.values[i].size}m<sup>3</sup>/kpl   {this.props.values[i].weight} <br />
                        {this.props.values[i].pcs} <br />
                        {this.props.values[i].description}</pre>
                        <Divider style={{ backgroundColor: '#FFF', height: '3px' }} />
                    </td>
                </tr>
            )
        }
        




        return (
            <div className="Container">
                <table className="orderStructure">
                    <tbody>
                        <tr>
                            <td>
                                <label style={{ float: 'left', position: 'absolute', marginLeft: '2%' }}>Yhteystiedot</label><br />
                                <pre>{this.props.values[0].pickupaddr} {this.props.values[0].phone} <br />
                                    {this.props.values[0].zipcode} {this.props.values[0].city}</pre>
                                <Divider style={{ backgroundColor: '#FFF', height: '3px' }} />
                            </td>
                        </tr>
                        {items}
                        <tr>
                            <td style={{ textAlign: 'center' }}>
                                <FlatButton
                                    label='Lisää Laitteita'
                                    style={{ borderRadius: 25 }}
                                    backgroundColor={'#FFF'}
                                    onClick={(event) => this.props.nextItem(event)}
                                />
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                <FlatButton
                                    label='Lähetä tilaus'
                                    style={{ borderRadius: 25 }}
                                    backgroundColor={'#FFF'}
                                    onClick={(event) => this.sendData(event)}
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
