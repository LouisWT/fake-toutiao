import { createSelector } from 'reselect'

const _selectorDomain = (state) => state.get('Signup')

const selector = createSelector(
  _selectorDomain,
  (
    selectorDomain,
  ) => ({
    captchaText: selectorDomain.getIn(['captcha', 'text']),
    captcha: selectorDomain.getIn(['captcha', 'data']),
    verifyCode: selectorDomain.get('code')
  })
)

export default selector
