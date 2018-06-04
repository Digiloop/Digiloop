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


                // we're creating a finalizedData object, where we'll do some final fixes before sending
                let finalizedData = [];

                for (let i = 0; i < data.length; i++) {

                    // only the first item has contact information
                    // so we're saving it to the rest of the items also
                    finalizedData[i].city = data[0].city;
                    finalizedData[i].iscompany = data[0].iscompany;
                    finalizedData[i].phone = data[0].phone;
                    finalizedData[i].pickupInstructions = data[0].pickupInstructions;
                    finalizedData[i].pickupaddr = data[0].pickupaddr;
                    finalizedData[i].zipcode = data[0].zipcode;

                    // add the newly acquired coordinate data
                    finalizedData[i].latitude = results[0].geometry.viewport.f.b;
                    finalizedData[i].longitude = results[0].geometry.viewport.b.b;

                    // add the remaining data as is
                    // we did not add the proxyCategory data, as it is unnecessary
                    finalizedData[i].category = data[i].category;
                    finalizedData[i].subCat = data[i].subCat;

                    finalizedData[i].categoryId = data[i].categoryId;
                    finalizedData[i].subCategoryId = data[i].subCategoryId;

                    finalizedData[i].pcs = data[i].pcs;
                    finalizedData[i].size = data[i].size;
                    finalizedData[i].weight = data[i].weight;
                    finalizedData[i].description = data[i].description;
                }


                


                console.log("Bäkkiilähetyssimulaatio testi #4")
                console.log(finalizedData);
                // toimii, kommentoitu, koska bäkki ei oo valmis siihen
                sendItemData(finalizedData);
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
