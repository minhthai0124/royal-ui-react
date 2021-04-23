export interface PageLoadingProgressInterface {
  isActive: boolean
  color: string
  className?: string
  styles?: Object
  absolute?: boolean
  children?: any
}

export interface useTickerInterface {
  progress: number
  dispatch?: any
  maxPercent?: number
  intervalTime: number
  increment?: any
}