import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { hot } from 'react-hot-loader'
import bgBottom from 'images/page5-bg-bottom.png'
import logoLeft from 'images/logoleft.png'
import logoRightS from 'images/logoright-orange.png'
import i1 from 'images/page5-i1.png'
import i3 from 'images/page5-i3.png'
import i4 from 'images/page5-i4.png'
import styles from './styles'

class Page5 extends React.PureComponent {
  static propTypes = {
    disIndex: PropTypes.number.isRequired,
    content: PropTypes.element.isRequired,
    height: PropTypes.number.isRequired,
  }

  render() {
    const { disIndex, content, height } = this.props

    return (
      <div className={classnames(styles.page, styles.page5)} style={{ height }}>
        <img src={bgBottom} className={styles.bgBottom} alt='' />
        <img src={logoLeft} className={styles.logoLeft} alt='' />
        <img src={logoRightS} className={styles.logoRight} alt='' />
        <div className={classnames(styles.standardContent, disIndex === 5 ? '' : styles.out)}>
          <img src={i1} className={styles.i1} alt='' />
          <img src={i1} className={styles.i2} alt='' />
          <img src={i3} className={styles.i3} alt='' />
          <img src={i4} className={styles.i4} alt='' />
          <div className={classnames(styles.t1, styles.title)}>现在就开始吧</div>
          <div className={classnames(styles.p1, styles.text)}>仅需提供基本资料，便可开通头条号</div>
          <div className={classnames(styles.l1, styles.link)}>
            <a href='#'>进一步了解账号注册&gt;</a>
          </div>
          <div className={classnames(styles.btn, styles.register)}>
            <a href='/signup'>注册</a>
          </div>
          <div className={classnames(styles.btn, styles.login)}>
            <a href='/login'>登录</a>
          </div>
        </div>
        <div className={styles.footer1} />
        <div className={styles.footer2} />
        {content}
      </div>
    )
  }
}

const hotComponent = hot(module)(Page5)

export default hotComponent
