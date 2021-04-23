import React, { useRef, useEffect } from 'react'
import scrollTop from '../../utils/scrollTop'

const ScrollToTop = () => {
  const scrollTopBtn = useRef(null)
  useEffect(() => {
    const createScrollTop = scrollTop(scrollTopBtn.current)
    if (createScrollTop) {
      createScrollTop.init()
    }
    return () => {
      if (createScrollTop) {
        createScrollTop.clear()
      }
    };
  }, [])
  return (
    <div id="pagetop" ref={scrollTopBtn}>ページ TOPへ</div>
  )
}

export default ScrollToTop
