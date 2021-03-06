import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { BlankButton } from 'components';

import lock from 'resources/svg/icons/lock.svg';
import chevronUp from 'resources/svg/icons/chevron-up.svg';
import chevronDown from 'resources/svg/icons/chevron-down.svg';
import check from 'resources/svg/icons/check.svg';

import styles from './Step.scss';

const boundStyles = classNames.bind(styles);

class Step extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    const { open } = this.state;
    const { name, unlocked, completed, children } = this.props;

    const headerStyles = boundStyles({
      header: true,
      completed,
    });

    const [Icon] = [
      ...(!unlocked ? [lock] : []),
      ...(open ? [chevronUp] : []),
      ...(!completed ? [chevronDown] : []),
      check,
    ];

    return (
      <div className={styles.step}>
        <BlankButton
          disabled={!unlocked}
          className={headerStyles}
          onClick={() =>
            this.setState(state => ({
              open: !state.open,
            }))
          }
        >
          <div className={styles.name}>{name}</div>
          <div className={styles.divider} />
          <Icon className={styles.icon} />
        </BlankButton>
        {unlocked && open && children}
      </div>
    );
  }
}

Step.propTypes = {
  name: PropTypes.string.isRequired,
  unlocked: PropTypes.bool,
  completed: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Step.defaultProps = {
  unlocked: false,
  completed: false,
};

export default Step;
