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
            picture: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.onDrop = this.onDrop.bind(this)
    }

    onDrop(picture) {
        this.setState({
            picture: picture[picture.length - 1]
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

            categoryId: this.props.values.categoryId,
            subCategoryId: this.props.values.subCategoryId,
            proxyCategoryId: this.props.values.proxyCategoryId,

            category: this.props.values.category,
            subCat: this.props.values.subCat,
            proxySubCat: this.props.values.proxySubCat,

            pcs: this.state.pcs,
            size: this.state.size,
            weight: this.state.weight,
            description: this.state.description,

            picture: this.state.picture
        }
        this.props.saveValues(data);
        this.props.nextStep()

    }

    componentDidMount() {
        console.log("Käpysoppa")
        console.log(this.props.picture)

        if (this.props.values.pcs === undefined) {
            this.setState({
                pcs: 1,
                size: "< 5",
                weight: "< 5",
                description: this.props.values.description,
                picture: this.props.values.picture
            })
        } else {
            this.setState({
                pcs: this.props.values.pcs,
                size: this.props.values.size,
                weight: this.props.values.weight,
                description: this.props.values.description,
                picture: this.props.values.picture
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
                                <div style={{ maxWidth:'35%', minWidth: '55%', maxHeight: '30%', minHeight: '50%', marginLeft: 'auto' }}>
                                    <ImageUploader
                                        withIcon={false}
                                        withLabel={false}
                                        buttonText='Valitse kuva'
                                        onChange={this.onDrop}
                                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                        maxFileSize={5242880}
                                    />

                                </div>
                                <div id='ImagePreview'>
                                    {this.state.picture != null ? <img style={{width: '100%', height:'100%'}} src={URL.createObjectURL(this.state.picture)} /> : <p>Ei valittua kuvaa</p>}
                                    
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style={{ width: '100%', height: 'auto' }} >
                                    <p style={styles.pTags}>Kpl</p>
                                    <p style={{float: 'left', margin: '0 0 0 17%'}}>Mitat</p>
                                    <p style={{float: 'left', margin: '0 0 0 28%'}}>Paino</p>
                                </div>
                            </td>
                        </tr>
                        <tr>   
                            <td>
                                <div>
                                    <DropDownMenu value={this.state.pcs} onChange={this.handleChange("pcs")} style={styles.dropDown}>
                                        <MenuItem value={1} primaryText= "1" />
                                        <MenuItem value={"2-5"} primaryText= "2 - 5" />
                                        <MenuItem value={">5"} primaryText= "> 5" />
                                    </DropDownMenu>
                                    <DropDownMenu value={this.state.size} onChange={this.handleChange("size")} style={styles.dropDown}>
                                        <MenuItem value={"< 5"} primaryText= "< 0.5m" />
                                        <MenuItem value={'0.5-2'} primaryText= "0.5 - 2m" />
                                        <MenuItem value={'2.5'} primaryText= "> 2.5m " />
                                    </DropDownMenu>
                                    <DropDownMenu value={this.state.weight} onChange={this.handleChange("weight")} style={styles.dropDown}>
                                        <MenuItem value={"< 5"} primaryText= "< 5kg" />
                                        <MenuItem value={'5-20'} primaryText= "5 - 20kg" />
                                        <MenuItem value={'>20'} primaryText= "> 20kg" />
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


            </div >
        );
    }
}

export default InfoFields;
