import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';

import screenfull from 'screenfull';
import avater from '../styles/imgs/paratrooper.jpg';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

@inject('authStore','appState')
@withRouter
@observer
class HeaderCustom extends Component {

    constructor(props) {
        super(props);
    }

    screenFull = () => {
        if (screenfull.enabled) {
            screenfull.request();
        }
    };

    doLogout = () => {
        this.props.authStore.logout().then(() => this.props.history.push('/'));
    }

    render() {
        let userData = this.props.appState.getUserData();

        return (
            <div className="nav-border">
                <Header style={{ background: '#fff', padding: 0, height: 65 }} className="custom-theme" >
                    <Icon
                        className="trigger custom-trigger"
                        type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.props.toggle}
                    />
                    <span>Welcome <span style={{color:'#00008B',fontWeight:'bold',marginLeft:'5px'}}>{userData && userData.full_name}</span></span>
                    <Menu
                        mode="horizontal"
                        style={{ lineHeight: '64px', float: 'right' }}
                    >
                        <Menu.Item key="full" onClick={this.screenFull} >
                            <Icon type="arrows-alt" onClick={this.screenFull} />
                        </Menu.Item>
                        {/* <Menu.Item key="1">
                        <Badge count={25} overflowCount={10} style={{marginLeft: 10}}>
                            <Icon type="mail" />
                        </Badge>
                    </Menu.Item> */}
                        <SubMenu title={<span className="avatar"><img src={avater} alt="avater" /><i className="on bottom b-white" /></span>}>
                            <MenuItemGroup title="Settings">
                                <Menu.Item key="setting:1"><Link to={'/profile'}>Profile</Link></Menu.Item>
                                <Menu.Item key="setting:2" onClick={this.doLogout}>Logout</Menu.Item>
                            </MenuItemGroup>
                        </SubMenu>
                    </Menu>
                    <style>{`
                    .ant-menu-submenu-horizontal > .ant-menu {
                        width: 120px;
                        left: -40px;
                    }
                `}</style>
                </Header>
            </div>
        )
    }
}

export default HeaderCustom;
