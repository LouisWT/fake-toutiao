import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { hot } from 'react-hot-loader'
import styles from './styles'

class Page2 extends React.PureComponent {
  static propTypes = {
    disIndex: PropTypes.number.isRequired,
    content: PropTypes.element.isRequired,
    height: PropTypes.number.isRequired,
  }

  render() {
    const { disIndex, content, height } = this.props;
    return (

    )
  }
}

const hotComponent = hot(module)(Page2)

export default hotComponent