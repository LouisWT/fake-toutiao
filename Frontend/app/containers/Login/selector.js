import { createSelector } from 'reselect'

const _selectorDomain = (state) => state.get('Login')

const selector = createSelector(
  _selectorDomain,
  (
    selectorDomain,
  ) => ({
    captchaText: selectorDomain.getIn(['captcha', 'text']),
    captcha: selectorDomain.getIn(['captcha', 'data']),
  })
)

export default selector
