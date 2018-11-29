import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

const _selectorDomain = (state) => state.get('Signup')

const selector = createSelector(
  _selectorDomain,
  (
    selectorDomain,
  ) => ({
    captchaText: selectorDomain.getIn(['captcha', 'text']),
    captcha: selectorDomain.getIn(['captcha', 'data']),
    verifyCode: selectorDomain.get('code'),
    submitRes: selectorDomain.get('submitRes') ? selectorDomain.get('submitRes').toJS() : fromJS({})
  })
)

export default selector
