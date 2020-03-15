import React from 'react'
import Header from './header'

class Layout extends React.Component {
  render() {
    const {children, changeLang} = this.props
    return <div>
      <Header changeLang={changeLang} />
      <section>{children}</section>
    </div>
  }
}
export default Layout
