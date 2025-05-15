// 声明js-cookie模块类型
declare module 'js-cookie' {
  interface CookiesStatic {
    set(name: string, value: any, options?: any): void
    get(name: string): string | undefined
    remove(name: string, options?: any): void
  }
  const Cookies: CookiesStatic
  export default Cookies
}
