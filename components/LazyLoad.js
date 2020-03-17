import React from 'react'
import LazyLoad from 'react-lazyload'

const LazyLoadComponent = props => <LazyLoad><img src={props.src} alt={props.alt} /></LazyLoad>

export default LazyLoadComponent