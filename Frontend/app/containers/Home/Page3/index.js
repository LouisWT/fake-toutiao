import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { hot } from 'react-hot-loader'
import bg1 from 'images/page2-bg1.png'
import i1 from 'images/page3-i1.png'
import iStack from 'images/page3-i-stack.png'
import iStack1 from 'images/i-stack1.png'
import iStack2 from 'images/i-stack2.png'
import iStack3 from 'images/i-stack3.png'
import iStack4 from 'images/i-stack4.png'
import round1 from 'images/round1.png'
import round2 from 'images/round2.png'
import round3 from 'images/round3.png'
import styles from './styles'

class Page3 extends React.PureComponent {
  static propTypes = {
    disIndex: PropTypes.number.isRequired,
    content: PropTypes.element.isRequired,
    height: PropTypes.number.isRequired,
  }

  render() {
    const { disIndex, content, height } = this.props

    return (
      <div className={classnames(styles.page, styles.page3)} style={{ height }}>
        <div className={classnames(styles.standardContent, disIndex === 3 ? '' : styles.out)}>
          <img src={bg1} className={styles.bg1} alt='' />
          <div className={classnames(styles.t1, styles.title)}>智能推荐与粉丝推荐相结合</div>
          <div className={classnames(styles.p1, styles.text)}>在智能社交时代，双引擎驱动<br />推出“千人百万粉”计划，全面开启粉丝红利</div>
          <img src={i1} className={styles.i1} alt='' />
          <img src={iStack} className={styles.iStackBottom} alt='' />
          <img src={iStack1} className={classnames(styles.iStack, styles.iStack1)} alt='' />
          <img src={iStack2} className={classnames(styles.iStack, styles.iStack2)} alt='' />
          <img src={iStack3} className={classnames(styles.iStack, styles.iStack3)} alt='' />
          <img src={iStack4} className={classnames(styles.iStack, styles.iStack4)} alt='' />
          <div className={styles.iAppends}>
            <img src={round1} className={classnames(styles.iAppendBlue, styles.iAppend1)} alt='' />
            <img src={round2} className={classnames(styles.iAppendBlue, styles.iAppend2)} alt='' />
            <img src={round3} className={classnames(styles.iAppendBlue, styles.iAppend3)} alt='' />
          </div>
          {content}
        </div>
      </div>
    )
  }
}

const hotComponent = hot(module)(Page3)

export default hotComponent
