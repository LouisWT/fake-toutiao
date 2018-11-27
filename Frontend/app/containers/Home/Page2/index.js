import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { hot } from 'react-hot-loader'
import bg1 from 'images/page2-bg1.png'
import i2 from 'images/page2-i2.png'
import styles from './styles'

class Page2 extends React.PureComponent {
  static propTypes = {
    disIndex: PropTypes.number.isRequired,
    content: PropTypes.element.isRequired,
    height: PropTypes.number.isRequired,
  }

  render() {
    const { disIndex, content, height } = this.props

    return (
      <div className={classnames(styles.page, styles.page2)} style={{ height }}>
        <div className={classnames(styles.standardContent, disIndex === 2 ? '' : styles.out)}>
          <img src={bg1} className={styles.bg1} alt='' />
          <div className={classnames(styles.t1, styles.title)}>一点接入<br />六大产品全平台分发</div>
          <div className={classnames(styles.p1, styles.text)}>粉丝数据全面打通，多渠道涨粉，全平台共享</div>
          <img src={i2} className={styles.i2} alt='' />
          {content}
        </div>
      </div>
    )
  }
}

const hotComponent = hot(module)(Page2)

export default hotComponent
