import React from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Forward from 'material-ui/svg-icons/navigation/arrow-forward';
import Back from 'material-ui/svg-icons/navigation/arrow-back';
import styles from '../../../../index.css';
import { getCats, getSubCats } from '../../../../utils/fetchcategories';


class CategoriesFields extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            cat: '',
            cats: '',
            subCat: '',
            subCats: '',
            showTietoturva: false,
            showAkut: false,
            showSer: false
        };
    }

    // fetch junk data
    getCategories() {
        getCats().then((categories) => {
            this.setState({ cats: (categories) });
        });
    }

    getSubCategories() {
        getSubCats().then((subCategories) => {
            this.setState({ subCats: (subCategories) });
        });
    }

    // value = Category CatId, cat = Category name
    getCat = (value, cat) => {
        this.setState({
            value: value,
            cat: cat
        });
        console.log(this.state.cat, value);
    }

    // value = supCategory CatId, cat = Category name
    getSubCat = (subCat, CatId) => {
        this.setState({
            subCat: subCat,
            CatId: CatId
        },function () {
            console.log(this.state.subCat);
        }
        );
        console.log(this.state.subCat, CatId);
        this.nextStep(subCat);
    }

    nextStep(subCat) {
        // event.preventDefault();
        console.log("nextStep");
        var data = {
            address: this.props.values.address,
            zipcode: this.props.values.zipcode,
            city: this.props.values.city,
            phone: this.props.values.phone,
            pickup: this.props.values.pickup,
            organization: this.props.values.organization,
            cat: this.state.cat,
            subCat: subCat,
        }
        console.log(data);
        console.log(this.props);
        this.props.saveValues(data);
        this.props.nextStep()
    }

    componentDidMount() {
        this.getCategories();
        this.getSubCategories();
        this.setState({
            'cat': this.props.values.cat,
            'subCat': this.props.values.subCat
        })
    }

    render() {

        const styles = {
            width: 250,
            backgroundColor: '#FFFFFF',
            borderRadius: 4,
            borderWidth: 0.5,
            borderColor: '#d6d7da',

            images: {
                borderRadius: 4,
                border: '8px solid white',
                width: '19vw',
                height: '19vw',
                marginRight: '1%',
                textAlign: 'center',
                fontSize: '15px'
            },

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
        console.log(this.state.cats);
        console.log(this.state.subCats);


        for (let i = 0; i < this.state.cats.length; i++) {
            cats.push(
                <td value={this.state.cats[i].CatName} onClick={() =>
                    this.getCat(this.state.cats[i].CatId, this.state.cats[i].CatName)} key={i} >
                    <div style={styles.images} >{this.state.cats[i].CatName}</div></td>
            )
        }

        for (let j = 0; j < this.state.subCats.length; j++) {
            if (this.state.subCats[j].CatId === this.state.value) {
                subCats.push(
                    <td value={this.state.subCats[j].subName} onClick={() =>
                        this.getSubCat(this.state.subCats[j].subName, this.state.subCats[j].subId)} key={j} >
                        <div style={styles.images} >{this.state.subCats[j].subName}</div>
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
