import React, { Component } from 'react';
import { AppBar, MenuItem, DropDownMenu } from 'material-ui';
import { FlatButton, IconButton, TextField } from 'material-ui';
import Forward from 'material-ui/svg-icons/navigation/arrow-forward';
import Back from 'material-ui/svg-icons/navigation/arrow-back';
import styles from '../../../../index.css';


class InfoFields extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value1: 1,
            value2: 1,
            value3: 1
        };
    }

    handlePcsChange = (event, index, value) => this.setState({ value1: value, pcs: value })
    handleSizeChange = (event, index, value) => this.setState({ value2: value, size: value })
    handleWeightChange = (event, index, value) => this.setState({ value3: value, weight: value })

    nextStep(event) {
        event.preventDefault();
        console.log("nextStep");
        var data = {
            address: this.props.values.address,
            zipcode: this.props.values.zipcode,
            city: this.props.values.city,
            phone: this.props.values.phone,
            pickup: this.props.values.pickup,
            organization: this.props.values.organization,
            cat: this.props.values.cat,
            subCat: this.props.values.subCat,
            pcs: this.state.pcs || '1',
            size: this.state.size || '> 0.5',
            weight: this.state.weight || '< 5',
            desc: this.state.desc
        }
        console.log(data);
        console.log(this.props);
        console.log(this.state.pcs);
        
        //console.log(this.props.values);
        this.props.saveValues(data);
        this.props.nextStep()

    }

    componentDidUpdate() {
    }

    componentDidMount() {
        this.setState({
            'pcs': this.props.values.pcs,
            'size': this.props.values.size,
            'weight': this.props.values.weight,
            'desc': this.props.values.desc
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
                float: 'left'
            },
            pTags: {
                margin: '0',
                padding: '0',
                display: 'inline',
                float: 'left',
                marginRight: '13%',
                marginLeft: '2%'
            }
        };

        return (
            <div className="Container">
                <table className="orderStructure">
                    <tbody>
                        <tr>
                            <td>
                                <label style={{ float: 'left', position: 'absolute', marginLeft: '2%' }}>Tähän tulee piäluokka/<br />alaluokka</label>
                                <div style={{ width: '30%', height: '10vh', border: '2px solid black', marginLeft: 'auto' }}></div>
                                <div style={{ width: '100%', height: 'auto' }} >
                                    <p style={styles.pTags}>Kappalemäärä</p>
                                    <p style={styles.pTags}>Mitat</p>
                                    <p style={styles.pTags}>Paino</p>
                                    <DropDownMenu value={this.state.value1} onChange={this.handlePcsChange} style={styles.dropDown}>
                                        <MenuItem value={1} primaryText="1" />
                                        <MenuItem value={'2-5'} primaryText="2 - 5" />
                                        <MenuItem value={5} primaryText="> 5" />
                                    </DropDownMenu>
                                    <DropDownMenu value={this.state.value2} onChange={this.handleSizeChange} style={styles.dropDown}>
                                        <MenuItem value={1} primaryText="< 0.5 m" />
                                        <MenuItem value={'0.5-2'} primaryText="> 0.5 - 2" />
                                        <MenuItem value={2.5} primaryText="> 2.5 m" />
                                    </DropDownMenu>
                                    <DropDownMenu value={this.state.value3} onChange={this.handleWeightChange} style={styles.dropDown}>
                                        <MenuItem value={1} primaryText="< 5" />
                                        <MenuItem value={'5-20'} primaryText=">5 - 20" />
                                        <MenuItem value={'>20'} primaryText="> 20" />
                                    </DropDownMenu>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="leftOrderLabel">Lisätietoja</label>
                                <TextField className="rightOrderField"
                                    type="text" hintText='Televisio 32" tai liesi 60cm' style={styles}
                                    rows={3} rowsMax={7} defaultValue={this.props.values.desc}
                                    onChange={(event, newValue) => this.setState({ desc: newValue })} /><br /><br />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}>
                                <FlatButton
                                    label='Lisää Laite'
                                    style={{ borderRadius: 25 }}
                                    backgroundColor={'#FFF'}
                                    onClick={(event) => this.nextStep(event)} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div >
        );
    }
}

export default InfoFields;
