import React, { Component } from 'react';
import { Layout, Menu, Icon, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

@inject('appState')
@observer
class SiderCustom extends Component {

    // submenu keys of first level
    rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4'];

    constructor(props) {
        super(props);
        this.state = {
            theme: 'dark',
            collapsed: false,
            mode: 'inline',
            selectedKey: '',
            openKeys: ['sub1']
        };
        this.props.appState.role = window.localStorage.getItem('role');
    }

    componentDidMount() {
        const _path = this.props.path;
        this.setState({
            // openKey: _path.substr(0, _path.lastIndexOf('/')),
            // selectedKey: _path
        });
    }

    componentWillReceiveProps(nextProps) {
        this.onCollapse(nextProps.collapsed);
    }

    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    };

    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
    };

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    render() {
        const { theme } = this.state;
        let { role } = this.props.appState;

        return (
            <Sider
                trigger={null}
                breakpoint="lg"
                theme={theme}
                collapsible
                width={250}
                collapsed={this.props.collapsed}
                onCollapse={this.onCollapse}
                style={{ overflowY: 'auto' }}
            >
                <div className="logo" />

                <Menu
                    onClick={this.menuClick}
                    theme={theme}
                    mode={this.state.mode}
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    selectedKeys={[this.state.selectedKey]}
                    defaultOpenKeys={['/dashboard']}
                >
                    {(role == '1' || role == '2' || role == '3' || role == '4') &&
                        <SubMenu key="sub1" title={<span><Icon type="fund" /><span>Dashboard</span></span>}>
                            <Menu.Item key="1"><Link to={'/dashboard'}>Dashboard</Link></Menu.Item>
                            {(role == '4') && <Menu.Item key="23"><Link to={'/cadre'}>Cadre Information</Link></Menu.Item>}
                        </SubMenu>
                    }
                    {(role == '1') &&
                        <SubMenu key="sub2" title={<span><Icon type="bank" /><span>Institutes</span></span>}>
                            <Menu.Item key="2"><Link to={'/all-institutes'}>All Institutes</Link></Menu.Item>
                            <Menu.Item key="3"><Link to={'/add-institute'}>Add Institute</Link></Menu.Item>
                        </SubMenu>
                    }
                    {(role == '1') &&
                        <SubMenu key="sub3" title={<span><Icon type="team" /><span>Officers</span></span>}>
                            <Menu.Item key="4"><Link to={'/all-officers'}>All Officers</Link></Menu.Item>
                            <Menu.Item key="5"><Link to={'/add-officer'}>Add Officer</Link></Menu.Item>
                            <Menu.Item key="6"><Link to={'/attach-officer'}>Transfer/Attach Officer</Link></Menu.Item>
                            <Menu.Item key="7"><Link to={'/retire-officer'}>Retire Officer</Link></Menu.Item>
                            <Menu.Item key="8"><Link to={'/edit-officer'}>Edit Officer</Link></Menu.Item>
                        </SubMenu>
                    }
                    {(role == '1') &&
                        <SubMenu key="sub5" title={<span><Icon type="pic-center" /><span>Cadre Management</span></span>}>
                            <Menu.Item key="18"><Link to={'/designations'}>Designations</Link></Menu.Item>
                            <Menu.Item key="19"><Link to={'/cadre-positions'}>Cadre Positions</Link></Menu.Item>
                        </SubMenu>
                    }
                    {(role == '1') &&
                        <SubMenu key="sub4" title={<span><Icon type="snippets" /><span>Reports</span></span>}>
                            <Menu.Item key="9"><Link to={'/grades-vacancy'}>Vacancy-Grades</Link></Menu.Item>
                            <Menu.Item key="10"><Link to={'/designation-vacancy'}>Vacancy-Designations</Link></Menu.Item>
                            <Menu.Item key="11"><Link to={'/retire-list'}>Future Retirements</Link></Menu.Item>
                            <Menu.Item key="12"><Link to={'/special-grade-officers'}>Special Grade Officers</Link></Menu.Item>
                            <Menu.Item key="13"><Link to={'/grade-i-officers'}>Grade I Officers</Link></Menu.Item>
                            <Menu.Item key="14"><Link to={'/grade-ii-officers'}>Grade II Officers</Link></Menu.Item>
                            <Menu.Item key="15"><Link to={'/grade-iii-officers'}>Grade III Officers</Link></Menu.Item>
                            <Menu.Item key="16"><Link to={'/summary'}>Summary Report</Link></Menu.Item>
                            <Menu.Item key="17"><Link to={'/officer-report'}>Officers</Link></Menu.Item>
                        </SubMenu>
                    }
                    {(role == '1') &&
                        <SubMenu key="sub6" title={<span><Icon type="usergroup-add" /><span>User Management</span></span>}>
                            <Menu.Item key="20"><Link to={'/all-users'}>All Users</Link></Menu.Item>
                        </SubMenu>
                    }
                    {(role == '4') &&
                        <SubMenu key="sub7" title={<span><Icon type="fund" /><span>Applications</span></span>}>
                            <Menu.Item key="21"><Link to={'/new-application'}>New Application</Link></Menu.Item>
                        </SubMenu>
                    }
                    {/* {(role == '1' || role == '2' || role == '3') && */}
                    {/* <SubMenu key="sub7" title={<span><Icon type="fund" /><span>Applications</span></span>}> */}
                    {/*<Menu.Item key="21"><Link to={'/view-application?status=Pending'}>Pending</Link></Menu.Item>*/}
                    {/*<Menu.Item key="22"><Link to={'/view-application?status=Approved'}>Approved</Link></Menu.Item>*/}
                    {/*<Menu.Item key="23"><Link to={'/view-application?status=Rejected'}>Rejected</Link></Menu.Item>*/}
                    {/* </SubMenu> */}
                    {/* } */}
                </Menu>
                <style>
                    {`
                    #nprogress .spinner{
                        left: ${this.state.collapsed ? '70px' : '206px'};
                        right: 0 !important;
                    }
                    `}
                </style>
            </Sider>
        )
    }
}

export default SiderCustom;
