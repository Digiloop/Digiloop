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
            description: "",
            picture: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.onDrop = this.onDrop.bind(this)
        this.removeImage = this.removeImage.bind(this)
        this.saveValues = this.saveValues.bind(this)
    }

    onDrop(picture) {
        this.setState({
            picture: picture[picture.length - 1]
        }, function(){
            this.saveValues();
        })
    }

    // handle selecting the dropdown menu items
    handleChange = (targetField) => (event, index, obj) => {
        this.setState({
            [targetField]: obj
        }, function(){
            this.saveValues();
        })
    }

    removeImage(){
        this.setState({
            picture: null
        }, function(){
            this.saveValues();
        })
    }

    saveValues(){
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
    }

    nextStep(event) {
        event.preventDefault();
        this.saveValues();
        this.props.nextStep()

    }

    componentDidMount() {

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
                float: 'left',
            },
            pTags: {
                padding: '0px',
                display: 'inline',
                float: 'left',
                margin: '0px',
                marginLeft: '3%',
                width: '30%',
                fontSize: '15px'
            }
        };

        return (
            <div className="Container">
                <table className="orderStructure">
                    <tbody>
                        <tr>
                            <td>
                                <label style={{ float: 'left', position: 'absolute', marginLeft: '2%' }}>
                                    {this.props.values.category}/<br />{this.props.values.proxySubCat}</label>
                                <div style={{ width:'120px', height: '90px', marginLeft: 'auto', overflow: 'hidden', padding: '0 0 0 10px' }}>

                                    <FlatButton
                                    label="Poista Kuva" 
                                    
                                    labelStyle={{
                                        position: 'relative',
                                        paddingLeft: '10px',
                                        paddingRight: '10px',
                                        verticalAlign: 'middle',
                                        textTransform: 'none',
                                        letterSpacing: '-1px',
                                        fontWeight: '600',
                                        fontSize: '14px',
                                        color: 'black'
                                    }}
                                    disabled={this.state.picture == null}
                                    style={{ 
                                        borderRadius: 25,
                                        position: "absolute",
                                        marginLeft: "30px"
                                    }}
                                    backgroundColor={'#FFF'}
                                    onClick={this.removeImage} />
                                    
                                    <ImageUploader
                                        withIcon={false}
                                        withLabel={false}
                                        buttonText='Valitse kuva'
                                        onChange={this.onDrop}
                                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                        maxFileSize={5242880}

                                        buttonStyles={{                                            
                                            width: "85px",
                                            height: "30px",
                                            padding: "0",
                                            position: "absolute",
                                            contentAlign: "left",
                                            margin: '40px 40px 0 0',                                         
                                        }}
                                    />

                                    

                                </div>
                                <div id='ImagePreview' style={{
                                    border: '2px solid #004225',

                                }}>
                                    {this.state.picture != null ? <img style={{width: '100%', height:'100%'}} src={URL.createObjectURL(this.state.picture)} /> : <p style={{width: '90px'}}>Ei valittua kuvaa</p>}
                                    
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <p style={styles.pTags}>Kpl</p>
                            <p style={{
                                textAlign: 'left',
                                margin: '0px',
                                width: '30%',
                                position: 'absolute',
                                marginLeft: '26%',
                                fontSize: '15px'
                                }}>Mitat (m<sup>3</sup>)</p>
                            <p style={{
                                float: 'left',
                                textAlign: 'left',
                                margin: '0 0 0 52%',
                                width: '30%',
                                position: 'absolute',
                                fontSize: '15px'
                                }}>Paino (kg)</p>
                        </tr>
                        <tr>   
                            <td>
                                <div>
                                    <DropDownMenu value={this.state.pcs} onChange={this.handleChange("pcs")} style={styles.dropDown} iconStyle={{padding: '0 0 0 40px', fill: '#AAA'}} labelStyle={{padding: '0 10px'}}>
                                        <MenuItem value={1} primaryText= "1" />
                                        <MenuItem value={"2-5"} primaryText= "2 - 5" />
                                        <MenuItem value={"> 5"} primaryText= "> 5" />
                                    </DropDownMenu>
                                    <DropDownMenu value={this.state.size} onChange={this.handleChange("size")} style={styles.dropDown} iconStyle={{padding: '0 0 0 40px', fill: '#AAA'}} labelStyle={{padding: '0 10px'}}>
                                        <MenuItem value={"< 5"} primaryText= "< 0.5" />
                                        <MenuItem value={'0.5-2'} primaryText= "0.5 - 2" />
                                        <MenuItem value={'> 2.5'} primaryText= "> 2" />
                                    </DropDownMenu>
                                    <DropDownMenu value={this.state.weight} onChange={this.handleChange("weight")} style={styles.dropDown} iconStyle={{padding: '0 0 0 40px', fill: '#AAA'}} labelStyle={{padding: '0 10px'}}>
                                        <MenuItem value={"< 5"} primaryText= "< 5" />
                                        <MenuItem value={'5-20'} primaryText= "5 - 20" />
                                        <MenuItem value={'> 20'} primaryText= "> 20" />
                                    </DropDownMenu>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="leftOrderLabel">Lisätietoja</label>
                                <TextField className="rightOrderField"
                                    type="text" hintText='Kenraali Teksti Ilmoittautuu, herra Ylisotajumala' style={styles}
                                    multiLine={true} 
                                    rows={3} 
                                    rowsMax={7} 
                                    defaultValue={this.props.values.description}
                                    onChange={(event, newValue) => this.setState({ description: newValue }, function(){this.saveValues})} 
                                    maxLength="1000"
                                    /><br /><br />
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
