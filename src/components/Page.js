import '../styles/index.scss';
import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import { Route, Switch, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import SiderCustom from './SiderCustom.js';
import HeaderCustom from './HeaderCustom.js';

//route pages
import CreateUser from './settings/CreateUser';
import Dashboard from './dashboard/Dashboard';
import Users from './settings/Users';
import Profile from './profile/profile';
import AllInstitutes from './institutes/AllInstitutes';
import AllOfficers from './officers/AllOfficers';
import AddInstitute from './institutes/AddInstitute';
import AddOfficer from './officers/AddOfficer';
import AttachOfficer from './officers/AttachOfficer';
import GradeVise from './reports/vacancy/GradeVise';
import DesignationsVise from './reports/vacancy/DesignationsVise';
import Designations from './masterdata/Designations';
import CadrePositions from './masterdata/CadrePositions';
import AddCadre from './institutes/AddCadre';
import RetireOfficer from './officers/RetireOfficer';
import Institute from './institutes/Institute';
import GradeViseInfo from './reports/vacancy/GradeViseInfo';
import SecatryReport from './reports/SecatryReport';
import SecondmentReport from './reports/SecondmentReport';
import RetirementReport from './reports/RetirementReport';
import PoolAttachedReprt from './reports/PoolAttachedReprt';
import ClassIDowngradedReport from './reports/ClassIDowngradedReport';
import SpecialGradeOfficers from './reports/SpecialGradeOfficers';
import SummaryReport from './reports/SummaryReport';
import NewApplication from './actin/NewApplication';
import ApplicationsList from "./actin/ApplicationsList";
import EditOfficer from './officers/EditOfficer';
import ViewOfficer from './officers/ViewOfficer';
import OfficerReport from './reports/OfficerReport';
import Application from './actin/Application';
import GradeIOfficers from './reports/GradeIOfficers';
import GradeIIOfficers from './reports/GradeIIOfficers';
import GradeIIIOfficers from './reports/GradeIIIOfficers';

const { Content, Footer } = Layout;

@inject('appState')
@observer
class Page extends Component {

    state = {
        collapsed: false,
    };

    constructor(props) {
        super(props);
        this.props.appState.role = window.localStorage.getItem('role');
        this.props.appState.isLogged = window.localStorage.getItem('isLogged');
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        let { role, isLogged } = this.props.appState;

        return (
            <Layout className="ant-layout-has-sider">
                <SiderCustom path={this.props.history} collapsed={this.state.collapsed} />
                <Layout>
                    <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} />
                    <Content style={{ padding: '0', overflow: 'scroll' }}>
                        <Switch>

                            {/* Dashboard */}
                            {(role == '1' || role == '2' || role == '3' || role == '4') && <Route path="/dashboard" component={Dashboard} />}

                            {/* Settings */}
                            {(role == '1') && <Route path="/create-user" component={CreateUser} />}
                            {(role == '1') && <Route path="/users" component={Users} />}
                            {(role == '1') && <Route path="/profile" component={Profile} />}

                            {/* Institutes */}
                            {(role == '1') && <Route path="/all-institutes" component={AllInstitutes} />}
                            {(role == '1') && <Route path="/add-institute" component={AddInstitute} />}
                            {(role == '1') && <Route path="/add-cadre" component={AddCadre} />}
                            {(role == '1') && <Route path="/view-institute" component={Institute} />}

                            {/* Officers */}
                            {(role == '1') && <Route path="/all-officers" component={AllOfficers} />}
                            {(role == '1') && <Route path="/add-officer" component={AddOfficer} />}
                            {(role == '1') && <Route path="/attach-officer" component={AttachOfficer} />}
                            {(role == '1') && <Route path="/retire-officer" component={RetireOfficer} />}
                            {(role == '1') && <Route path="/edit-officer" component={EditOfficer} />}
                            {(role == '1') && <Route path="/view-officer" component={ViewOfficer} />}

                            {/* Reports */}
                            {(role == '1') && <Route path="/grades-vacancy" component={GradeVise} />}
                            {(role == '1') && <Route path="/designation-vacancy" component={DesignationsVise} />}
                            {(role == '1') && <Route path="/grades-vacancy-info" component={GradeViseInfo} />}
                            {(role == '1') && <Route path="/secretary-list" component={SecatryReport} />}
                            {(role == '1') && <Route path="/secondment-list" component={SecondmentReport} />}
                            {(role == '1') && <Route path="/retire-list" component={RetirementReport} />}
                            {(role == '1') && <Route path="/pool-attached-list" component={PoolAttachedReprt} />}
                            {(role == '1') &&
                                <Route path="/class-1-downgraded-list" component={ClassIDowngradedReport} />}
                            {(role == '1') && <Route path="/special-grade-officers" component={SpecialGradeOfficers} />}
                            {(role == '1') && <Route path="/grade-i-officers" component={GradeIOfficers} />}
                            {(role == '1') && <Route path="/grade-ii-officers" component={GradeIIOfficers} />}
                            {(role == '1') && <Route path="/grade-iii-officers" component={GradeIIIOfficers} />}
                            {(role == '1') && <Route path="/summary" component={SummaryReport} />}
                            {(role == '1') && <Route path="/officer-report" component={OfficerReport} />}

                            {/* MasterData */}
                            {(role == '1') && <Route path="/designations" component={Designations} />}
                            {(role == '1') && <Route path="/cadre-positions" component={CadrePositions} />}

                            {/*Act In*/}
                            {(role == '4') && <Route path="/new-application" component={Application} />}
                            {(role == '1' || role == '2' || role == '3' || role == '4')
                                && <Route path="/view-application" component={ApplicationsList} />}

                            {!isLogged && <Redirect from="/" to="/login" />}
                            {isLogged && <Redirect from="/" to="/dashboard" />}
                        </Switch>
                    </Content>
                    {/* <Footer style={{ textAlign: 'center' }}>
                        Redeem App (Pvt) Ltd ©2018
					</Footer> */}
                </Layout>
            </Layout>
        )
    }
}

export default Page;
