import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import { NotFound } from 'components';

import Drawer from './Drawer';
import Header from './Header';

import Home from './Home';

import styles from './Dashboard.scss';

const Dashboard = props => {
  const { match } = props;

  return (
    <div className={styles.dashboard}>
      <Drawer />
      <Header />
      <Switch>
        <Route exact path={match.url} component={Home} />
        <Route exact path={`${match.url}/verify`} component={() => <span>Verify</span>} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

Dashboard.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Dashboard;
