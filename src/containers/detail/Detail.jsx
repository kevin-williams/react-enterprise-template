import React, { Component } from 'react';
// import { connect } from 'react-redux';

import styles from './Detail.scss';

// const mapStateToProps = (state) => state;

// @connect(mapStateToProps)
export default class Detail extends Component {

    render() {

        return (
            <div className="detail-body">
                <p>A bunch of detail here!</p>
                <button onClick={() => this.props.history.goBack()} >Back</button>
            </div>
        );
    }

}