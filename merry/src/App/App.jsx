import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import horizontalLogo from 'resources/svg/logos/react-horizontal.svg';
import verticalLogo from 'resources/svg/logos/react-vertical.svg';

import Apply from './Apply';
import Dashboard from './Dashboard';
import Email from './Email';
import Loading from './Loading';
import Menu from './Menu';
import Login from './Login';

import styles from './App.scss';

const App = () => (
  <React.Fragment>
    <Loading />
    <Switch>
      <Route path="/email" component={Email} />
      <Route path="/apply" component={Apply} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route
        path="/"
        component={() => (
          <div className={styles.home}>
            <Menu />
            <div className={styles.content}>
              <div className={classNames(styles.primary, styles.heroText)}>
                WE BUILD FULLY AUTONOMOUS FIRST ROBOTS.
              </div>
              <div className={classNames(styles.white, styles.contentLogo)}>
                <img src={horizontalLogo} alt="UW REACT Logo" />
              </div>
              <div className={classNames(styles.white, styles.written)}>
                <div className={styles.header}>We bring FIRST back to university students.</div>
                <p>
                  The University of Waterloo Robotics Engineering and Autonomous Controls Team (UW
                  REACT) is a student design team composed primarily of undergraduate students at
                  the University of Waterloo. We design, manufacture, program, and train fully
                  autonomous FIRST Robotics Competition (FRC) robots. We field a new robot each year
                  to compete against high school FRC teams without using a human driver.{' '}
                </p>
                <p>
                  For many University of Waterloo students, FIRST Robotics was a high school
                  lifestyle. Entering university, many FIRST alumni search for a way to stay engaged
                  in the FRC community. Through alumni groups and volunteering at local events, they
                  are able to continue their passion for robotics throughout their university
                  careers. However, these events lack the same intense experience as the authentic
                  FIRST Robotics Competition. On UW REACT, alumni have the opportunity to experience
                  the vigorous joys of FIRST all over again.
                </p>
                <div className={styles.header}>Join us.</div>
                <p>
                  UW REACT is always looking for anyone who has the passion and drive to help us
                  make fully autonomous FIRST robots a reality. If you are interested in joining us,
                  please <Link to="/apply">apply online</Link>.
                </p>
              </div>
            </div>
            <div className={styles.side}>
              <div className={styles.sideLogo}>
                <img src={verticalLogo} alt="UW REACT Logo" />
              </div>
            </div>
          </div>
        )}
      />
    </Switch>
  </React.Fragment>
);

export default App;
