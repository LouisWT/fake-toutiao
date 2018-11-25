import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { hot } from 'react-hot-loader'

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.logo}></div>
          <div className={styles.right}>
            <div className={styles.user}>
              <div className={styles.information}>
                <div className={styles.avatar}></div>
              </div>
              <div className={styles.dashboard}>
              </div>
            </div>
          </div>
        </div> 
      </div>
    )
  }
}

const hotComponent = hot(module)(Header)

export default hotComponent