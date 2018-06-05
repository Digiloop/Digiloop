import React from 'react';
import { MenuItem, DropDownMenu, FlatButton, TextField } from 'material-ui';
import ImageUploader from 'react-images-upload'


class InfoFields extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pcs: 1,
            size: 1,
            weight: 1,
            pictures: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.onDrop = this.onDrop.bind(this)
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        })
    }

    // handle selecting the dropdown menu items
    handleChange = (targetField) => (event, index, obj) => {
        this.setState({
            [targetField]: obj
        })
    }


    nextStep(event) {
        event.preventDefault();
        var data = {
            pickupaddr: this.props.values.pickupaddr,
            zipcode: this.props.values.zipcode,
            city: this.props.values.city,
            phone: this.props.values.phone,
            pickupInstructions: this.props.values.pickupInstructions,
            iscompany: this.props.values.iscompany,

            categoryId: this.props.values.categoryId,
            subCategoryId: this.props.values.subCategoryId,
            proxyCategoryId: this.props.values.proxyCategoryId,

            category: this.props.values.category,
            subCat: this.props.values.subCat,
            proxySubCat: this.props.values.proxySubCat,

            pcs: this.state.pcs,
            size: this.state.size,
            weight: this.state.weight,
            description: this.state.description
        }
        this.props.saveValues(data);
        this.props.nextStep()

    }

    componentDidMount() {


        if (this.props.values.pcs === undefined) {
            this.setState({
                'pcs': 1,
                'size': "< 5",
                'weight': "< 5",
                'description': this.props.values.description
            })
        } else {
            this.setState({
                'pcs': this.props.values.pcs,
                'size': this.props.values.size,
                'weight': this.props.values.weight,
                'description': this.props.values.description
            })
        }
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
                                <label style={{ float: 'left', position: 'absolute', marginLeft: '2%' }}>
                                    {this.props.values.category}/<br />{this.props.values.subCat}</label>
                                <div style={{ width: '30%', height: '10vh', border: '2px solid black', marginLeft: 'auto' }}>


                                </div>
                                <div style={{ width: '100%', height: 'auto' }} >
                                    <p style={styles.pTags}>Kappalemäärä</p>
                                    <p style={styles.pTags}>Mitat</p>
                                    <p style={styles.pTags}>Paino</p>
                                    <DropDownMenu value={this.state.pcs} onChange={this.handleChange("pcs")} style={styles.dropDown}>
                                        <MenuItem value={1} primaryText="1" />
                                        <MenuItem value={"2-5"} primaryText="2 - 5" />
                                        <MenuItem value={">5"} primaryText="> 5" />
                                    </DropDownMenu>
                                    <DropDownMenu value={this.state.size} onChange={this.handleChange("size")} style={styles.dropDown}>
                                        <MenuItem value={"< 5"} primaryText="< 5" />
                                        <MenuItem value={'0.5-2'} primaryText="> 0.5 - 2" />
                                        <MenuItem value={'2.5'} primaryText="> 2.5 m" />
                                    </DropDownMenu>
                                    <DropDownMenu value={this.state.weight} onChange={this.handleChange("weight")} style={styles.dropDown}>
                                        <MenuItem value={"< 5"} primaryText="< 5" />
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
                                    multiLine={true} rows={3} rowsMax={7} defaultValue={this.props.values.description}
                                    onChange={(event, newValue) => this.setState({ description: newValue })} /><br /><br />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}>
                                <FlatButton
                                    label={this.props.saveButtonText}
                                    style={{ borderRadius: 25 }}
                                    backgroundColor={'#FFF'}
                                    onClick={(event) => this.nextStep(event)} />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <ImageUploader
                    withIcon={true}
                    withPreview={true}
                    buttonText='Choose images'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                />
            </div >
        );
    }
}

export default InfoFields;
