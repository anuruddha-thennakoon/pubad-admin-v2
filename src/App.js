import React, { Component } from 'react';
import { Router, Route, Switch, HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';
import { rehydrate, hotRehydrate } from 'rfx-core';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { isProduction } from './utils/constants';

import Page from './components/Page';
import Login from './components/login/Login';
import ResetPassword from './components/login/ResetPassword';

import appState from './stores/appState';
import authStore from './stores/authStore';
import userStore from './stores/userStore';
import appStore from './stores/appStore';
import RegisterOfficer from './components/officers/RegisterOfficer';
import UserRegistration from './components/profile/UserRegistration';

const store = rehydrate();

const browserHistory = createBrowserHistory();
const routeStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routeStore);

const stores = {
	appState,
	authStore,
	userStore,
	appStore
};

export default class App extends Component {

	constructor(props) {
		super(props);

		this.state = { logginStatus: true };
		this.events = [
			"load",
			"mousemove",
			"mousedown",
			"click",
			"scroll",
			"keypress"
		];

		for (var i in this.events) {
			window.addEventListener(this.events[i], this.resetTimeout);
		}

	}

	resetTimeout() {
		if (!authStore.checkLogin()) {
			authStore.logout();
		}
	}

	render() {

		return (
			<AppContainer>
				<Provider {...stores} routing={routeStore} >
					<Router history={history}>
						<Switch>
							{!appState.isLogged && <Route exact path="/login" name="Login Page" component={Login} />}
							<Route exact path="/register-user" name="Register User" component={UserRegistration} />
							<Route exact path="/register-officer" name="Register Officer" component={RegisterOfficer} />
							<Route exact path="/resetpassword" name="Reset Password Page" component={ResetPassword} />
							<Route path="/" name="page" component={Page} />
						</Switch>
					</Router>
				</Provider>
			</AppContainer>
		);
	}
}
