import React from 'react';
import { Divider, FlatButton, IconButton } from 'material-ui';

import { sendItemData } from '../../../../utils/sendItem';


class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1
        };
        this.convertAddresses = this.convertAddresses.bind(this);
    }


    convertAddresses() {

        let data = this.props.values;

        let address = this.props.values[0].pickupaddr + ", " + this.props.values[0].city;

        this.geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === window.google.maps.GeocoderStatus.OK) {

                for (let i = 0; i < data.length; i++) {
                    data[i].latitude = results[0].geometry.viewport.f.b
                    data[i].longitude = results[0].geometry.viewport.b.b
                }

                // only the first item has the contact information
                // so we're saving it to the rest of them also
                if (data.length > 1) {
                    for (let i = 1; i < data.length; i++) {
                        data[i].city = data[0].city;
                        data[i].iscompany = data[0].iscompany;
                        data[i].phone = data[0].phone;
                        data[i].pickupInstructions = data[0].pickupInstructions;
                        data[i].pickupaddr = data[0].pickupaddr;
                        data[i].zipcode = data[0].zipcode;
                    }
                }

                console.log("Bäkkiilähetyssimulaatio testi #3")
                console.log(data);
                // toimii, kommentoitu, koska bäkki ei oo valmis siihen
                sendItemData(data);
                //window.location.reload()

            } else {
                window.alert("Osoitetta ei löytynyt");
            }
        })


    }

    componentDidMount() {
        this.geocoder = new window.google.maps.Geocoder();
    }

    handleChange = (event, index, value) => this.setState({ value });



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

        for (let i = 0; i < this.props.values.length; i++) {
            items.push(
                <tr key={"itemPreparationListing" + i}>
                    <td><pre>
                        {this.props.values[i].category}/{this.props.values[i].subCat}<br />
                        {this.props.values[i].size}m<sup>3</sup>/kpl   {this.props.values[i].weight} <br />
                        {this.props.values[i].pcs} <br />
                        {this.props.values[i].description}</pre>
                        <FlatButton
                            label='Muokkaa'
                            style={{ borderRadius: 25 }}
                            backgroundColor={'#FFF'}
                            onClick={(event) => this.props.editItem(i)}
                        />
                        <br />
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
                                    onClick={(event) => this.convertAddresses()}
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
