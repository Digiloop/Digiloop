import React from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Forward from 'material-ui/svg-icons/navigation/arrow-forward';
import Back from 'material-ui/svg-icons/navigation/arrow-back';
import styles from '../../../../index.css';
import { getCats, getSubCats } from '../../../../utils/fetchcategories';

import { BASE_URL } from '../../../../settings'
import tsadam from './imgMissing.png'


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
    getCat = (catId, categoryName) => {
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
    getSubCat = (subCatId, subCatName) => {
        this.setState({
            activeSubCatId: subCatId,
            activeSubCatName: subCatName
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
            }
            this.props.saveValues(data);
            this.props.setCategoriesSelected(true);
        });
    }


    componentDidMount() {
        console.log("hiiohoi, on mikki nyt merelle hukkunut")
        console.log(this.props.values)

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
    // type 0 = category, 1 = subcategory
    categoryImageStyler(index, type) {
        //this.props.categories[i].CatId == this.state.activeCatId ? styles.imagesActive : styles.images
        //this.props.subCategories[j].subId == this.state.activeSubCatId ? styles.imagesActive : styles.images

        //border: '8px solid red',
        let returnStyle;
  
        


        if (type == 0) {
            console.log("näit on vitust")
            console.log(this.props.categories);
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
                    backgroundPosition:  "center,left center",
                    backgroundImage: "url("+BASE_URL+"/images/categories/"+this.props.categories[index].ImgReference+"), url("+tsadam+")"
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
                    backgroundPosition:  "center, left center",
                    backgroundImage: "url("+BASE_URL+"/images/categories/"+this.props.categories[index].ImgReference+"), url("+tsadam+")"
                }
            }

        } else {

            if (this.props.subCategories[index].subId == this.state.activeSubCatId) {
                returnStyle = {
                    borderRadius: 4,
                    border: '8px solid red',
                    width: '19vw',
                    height: '19vw',
                    marginRight: '1%',
                    textAlign: 'center',
                    fontSize: '15px'
                }
            } else {
                returnStyle = {
                    borderRadius: 4,
                    border: '8px solid white',
                    width: '19vw',
                    height: '19vw',
                    marginRight: '1%',
                    textAlign: 'center',
                    fontSize: '15px'
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
        const subCats = [];


        for (let i = 0; i < this.props.categories.length; i++) {
            cats.push(
                <td
                    value={this.props.categories[i].CatName}
                    onClick={() => this.getCat(this.props.categories[i].CatId, this.props.categories[i].CatName)}
                    key={i} >
                    <div style={this.categoryImageStyler(i, 0)} >
                        {this.props.categories[i].CatName}
                    </div>
                </td>
            )
        }

        for (let j = 0; j < this.props.subCategories.length; j++) {
            if (this.props.subCategories[j].CatId === this.state.activeCatId) {
                subCats.push(
                    <td
                        value={this.props.subCategories[j].subName}
                        onClick={() => this.getSubCat(this.props.subCategories[j].subId, this.props.subCategories[j].subName)}
                        key={j} >
                        <div style={this.categoryImageStyler(j, 1)} >
                            {this.props.subCategories[j].subName}
                        </div>
                    </td>
                )
            }
        }

        return (
            <div className="Container">
                <table className="orderStructure">
                    <tbody>
                        <tr><td><label className="leftOrderLabel"><h2 className="orderH2">Pääluokka</h2> </label></td></tr>
                        <tr style={styles.trStyle} >{cats}</tr>
                        {subCats.length !== 0 ? <tr><td><label className="leftOrderLabel"><h2 className="orderH2">Alakategoria</h2> </label></td></tr> : <tr></tr>}
                        <tr style={styles.trStyle} >{subCats}</tr>
                    </tbody>
                </table>
            </div >
        );
    }
}

export default CategoriesFields;
