import { createSelector } from 'reselect'

const _selectorDomain = (state) => state.get('Login')

const selector = createSelector(
  _selectorDomain,
  (
    selectorDomain,
  ) => {
    return {
      captchaText: selectorDomain.getIn(['captcha', 'text']),
      captcha: selectorDomain.getIn(['captcha','data']),
      verifyCode: selectorDomain.get('verifyCode')
    }
  }
)

export default selector