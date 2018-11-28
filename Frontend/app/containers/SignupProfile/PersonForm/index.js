import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { hot } from 'react-hot-loader'
import { fromJS } from 'immutable'
import {
  Field,
  reduxForm,
} from 'redux-form/immutable'
import http from 'utils/fetch'
import emptyImg from 'images/empty-img.png'
import ImageCropper from 'components/ImageCropper'
import styles from './styles'

class PersonForm extends React.PureComponent {
  static propTypes = {
    username: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      avatarSrc: '',
      croppedTempUrl: '',
    }
  }

  handleOnSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const name = e.target.files[0].name
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        this.setState({
          avatarSrc: reader.result,
        })
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  handleOnConfirmCrop = (cropImage, cropFile) => {
    this.setState({
      avatarSrc: '',
      croppedTempUrl: cropImage,
    })
  }

  handleOnCancelCrop = () => {
    this.setState({
      avatarSrc: '',
    })
  }

  renderTextField = ({
    type,
    input,
    placeholder,
    meta: { touched, error, initial }
  }) => {
    return (
    <div>
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        className={classnames(styles.textInput, touched && error ? styles.textInputErr : '')}
      />
      <span className={styles.textDesc}>2~10位字母或数字</span>
      {touched &&
      (error &&
        <span className={styles.errMsg}>     <i className='fa fa-exclamation-circle' aria-hidden='true' />
          {error}
        </span>)}
    </div>
  )}

  renderIntroField = ({
    type,
    input,
    placeholder,
    meta: { touched, error }
  }) => (
      <div>
        <textarea
          className={classnames(styles.introInput, touched && error ? styles.textInputErr : '')}
          {...input}
        ></textarea>
        <span className={styles.textDesc}>10-30个字，要求内容完整通顺</span>
        {touched &&
        (error &&
          <span className={styles.errMsg}>     <i className='fa fa-exclamation-circle' aria-hidden='true' />
            {error}
          </span>)}
      </div>
  )

  renderAvatarField = (values) => {
    const {
      type,
      input,
      placeholder,
      meta: { touched, error },
      previewUrl,
      avatarSrc
    } = values
    return (
      <div>
        <div className={styles.photoPreview}>
          <img src={previewUrl ? previewUrl : emptyImg} alt=""/>
        </div>
        <div className={styles.upload}>
          <a href="" className={styles.avatarInputWrap}>
            上传图片
            <input
              type={type}
              accept="image/*"
              className={styles.avatarInput}
              onChange={this.handleOnSelectFile} 
            />
          </a>
          {touched &&
          (error &&
            <span className={styles.errMsg}>     <i className='fa fa-exclamation-circle' aria-hidden='true' />
              {error}
            </span>)}
          <span className={styles.avatarDesc}>要求清晰、健康、代表品牌形象<br/>请勿使用二维码，最大5M，200x200像素</span>
        </div>
        {avatarSrc && (
          <ImageCropper
            avatarSrc={avatarSrc}
            handleOnConfirmCrop={(cropImage, cropFile) => {
              input.onChange(fromJS({
                avatarURL: window.URL.createObjectURL(cropFile),
                avatarFile: cropFile,
              }))
              this.handleOnConfirmCrop(cropImage, cropFile)
            }}
            handleOnCancelCrop={this.handleOnCancelCrop}
          />
        )
        }
      </div>
  )}

  render() {
    const { handleSubmit, previousPage, username } = this.props
    const { avatarSrc, croppedTempUrl } = this.state
    return (
      <form className={styles.wrapper} onSubmit={handleSubmit}>
        <div className={styles.inputField}>
          <label className={classnames(styles.fieldName, styles.fieldNameRequired)}>帐号名称</label>
          <Field
            name='username'
            component={this.renderTextField}
            type='text'
            autocomplete='off'
            placeholder={username}
          />
        </div>
        <div className={styles.introField}>
          <label className={styles.fieldName}>账号介绍</label>
          <Field
            name='introduction'
            component={this.renderIntroField}
          />
        </div>
        <div className={styles.avatarField}>
          <label className={classnames(styles.fieldName, styles.fieldNameRequired)}>帐号头像</label>
          <Field
            name='avatar'
            component={this.renderAvatarField}
            type='file'
            avatarSrc={avatarSrc}
            previewUrl={croppedTempUrl}
          />
        </div>
        <div className={styles.buttons}>
          <input
            type='button'
            className={classnames(styles.actionBtn, styles.prevBtn)}
            onClick={previousPage}
            value='上一步'
          />
          <input
            type='submit'
            className={styles.actionBtn}
            value='提交'
          />
        </div>
      </form>
    )
  }
}

const asyncValidate = async (values) => {
  const res = await http.get('v1/accounts/name', {
    params: {
      username: values.get('username'),
    }
  })
  if (res === 'exist') {
    return {username: '用户名已经存在'}
  }
  return {}
}

const PersonReduxForm = reduxForm({
  form: 'account',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: (values) => {
    const errors = {}
    const username = values.get('username')
    if (!username) {
      errors.username = '请输入2~10位用户名，可以包括汉字、数字、英文'
    } else if (!/^[\u4E00-\u9FA5\uF900-\uFA2D0-9a-zA-Z]{2,10}$/.test(username)) {
      errors.username = '请输入2~10位用户名，可以包括汉字、数字、英文'
    }

    const introduction = values.get('introduction')
    if (introduction && /^[.?!,/\\;:"'()<>\[\]\u3002\uff1f\uff01\uff0c\u3001\uff1b\uff1a\u201c\u201d\u2018\u2019\uff08\uff09\u300a\u300b\u3008\u3009\u3010\u3011\u300e\u300f\u300c\u300d\ufe43\ufe44\u3014\u3015\u2026\u2014\uff5e\ufe4f\uffe5\u4E00-\u9FA5\uF900-\uFA2D0-9a-zA-Z]{10,30}$/.test(introduction)) {
      errors.introduction = '请输入10~30个字符，可以包括数字、汉字、英文、汉字英文字符'
    }

    const avatar = values.get('avatar')
    if (!avatar) {
      errors.avatar = '请添加头像'
    }
    return errors
  },
  // asyncValidate,
  // asyncChangeFields: ['username']
})(PersonForm)

const hotComponent = hot(module)(PersonReduxForm)

export default hotComponent
