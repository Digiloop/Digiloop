import React from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Forward from 'material-ui/svg-icons/navigation/arrow-forward';
import Back from 'material-ui/svg-icons/navigation/arrow-back';
import styles from '../../../../index.css';
import { getCats, getSubCats } from '../../../../utils/fetchcategories';

import noImage from './imgMissingTransparent.png'
import { BASE_URL } from '../../../../settings'

class CategoriesFields extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            activeCatId: '',
            activeCatName: '',

            activeSubCatId: '',
            activeSubCatName: '',

            images: {

            }
        };
        this.categoryImageStyler = this.categoryImageStyler.bind(this);
    }


    // catId = Category CatId, category = Category name
    setCat = (catId, categoryName) => {
        this.setState({
            activeCatId: catId,
            activeCatName: categoryName,

            // when category is changed, remove all old subcat states
            activeSubCatId: "",
            activeSubCatName: ""
        }, function () {
            this.props.setCategoriesSelected(false);
        });
    }

    // CatId = subCategory CatId, subCat = subCategory name
    setSubCat = (subCatId, subCatName, proxyCatId, proxyCatName) => {
        this.setState({
            activeSubCatId: subCatId,
            activeProxyCatId: proxyCatId,
            activeSubCatName: subCatName,
            activeProxyCatName: proxyCatName
        }, function () {

            // save the data in OrderMain's state
            var data = {
                pickupaddr: this.props.values.pickupaddr,
                zipcode: this.props.values.zipcode,
                city: this.props.values.city,
                phone: this.props.values.phone,
                pickupInstructions: this.props.values.pickupInstructions,
                iscompany: this.props.values.iscompany,
                category: this.state.activeCatName,
                subCat: subCatName,
                proxySubCat: proxyCatName
            }
            this.props.saveValues(data);
            this.props.setCategoriesSelected(true);
        });
    }


    componentDidMount() {

        if (this.props.values.subCat == undefined || this.props.values.subCat == "") {
            this.props.setCategoriesSelected(false);
        } else {

            // compare the selected item's (sub)category names with store's (sub)categorylists to find their ID's
            // then store the IDs as active to enable highlighting
            // this is kinda stupid, but it's what you get for not storing the ID's in the value object in the first place
            for (let i = 0; i < this.props.categories.length; i++) {
                if (this.props.categories[i].CatName === this.props.values.category) {
                    for (let j = 0; j < this.props.subCategories.length; j++) {
                        if (this.props.subCategories[j].subName === this.props.values.subCat) {
                            this.setState({
                                activeCatId: this.props.categories[i].CatId,
                                activeSubCatId: this.props.subCategories[j].subId
                            })
                        }
                    }
                }
            }

            this.props.setCategoriesSelected(true);
        }
        this.setState({
            activeCatName: this.props.values.category,
            activeSubCatName: this.props.values.subCat
        })

    }




    // creates the appropriate style for the (sub)category
    // index = the element's CatId/subId
    // type 0 = category, 1 = proxycategory
    categoryImageStyler(index, type) {

        let returnStyle;

        if (type == 0) {

            let imageUrl;

            if( !this.props.categoryUrlsExist[index] ){
                imageUrl = noImage;
            } else {
                imageUrl = BASE_URL + "/images/categories/" + this.props.categories[index].ImgReference;
            }
            


            if (this.props.categories[index].CatId == this.state.activeCatId) {
                returnStyle = {
                    borderRadius: 4,
                    border: '8px solid red',
                    width: '19vw',
                    height: '19vw',
                    marginRight: '1%',
                    textAlign: 'center',
                    fontSize: '15px',
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition:  "center,left center",
                    backgroundImage: "url("+imageUrl+")"
                }
            } else {
                returnStyle = {
                    borderRadius: 4,
                    border: '8px solid white',
                    width: '19vw',
                    height: '19vw',
                    marginRight: '1%',
                    textAlign: 'center',
                    fontSize: '15px',
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center, left center",
                    backgroundImage: "url("+imageUrl+")"
                }
            }

        } else {

            let imageUrl;

            if( !this.props.proxyCategoryUrlsExist[index] ){
                imageUrl = noImage;
            } else {
                imageUrl = BASE_URL + "/images/subcategories/" + this.props.subCategories[index].ImgReference;
            }

            if (this.props.proxyCategories[index].Id == this.state.activeProxyCatId) {
                returnStyle = {
                    borderRadius: 4,
                    border: '8px solid red',
                    width: '19vw',
                    height: '19vw',
                    marginRight: '1%',
                    textAlign: 'center',
                    fontSize: '15px',
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center, left center",
                    backgroundImage: "url("+imageUrl+")"
                }
            } else {
                returnStyle = {
                    borderRadius: 4,
                    border: '8px solid white',
                    width: '19vw',
                    height: '19vw',
                    marginRight: '1%',
                    textAlign: 'center',
                    fontSize: '15px',
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center, left center",
                    backgroundImage: "url("+imageUrl+")"
                }
            }

        }





        return returnStyle;

    }

    render() {

        const styles = {
            width: 250,
            backgroundColor: '#FFFFFF',
            borderRadius: 4,
            borderWidth: 0.5,
            borderColor: '#d6d7da',



            tdStyle: {
                borderRadius: 4,
                border: '8px solid white',
                width: '5vh',
                height: '5vh'
            },

            trStyle: {
                display: 'block',
                width: '89%',
                overflowX: 'scroll',
                whiteSpace: 'nowrap',
                maxWidth: '70vw'
            }
        };

        const cats = [];
        const proxyCats = [];


        for (let i = 0; i < this.props.categories.length; i++) {
            cats.push(
                <td
                    value={this.props.categories[i].CatName}
                    onClick={() => this.setCat(this.props.categories[i].CatId, this.props.categories[i].CatName)}
                    key={i} >
                    <div style={this.categoryImageStyler(i, 0)} >
                        {this.props.categories[i].CatName}
                    </div>
                </td>
            )
        }


        for (let j = 0; j < this.props.subCategories.length; j++) {
            if (this.props.subCategories[j].CatId === this.state.activeCatId) {

                for (let k = 0; k < this.props.proxyCategories.length; k++) {
                    
                    if(this.props.proxyCategories[k].subCatId == this.props.subCategories[j].subId){


                        proxyCats.push(
                            <td
                                value={this.props.proxyCategories[k].name}
                                onClick={() => this.setSubCat(
                                    this.props.subCategories[j].subId, 
                                    this.props.subCategories[j].subName,
                                    this.props.proxyCategories[k].Id,
                                    this.props.proxyCategories[k].name
                                )}
                                key={k} >
                                <div style={this.categoryImageStyler(k, 1)} >
                                    {this.props.proxyCategories[k].name}
                                </div>
                            </td>
                        )


                    }
                }

            }
        }

        return (
            <div className="Container">
                <table className="orderStructure">
                    <tbody>
                        <tr><td><label className="leftOrderLabel"><h2 className="orderH2">Pääluokka</h2> </label></td></tr>
                        <tr style={styles.trStyle} >{cats}</tr>
                        {proxyCats.length !== 0 ? <tr><td><label className="leftOrderLabel"><h2 className="orderH2">Alakategoria</h2> </label></td></tr> : <tr></tr>}
                        <tr style={styles.trStyle} >{proxyCats}</tr>
                    </tbody>
                </table>
            </div >
        );
    }
}

export default CategoriesFields;
