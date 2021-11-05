import { provide, inject } from 'vue'
function useProvider(fn, ...args) {
    !fn.token && (fn.token = Symbol())
    provide(fn.token, fn(...args))
}
function useInjector(fn) {
    const token = typeof fn === 'symbol' ? fn : fn.token;
    return inject(token)
}
interface UseGraphContext {
    <T>(ctx: T): T;
    token?: Symbol;
}
interface MenuData {
    graphContext: any;
    activeData: any;
    event: any;
}
interface UseMenuData {
    (data: MenuData): MenuData;
    token?: Symbol;
}
let useGraphContext: UseGraphContext = (ctx) => {
    return ctx
}
let useMenuData: UseMenuData = (data: MenuData) => {
    return data
}
export {
    useProvider,
    useInjector,
    useGraphContext,
    useMenuData
}