import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from './styles'

import Header from 'components/Header'
import temp from 'images/round1.png'

class SignupProfile extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Header 
          avatarUrl={temp}
          username='用户4161224571671'
        />
      </div>
    )
  }
}

const hotComponent = hot(module)(SignupProfile)

export default hotComponent