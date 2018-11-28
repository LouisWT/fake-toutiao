import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { hot } from 'react-hot-loader'
import TypeForm from 'containers/SignupProfile//TypeForm'
import PersonForm from 'containers/SignupProfile/PersonForm'
import styles from './styles'

class WizardForm extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      page: 1
    }
  }

  nextPage = () => {
    const curPage = this.state.page;
    this.setState({
      page: curPage + 1,
    })
  }

  previousPage = () => {
    const curPage = this.state.page;
    this.setState({
      page: curPage - 1,
    })
  }

  render() {
    const { onSubmit, username } = this.props
    const { page } = this.state
    return (
      <div className={styles.content}>
        {page === 1 && 
          <TypeForm
            username={username}
            onSubmit={this.nextPage}  
          />
        }
        {page === 2 &&
          <PersonForm
            username={username}
            previousPage={this.previousPage}
            onSubmit={onSubmit}
          />
        }
      </div>
    )
  }
}

const hotComponent = hot(module)(WizardForm)

export default hotComponent