import React from 'react';

import CheckCircle from '@material-ui/icons/CheckCircle';

import noImage from './imgMissingTransparent.png'
import { BASE_URL } from '../../../../settings'

import WindowSizeListener from 'react-window-size-listener'

class CategoriesFields extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            activeCatId: '',
            activeCatName: '',

            activeSubCatId: '',
            activeSubCatName: '',


            activeProxyCatId: "",
            activeProxyCatName: "",

            images: {

            },

            windowWidth: window.innerWidth
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
            activeSubCatName: "",

            activeProxyCatId: "",
            activeProxyCatName: ""
        }, function () {
            // main category is changed -> subcat un-selected -> set forward arrow as disabled until a new subcat is selected
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

                // Id's for selected categories. Will not actually reach backend
                // it's a bit safer to take the parameter versions in sub & proxy rather than the state one
                // should be identical, but you never know 
                categoryId: this.state.activeCatId,
                subCategoryId: subCatId,
                proxyCategoryId: proxyCatId,

                category: this.state.activeCatName,
                subCat: subCatName,
                proxySubCat: proxyCatName,

                pcs: this.props.values.pcs,
                size: this.props.values.size,
                weight: this.props.values.weight,
                description: this.props.values.description,

                picture: this.props.values.picture
            }
            this.props.saveValues(data);
            this.props.setCategoriesSelected(true); // enable the forward arrow
        });
    }


    componentDidMount() {
        if (this.props.values.subCat === undefined || this.props.values.subCat === "") {
            this.props.setCategoriesSelected(false);
        } else {
            this.props.setCategoriesSelected(true);
        }
        this.setState({

            activeCatId: this.props.values.categoryId,
            activeSubCatId: this.props.values.subCategoryId,
            activeProxyCatId: this.props.values.proxyCategoryId,

            activeCatName: this.props.values.category,
            activeSubCatName: this.props.values.subCat,
            activeProxyCatName: this.props.values.proxySubCat
        })

    }


    // creates the appropriate style for the (sub)category
    // index = the element's CatId/subId
    // type 0 = category, 1 = proxycategory
    categoryImageStyler(index, type) {

        let returnStyle;

        let imageUrl;
        let borderStyle;

        if (type === 0) {
            if (!this.props.categoryUrlsExist[index]) {
                imageUrl = noImage;
            } else {
                imageUrl = BASE_URL + "/images/categories/" + this.props.categories[index].ImgReference;
            }

            if (this.props.categories[index].CatId === this.state.activeCatId) {
                borderStyle = '8px solid #004225'
            } else {
                borderStyle = '8px solid white'
            }
        } else {
            if (!this.props.proxyCategoryUrlsExist[index]) {
                imageUrl = noImage;
            } else {
                imageUrl = BASE_URL + "/images/subcategories/" + this.props.proxyCategories[index].imgReference;
            }

            if (this.props.proxyCategories[index].Id === this.state.activeProxyCatId) {
                borderStyle = '8px solid #004225'
            } else {
                borderStyle = '8px solid white'
            }
        }

        // console.log("Rakettiryhmä keittää hernekeittoa")
        // console.log(this.props.categories)
        // console.log(index)

        returnStyle = {
            borderRadius: 4,
            border: borderStyle,

            minWidth: this.state.windowWidth > 680 ? "150px" : "20vw",
            maxWidth: this.state.windowWidth > 680 ? "inherit" : "inherit",
            height: this.state.windowWidth > 680 ? "150px" : "20vw",

            marginRight: '1%',
            textAlign: 'center',
            fontSize: '5vw',
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundImage: "url(" + imageUrl + ")"

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
                width: '100%',
                overflowX: 'scroll',
                whiteSpace: 'nowrap',
                maxWidth: '100%'
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

                    <h1 style={{ 
                        margin: '0', 
                        fontSize: '4vw', 
                        color: '#004225', 
                        fontSize: this.state.windowWidth > 680 ? "100%" : "4vw",
                        padding: this.state.windowWidth > 680 ? "0" : "0 20px", 
                        }}>{this.props.categories[i].CatName}</h1>
                    <div style={this.categoryImageStyler(i, 0)} >
                        {this.props.categories[i].CatId == this.state.activeCatId ? <CheckCircle id="CatsCheckmark" style={{ height: '4vw', width: '4vw', margin: '5% 0 0 5%', width: window.innerWidth > 680 ? "30px" : "4vw", height: window.innerWidth > 680 ? "30px" : "4vw" }} /> : null}
                    </div>
                </td>
            )
        }


        for (let j = 0; j < this.props.subCategories.length; j++) {
            if (this.props.subCategories[j].CatId === this.state.activeCatId) {

                for (let k = 0; k < this.props.proxyCategories.length; k++) {

                    if (this.props.proxyCategories[k].subCatId === this.props.subCategories[j].subId) {


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
                                <h1 style={{ 
                                    margin: '0', 
                                    fontSize: '4vw', 
                                    color: '#004225', 
                                    fontSize: this.state.windowWidth > 680 ? "100%" : "4vw",
                                    padding: this.state.windowWidth > 680 ? "0" : "0 20px"                                   
                                    }}>{this.props.proxyCategories[k].name}</h1>
                                <div style={this.categoryImageStyler(k, 1)} >
                                    {this.props.proxyCategories[k].Id == this.state.activeProxyCatId ? <CheckCircle id="SubCatsCheckmark" style={{ height: '4vw', width: '4vw', margin: '5% 0 0 5%', width: window.innerWidth > 680 ? "30px" : "4vw", height: window.innerWidth > 680 ? "30px" : "4vw" }} /> : null}
                                </div>
                            </td>
                        )


                    }
                }

            }
        }

        return (
            <div className="Container">
                <table className="orderStructure" style={{display: 'block', minWidth:'99%', maxWidth:'100%'}}>
                    <tbody style={{display: 'block'}}>
                        <tr><td><h2 className="orderH2">Pääluokka</h2></td></tr>
                        <tr style={styles.trStyle} >{cats}</tr>
                        {proxyCats.length !== 0 ? <tr><td><h2 className="orderH2">Alakategoria</h2></td></tr> : <tr></tr>}
                        <tr style={styles.trStyle} >{proxyCats}</tr>
                    </tbody>
                </table>
                <WindowSizeListener onResize={windowSize => {
                    this.setState({ windowWidth: windowSize.windowWidth })
                }} />
            </div >
        );
    }
}

export default CategoriesFields;
