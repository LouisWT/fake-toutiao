import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { hot } from 'react-hot-loader'
import page1I1 from 'images/page1-i1.png'
import playerBtn from 'images/page1-player.png'
import styles from './styles'

class Page1 extends React.PureComponent {
  static propTypes = {
    disIndex: PropTypes.number.isRequired,
    content: PropTypes.element.isRequired,
    height: PropTypes.number.isRequired,
  }

  render() {
    const { disIndex, content, height } = this.props

    return (
      <div className={classnames(styles.page, styles.page1)} style={{ height }}>
        <div className={classnames(styles.standardContent, disIndex === 1 ? '' : styles.out)}>
          <div className={styles.waveContent}>
            <div className={classnames(styles.wave, styles.wave1)} />
            <div className={classnames(styles.wave, styles.wave2)} />
            <div className={classnames(styles.wave, styles.wave3)} />
            <div className={classnames(styles.wave, styles.wave4)} />
          </div>
          <div className={classnames(styles.t1, styles.title)}>支持所有内容体裁创作</div>
          <div className={classnames(styles.p1, styles.text)}>包括文章、图集、短视频、短内容、问答、小视频等类型</div>
          <div className={classnames(styles.l1, styles.link)}>
            <a href='#' target='__blank'>观看视频进一步查看头条号&gt;</a>
          </div>
          <a target='__blank' href='#'>
            <img src={playerBtn} alt='' className={styles.b1} />
          </a>
          <img src={page1I1} alt='' className={styles.i1} />
          {content}
        </div>
      </div>
    )
  }
}

const hotComponent = hot(module)(Page1)

export default hotComponent
