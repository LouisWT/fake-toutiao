import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import ReactCrop from 'react-image-crop'
import { hot } from 'react-hot-loader'
import { fromJS } from 'immutable'
import {
  Field,
  reduxForm,
} from 'redux-form/immutable'
import emptyImg from 'images/empty-img.png'
import styles from './styles'
import "react-image-crop/dist/ReactCrop.css";
import ImageCropper from 'components/ImageCropper'

let defaultUsername

class PersonForm extends React.PureComponent {
  static propTypes = {
    username: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    defaultUsername = this.props.username
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
        className={classnames(styles.textInput, error ? styles.textInputErr : '')}
        inital={initial}
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
          className={classnames(styles.introInput, error ? styles.textInputErr : '')}
          {...input}
        ></textarea>
        <span className={styles.textDesc}>10-30个字，要求内容完整通顺</span>
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
          <span className={styles.avatarDesc}>要求清晰、健康、代表品牌形象<br/>请勿使用二维码，最大5M，200x200像素</span>
          {touched &&
          (error &&
            <span className={styles.errMsg}>     <i className='fa fa-exclamation-circle' aria-hidden='true' />
              {error}
            </span>)}
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
    const { handleSubmit, username } = this.props
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
            validate={[]} 
          />
        </div>
        <div className={styles.introField}>
          <label className={styles.fieldName}>账号介绍</label>
          <Field
            name='introduction'
            component={this.renderIntroField}
            validate={[]}
          />
        </div>
        <div className={styles.avatarField}>
          <label className={classnames(styles.fieldName, styles.fieldNameRequired)}>帐号头像</label>
          <Field
            name='avatar'
            component={this.renderAvatarField}
            type='file'
            validate={[]}
            avatarSrc={avatarSrc}
            previewUrl={croppedTempUrl}
          />
        </div>
        <div className={styles.buttons}>
          <input
            type='button'
            className={classnames(styles.actionBtn, styles.prevBtn)}
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

const PersonReduxForm = reduxForm({
  form: 'personSignup',
  initialValues: {
    username: defaultUsername
  }
})(PersonForm)

const hotComponent = hot(module)(PersonReduxForm)

export default hotComponent