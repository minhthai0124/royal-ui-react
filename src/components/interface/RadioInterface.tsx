export interface RadioInterface {
  name: string
  label: string
  value: number
  onChange?(value: object): any
  className: string
  validationRules: any
}
