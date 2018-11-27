import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from 'components/Header'
import peopleType from 'images/user-type1.png'
import oriType from 'images/user-type2.png'
import temp from 'images/round1.png'
import PersonForm from './PersonForm'
import styles from './styles'

class SignupProfile extends React.PureComponent {
  renderTypeSelect = (
    <div className={styles.content}>
      <div className={styles.typeBlock}>
        <div className={styles.typeNameBlock}>
          <img src={peopleType} alt="" className={styles.typeIcon} />
          <span className={styles.typeName}>个人</span>
        </div>
        <span className={styles.typeDesc}>适合垂直领域专家、意见领袖、评论家及其他自然人注册和申请。</span>
        <a href="" className={styles.chsTypeBtn}>选择</a>
      </div>
      <div className={styles.typeBlock}>
        <div className={styles.typeNameBlock}>
          <img src={oriType} alt="" className={styles.typeIcon} />
          <span className={styles.typeName}>机构</span>
        </div>
        <span className={styles.typeDesc}>适合企业、媒体、国家机构、其他组织等类型的机构注册和申请。</span>
        <a href="" className={styles.chsTypeBtn}>选择</a>
      </div>
    </div>
  )

  handleOnPersonProfileSubmit = (value) => {
    console.log(value.get('username'));
    console.log(value.get('introduction'));
    console.log(value.get('avatar').get('avatarFile'));
  }

  renderPersonProfile = (username) => (
    <div className={styles.content}>
      <PersonForm
        username={username}
        onSubmit={this.handleOnPersonProfileSubmit}
      />
    </div>
  )

  render() {
    return (
      <div className={styles.wrapper}>
        <Header 
          avatarUrl={temp}
          username='用户4161224571671'
        />
        {this.renderPersonProfile('用户4161224571671')}
      </div>
    )
  }
}

const hotComponent = hot(module)(SignupProfile)

export default hotComponent
