import { createSelector } from 'reselect'

const _selectorDomain = (state) => state.get('Login')

const selector = createSelector(
  _selectorDomain,
  (
    selectorDomain,
  ) => {
    console.log(selectorDomain);
    return {
      captchaText: selectorDomain.text,
      captcha: selectorDomain.data
    }
  }
)

export default selector