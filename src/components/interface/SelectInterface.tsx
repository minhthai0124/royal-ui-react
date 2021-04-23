export interface Option {value: string| number, name: string| number, [key: string]: any}

export interface SelectInterface {
  name: string
  label: string
  value: string | number
  options:Option[]
  className: string
  validationRules: any
  optionName: string
}
