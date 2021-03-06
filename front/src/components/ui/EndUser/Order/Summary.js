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
        let addressData = this.props.addressData;

        const snackbar = this.props.toggleAllahuSnackbar();

        let address = this.props.addressData.pickupaddr + ", " + this.props.addressData.city;

        this.geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === window.google.maps.GeocoderStatus.OK) {

                console.log(results[0].geometry.location)

                // we're creating a finalizedData object, where we'll do some final fixes before sending
                let finalizedData = [];

                for (let i = 0; i < data.length; i++) {

                    finalizedData[i] = {
                        city: addressData.city,
                        iscompany: addressData.iscompany,
                        phone: addressData.phone,
                        pickupInstructions: addressData.pickupInstructions,
                        pickupaddr: addressData.pickupaddr,
                        zipcode: addressData.zipcode,

                        latitude: results[0].geometry.viewport.l.j,
                        longitude: results[0].geometry.viewport.j.j,

                        category: data[i].category,
                        subCat: data[i].subCat,

                        pcs: data[i].pcs,
                        size: data[i].size,
                        weight: data[i].weight,
                        description: data[i].description,

                        image: data[i].picture
                    }

                    // images will be saved as a seperate object, since it will need a seperate post request
                    //imageArray[i] = data[i].picture
                }





                console.log("Bäkkiilähetyssimulaatio testi #8")
                console.log(finalizedData);

                sendItemData(finalizedData);
                snackbar;
                //sendItemImageData(imageArray, finalizedData);
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
                    <td><pre style={{ fontFamily: 'kanit' }}>
                        {this.props.values[i].category}/{this.props.values[i].proxySubCat}<br />
                        {this.props.values[i].size} m<sup>3</sup>/kpl   {this.props.values[i].weight} kg <br />
                        {this.props.values[i].pcs} kpl<br />
                        {this.props.values[i].description}</pre>

                        <div id="SummaryImagePreviews">
                            {this.props.values[i].picture != null ? <img style={{ width: '100%', height: '100%' }} src={URL.createObjectURL(this.props.values[i].picture)} /> : <p>Kuvaa ei valittu</p>}
                        </div>

                        <FlatButton
                            label='Muokkaa'
                            style={{ borderRadius: 25, marginRight: '10px' }}
                            backgroundColor={'#FFF'}
                            onClick={(event) => this.props.editItem(i)}
                        />
                        <FlatButton
                            label='Poista'
                            style={{ borderRadius: 25 }}
                            backgroundColor={'#FFF'}
                            onClick={(event) => this.props.removeItem(i)}
                        />
                        <br />
                        <Divider style={{ backgroundColor: '#FFF', height: '3px', marginTop: '5px' }} />
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
                                <label style={{ float: 'left', position: 'absolute' }}>Yhteystiedot:</label><br />
                                <pre style={{ fontFamily: 'kanit' }}>{this.props.userInfo.fname} {this.props.userInfo.lname}<br />
                                    {this.props.addressData.pickupaddr}<br />                                    
                                    {this.props.addressData.zipcode} {this.props.addressData.city}<br />
                                    {this.props.addressData.phone}</pre>
                                    {this.props.addressData.pickupInstructions ? ('Nouto-ohjeet:'+this.props.addressData.pickupInstructions) : null}
                                <Divider style={{ backgroundColor: '#FFF', height: '3px' }} />
                            </td>                            
                        </tr>
                        {items}
                        <tr>
                            <td style={{ textAlign: 'left', width: '30%' }}>
                                <FlatButton
                                    label='Lisää Laitteita'
                                    style={{ borderRadius: 25, margin: '10px 0' }}
                                    backgroundColor={'#FFF'}
                                    onClick={(event) => this.props.nextItem(event)}
                                />
                                <FlatButton
                                    disabled={this.props.values.length === 0 ? true : false}
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
