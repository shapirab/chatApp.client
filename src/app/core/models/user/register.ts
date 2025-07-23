export interface RegisterUser{
  firstName?: string,
  lastName?: string,
  email: string,
  password: string,
  displayName?: string,
  address?: Address

}

export type Address = {
  line1: string,
  line2: string,
  city: string,
  state: string,
  country: string,
  postalCode: string
}
