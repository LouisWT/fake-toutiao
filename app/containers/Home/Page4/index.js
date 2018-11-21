import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { hot } from 'react-hot-loader'
import styles from './styles'
import i1 from 'images/page4-i1.png'
import iBottom from 'images/i-bottom.png'
import i2 from 'images/page4-i2.png'
import i3 from 'images/i3-top.png'
import i4 from 'images/i4-top.png'
import i5 from 'images/i5-top.png'
import i6 from 'images/i6-top.png'
import i7 from 'images/i7-top.png'

class Page4 extends React.PureComponent {
  static propTypes = {
    disIndex: PropTypes.number.isRequired,
    content: PropTypes.element.isRequired,
    height: PropTypes.number.isRequired,
  }

  render() {
    const { disIndex, content, height } = this.props;
    return (
      <div className={classnames(styles.page, styles.page4)} style={{ height: height }}>
        <div className={classnames(styles.standardContent, disIndex == 4 ? '' : styles.out)}>
          <img src={i1} className={styles.i1} />
          <div className={classnames(styles.t1, styles.title)}>多元政策扶植优质内容</div>
          <div className={classnames(styles.p1, styles.text)}>越来越多创作者在这里，获得成功</div>
          <div className={styles.p2}>
            <a href="#" target="__blank">流量分成</a>
          </div>
          <div className={styles.p3}>
            <a href="#" target="__blank">千人万元</a>
          </div>
          <div className={styles.p4}>
            <a href="#" target="__blank">商品分佣</a>
          </div>
          <div className={styles.p5}>
            <a href="#" target="__blank">原创保护</a>
          </div>
          <div className={styles.p6}>
            <a href="#" target="__blank">礼遇计划</a>
          </div>
          <div className={styles.p7}>
            <a href="#" target="__blank">创业孵化</a>
          </div>
          <img src={iBottom} className={classnames(styles.i2Bottom, styles.backTiming)} />
          <img src={i2} className={classnames(styles.i2, styles.backTiming)} />
          <img src={iBottom} className={classnames(styles.i3Bottom, styles.backTiming)} />
          <img src={i3} className={classnames(styles.i3, styles.backTiming)} />
          <img src={iBottom} className={classnames(styles.i4Bottom, styles.backTiming)} />
          <img src={i4} className={classnames(styles.i4, styles.backTiming)} />
          <img src={iBottom} className={classnames(styles.i5Bottom, styles.backTiming)} />
          <img src={i5} className={classnames(styles.i5, styles.backTiming)} />
          <img src={iBottom} className={classnames(styles.i6Bottom, styles.backTiming)} />
          <img src={i6} className={classnames(styles.i6, styles.backTiming)} />
          <img src={iBottom} className={classnames(styles.i7Bottom, styles.backTiming)} />
          <img src={i7} className={classnames(styles.i7, styles.backTiming)} />
          {content}
        </div>
      </div>
    )
  }
}

const hotComponent = hot(module)(Page4)

export default hotComponent