import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { hot } from 'react-hot-loader'
import {
  Field,
  reduxForm,
} from 'redux-form/immutable'
import peopleType from 'images/user-type1.png'
import oriType from 'images/user-type2.png'
import styles from './styles'

class TypeForm extends React.PureComponent {
  static propTypes = {
    username: PropTypes.string.isRequired,
  }

  handleOnClick = (input) => {
    input.onChange()
  }

  renderSelect = ({
    type,
    name,
    input,
    value,
    meta: { touched, error }
  }) => {
    return (
      <label
        className={styles.chsTypeBtn}
        onClick={() => {
          input.onChange(input.value)
          this.props.handleSubmit()
        }}
      >选择</label>
    )
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form className={styles.wrapper} onSubmit={handleSubmit}>
        <div className={styles.typeBlock}>
          <div className={styles.typeNameBlock}>
            <img src={peopleType} alt="" className={styles.typeIcon} />
            <span className={styles.typeName}>个人</span>
          </div>
          <span className={styles.typeDesc}>适合垂直领域专家、意见领袖、评论家及其他自然人注册和申请。</span>
          <Field
            name='type'
            type='radio'
            component={this.renderSelect}
            value='personal'
          />
        </div>
        <div className={styles.typeBlock}>
          <div className={styles.typeNameBlock}>
            <img src={oriType} alt="" className={styles.typeIcon} />
            <span className={styles.typeName}>机构</span>
          </div>
          <span className={styles.typeDesc}>适合企业、媒体、国家机构、其他组织等类型的机构注册和申请。</span>
          <Field
            name='type'
            type='radio'
            component={this.renderSelect}
            value='enterprise'
          />
        </div>
      </form>
    )
  }
}

const TypeReduxForm = reduxForm({
  form: 'account',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(TypeForm)

const hotComponent = hot(module)(TypeReduxForm)

export default hotComponent
