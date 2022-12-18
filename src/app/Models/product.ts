export class Product {
  constructor(
    public name: string,
    public description: string,
    public image: string,
    public price: string,

    public is_allowed: boolean,
    public seller: string,
    public title: string
  ) {}
}
