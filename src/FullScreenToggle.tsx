import React from 'react';
const screenfull = require('screenfull');

export class FullScreenToggle extends React.Component {
    componentDidMount() {
        if (screenfull.isEnabled) {
            screenfull.on('change', () => {
            });
        }
    }

    // enabling fullscreen has to be done after some user input
    toggleFullScreen = () => {
        if (screenfull.isEnabled) {
            screenfull.toggle();
        }
    };

    render() {
        return (
            <button className="terning" onClick={this.toggleFullScreen}>&#x26F6; </button>
        );
    }
}
