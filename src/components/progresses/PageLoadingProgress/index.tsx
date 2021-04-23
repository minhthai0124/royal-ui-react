import React, { useState, useEffect } from 'react'

import {
  PageLoadingProgressInterface,
} from './types'
import useProgress, { usePrevious } from './useProgress'
import { nameToHex, hexToRgb } from './hexToRgb'

const DEFAULT_COLOR = '#f20c41'

const styles = {
  wrapper: {
    top: '0',
    left: '0',
    width: '100%',
    transition: 'all 500mx ease-in-out',
  },
  hiddenWrapper: {
    visibility: 'hidden',
    opacity: '0',
    zIndex: '-10',
  },
  visibleWrapper: {
    visibility: 'visible',
    opacity: '1',
    zIndex: '9999',
  },
  percent: {
    transition: 'all 400ms ease',
    height: '2px',
  },
}

function getWrapperStyles (isHidden: boolean, isAbsolute: boolean = false) {
  const visibilityStyles = isHidden
    ? styles.hiddenWrapper
    : styles.visibleWrapper

  return {
    ...styles.wrapper,
    ...visibilityStyles,
    position: isAbsolute ? 'absolute' : 'fixed',
  }
}

function getPercentStyles (
  color: string,
  percent: number,
  clientStyles: Object = {},
) {
  const customStyles = {
    width: percent <= 0 ? '0%' : `${percent}%`,
    opacity: percent >= 99.9 ? '0' : '1',
  }

  return {
    ...styles.percent,
    background: color,
    boxShadow: `0 0 10px ${hexToRgb(color, 0.7)}`,
    ...clientStyles,
    ...customStyles,
  }
}

const PageLoadingProgress = ({
  isActive,
  color,
  absolute,
  className,
  styles,
  children,
}: PageLoadingProgressInterface) => {
  const [ progressColor ] = useState(() =>
    nameToHex(color, DEFAULT_COLOR)
  )

  const [ iterationKey, setIteration ] = useState(0)

  const prevIsActive = usePrevious(isActive)

  useEffect(() => {
    if (isActive && !prevIsActive) {
      setIteration(prevIteration => prevIteration + 1)
    }
  }, [isActive, prevIsActive])

  const percent = useProgress(isActive)
  // Hide progress bar if percent is less than 0.
  const isHidden = percent < 0 || percent > 100

  return (
    <div key={iterationKey} style={getWrapperStyles(isHidden, absolute) as Object}>
      <div
        className={className}
        style={getPercentStyles(progressColor, percent, styles) as Object}
      />
    </div>
  )
}

// ProgressBarProvider.displayName = 'ProgressBarProvider'

PageLoadingProgress.defaultProps = {
  absolute: false,
  color: DEFAULT_COLOR,
  styles: {},
}

export default PageLoadingProgress
