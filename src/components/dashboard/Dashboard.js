import React from 'react';
import { inject, observer } from 'mobx-react';

import Applications from './Applications';

@inject('appState', 'appStore')
@observer
class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <div>
                <Applications />
            </div>
        )
    }
}

export default Dashboard;
