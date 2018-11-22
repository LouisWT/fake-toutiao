import React from 'react'
import { shouldImmutableComponentUpdate } from 'utils/utils'

class ImmutableComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shouldImmutableComponentUpdate({
      nextProps,
      nextState,
      thisProps: this.props,
      thisState: this.state,
    })
  }
}

/* eslint-disable */
export {
  ImmutableComponent,
}
/* eslint-disable */