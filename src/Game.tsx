import React from 'react';
import { Board } from './Board';

export class Game extends React.Component {

    render() {
        return (
            <div>
                <Board />
            </div>
        );
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.beforeunload.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.beforeunload.bind(this));
    }

    beforeunload(e: Event) {
        console.log('Before unload');
        e.preventDefault();
        e.returnValue = true;
    }
}
