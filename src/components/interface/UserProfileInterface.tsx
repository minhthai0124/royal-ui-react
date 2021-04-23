export interface UserProfileInterface {
  id: string,
  email: string,
  profile: {
    user_id: string,
    residence_in_japan: number,
    first_name: string,
    last_name: string,
    first_name_kana: string,
    last_name_kana: string,
    country_calling_code: string,
    phone: string,
    date_of_birth: string,
    birthDay: string,
    birthMonth: string,
    birthYear: string,
    gender: number,
    nationality: number,
    address: {
      postal_code: number,
      prefecture_id: number,
      country_name: string,
      city: string,
      street: string,
      state: string
    }
  }
}
