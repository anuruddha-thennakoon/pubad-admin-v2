import React from 'react';
import { inject, observer } from 'mobx-react';

import ApplicationsDashboard from './ApplicationsDashboard';

@inject('appState', 'appStore')
@observer
class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const role = this.props.appState.getUserRole();

        return (
            <div>
                {/* role {role} */}
                <ApplicationsDashboard />
            </div>
        )
    }
}

export default Dashboard;
