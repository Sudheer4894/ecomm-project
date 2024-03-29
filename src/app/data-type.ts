export interface SignUp{
  name:string,
  password:string,
  email:string
}

export interface Login{
  email:string,
  password:string,
}

export interface Product{
  id:string,
  name: string,
  price: number,
  category: string,
  color: string,
  description: string,
  image: string,
  quantity: undefined | number
}