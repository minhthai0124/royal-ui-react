export interface RadioGroupInterface {
  name: string
  options: any
  onChange?(value: object): any
  className: string
  validationRules: any
  defaultValue: any
}
