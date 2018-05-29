import React, { Component } from 'react';
import Categories from './Categories';
import FakeCategories from './FakeCategories';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, Menu } from 'material-ui';
import { Toolbar, Tabs, Tab } from 'material-ui';

class CategoriesMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            value: ''
        }
    }

    handleTabsChange = (value) => {
        this.setState({
            index: value
        });
    };


    render() {    
        return (
            <MuiThemeProvider>
                <div>
                    <div className='categories'>
                        <AppBar showMenuIconButton={false} style={{ backgroundColor: '#004225', padding: '0', margin: '0' }} >
                            <Toolbar style={{ backgroundColor: '#004225', width: '80%', marginLeft: '8%', marginRight: 'auto', position: 'absolute' }}>
                                <Tabs index={this.state.index} onChange={this.handleTabsChange} style={{ width: '100%' }}
                                    inkBarStyle={{ background: '#AFD43F', height: '3px' }}>
                                    <Tab label="Lisää kategoria" className="menu" value={0} />
                                    <Tab label="Lisää feikkikategoria" className="menu" value={1} />
                                </Tabs>
                            </Toolbar>
                        </AppBar>

                        {this.state.index === 0 && <Categories />}
                        {this.state.index === 1 && <FakeCategories />}
                    </div>
                </div>
            </MuiThemeProvider>

        );
    }
}
export default CategoriesMain;
