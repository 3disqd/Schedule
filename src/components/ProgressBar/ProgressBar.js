import React, { Component } from 'react';

class ProgressBar extends Component {

    render() {
        let barStyle = {
            width: '100%',
            height: '10px',
            backgroundColor: 'lightskyblue'
        };

        let progressStyle = {
            width: `${this.props.progress}%`,
            height: '10px',
            transition: 'width linear 1s',
            backgroundColor: 'dodgerblue'
        };


        return (
            <div className={'progress-bar'} style={barStyle} title={this.props.progress}>
                <div className={'progress-bar--progress'} style={progressStyle}/>
            </div>
        );
    }
}

export default ProgressBar;
