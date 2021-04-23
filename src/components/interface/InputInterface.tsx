export interface InputInterface {
  error: string
  name: string
  type: string
  value: string
  onChange?(value: object): any
  onBlur?(value: object): any
  placeholder: string
  className: string
  validationRules: any
  maxLength: string,
  autoComplete?: boolean
  [key: string]: any
}
