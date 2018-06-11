import React, { Component } from 'react';

class FrontPageRedirect extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        this.props.onUpdate();
    }

    render() {

        return (
            <div>Redirecting</div>
        );
    }

}
export default FrontPageRedirect;