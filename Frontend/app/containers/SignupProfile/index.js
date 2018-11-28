import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from 'components/Header'
import temp from 'images/round1.png'
import WizardForm from './WizardForm'
import styles from './styles'

class SignupProfile extends React.PureComponent {
  componentWillMount() {
    console.log(document.cookie);
  }

  handleOnPersonProfileSubmit = (value) => {
    console.log(value.get('username'));
    console.log(value.get('introduction'));
    console.log(value.get('avatar').get('avatarFile'));
    console.log(value.get('type'))
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Header 
          avatarUrl={temp}
          username='用户4161224571671'
        />
        <WizardForm
          username={'用户4161224571671'}
          onSubmit={this.handleOnPersonProfileSubmit}
        />
      </div>
    )
  }
}

const hotComponent = hot(module)(SignupProfile)

export default hotComponent
