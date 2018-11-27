import 'react-image-crop/dist/ReactCrop.css'

import React from 'react'
import PropTypes from 'prop-types'
import ReactCrop from 'react-image-crop'
import classnames from 'classnames'
import styles from './styles'

export default class ImageCropper extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      avatarCrop: {
        x: 0,
        y: 0,
        aspect: 1,
        width: 100,
        height: 100,
      },
      croppedImageUrl: '',
      croppedImageFile: '',
      imageHeight: 0,
      imageWidth: 0,
    }
  }

  onImageLoaded = (image) => {
    this.imageRef = image
    // 截图的时候是根据原图的大小截的，所以说需要图片的原始大小
    const width = image.naturalWidth
    const height = image.naturalHeight
    let state
    if (height > width) {
      state = {
        avatarCrop: {
          aspect: 1,
          x: 0,
          y: 0,
          width: 100,
          height: Math.ceil(width / height * 100),
        },
        pixelCrop: {
          x: 0,
          y: 0,
          width,
          height: width,
        },
      }
    } else {
      state = {
        avatarCrop: {
          aspect: 1,
          x: 0,
          y: 0,
          width: Math.ceil(height / width * 100),
          height: 100 
        },
        pixelCrop: {
          x: 0,
          y: 0,
          width: height,
          height,
        },
      }
    }
    this.setState(state)
    this.makeClientCrop(state.avatarCrop, state.pixelCrop)
  }

  onCropComplete = (avatarCrop, pixelCrop) => {
    this.makeClientCrop(avatarCrop, pixelCrop)
  }

  onCropChange = avatarCrop => {
    this.setState({ avatarCrop })
  }

  async makeClientCrop(crop, pixelCrop) {
    if (this.imageRef && crop.width && crop.height) {
      const { url, file } = await this.getCroppedImg(
        this.imageRef,
        pixelCrop,
        'avatar.jpeg',
      )
      this.setState({ croppedImageUrl: url, croppedImageFile: file })
    }
  }

  getCroppedImg(image, pixelCrop, fileName) {
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');
    console.log(pixelCrop);
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve({url: this.fileUrl, file: blob});
      }, 'image/jpeg');
    });
  }

  handleOnConfirmCrop = () => {
    const { croppedImageUrl, croppedImageFile } = this.state
    this.props.handleOnConfirmCrop(croppedImageUrl, croppedImageFile)
  }

  render() {
    const { avatarSrc, handleOnConfirmCrop, handleOnCancelCrop } = this.props
    const { avatarCrop, croppedImageUrl, imageHeight, imageWidth } = this.state
    return (
    <div className={styles.dialog}>
      <div className={styles.panel}>
        <div className={styles.title}>裁剪图片</div>
        <div className={styles.content}>
          <div className={styles.cropWrap}>
            <ReactCrop
              // style={{ width: imageWidth, height: imageHeight }}
              src={avatarSrc}
              disabled={false}
              crop={avatarCrop}
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
            />
          </div>
          {croppedImageUrl && <img
            src={croppedImageUrl}
            alt=""
            className={styles.photoCropPreview}
          />}
        </div>
        <div className={styles.footer}>
            <div className={styles.btns}>
              <div
                className={classnames(styles.btn, styles.confirm)}
                onClick={this.handleOnConfirmCrop}  
              >确认</div>
              <div
                className={classnames(styles.btn, styles.cancel)}
                onClick={handleOnCancelCrop}
              >取消</div>
            </div>
        </div>
      </div>
    </div>
    )
  }
}
