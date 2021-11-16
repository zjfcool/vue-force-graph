import { defineComponent, ref, h, watchEffect, onMounted, DefineComponent, onBeforeUnmount } from 'vue'
import { useProvider, useGraphContext } from './hooks'
function omit(target, args) {
    return Object.fromEntries(
        Object.keys(target)
            .filter((k) => {
                return !args.includes(k);
            })
            .map((k) => [k, target[k]])
    );
}
export interface ComboParamProps {
    wrapperElementType?: string;
    methodNames: string[];
    initPropNames?: string[];
    props: any;
    name: string;
}
export default function fromKapsule(kapsuleComponent: (options: any) => any, comboParam: ComboParamProps,): DefineComponent {
    const {
        wrapperElementType = 'div',
        methodNames = [],
        initPropNames = [],
        props = {},
        name = ''
    } = comboParam
    return defineComponent({
        name,
        props,
        setup(props, { expose, slots }) {
            const domEl = ref(null);
            const comp = kapsuleComponent(getConfigOptions());
            useProvider(useGraphContext, comp)
            const dynamicProps = omit(props, [...methodNames, ...initPropNames]);
            const retFuncs = Object.fromEntries(methodNames.map((k) => [k, comp[k]]));
            function getConfigOptions() {
                return Object.fromEntries(
                    initPropNames
                        .filter((prop) => props.hasOwnProperty(prop))
                        .map((prop) => [prop, props[prop]])
                );
            }
            function __call(method, ...args) {
                comp[method] instanceof Function ? comp[method](...args) : undefined;
            }
            watchEffect(() => {
                Object.keys(dynamicProps).forEach((p) => {
                    if (props[p] !== undefined) {
                        __call(p, props[p]);
                    }
                });
            });
            function init() {
                comp(domEl.value);
                resizeHandle()
                window.addEventListener('resize', resizeHandle)
            }
            function resizeHandle() {
                comp.height(window.innerHeight)
                    .width(window.innerWidth)
            }
            onMounted(() => {
                init();
            });
            onBeforeUnmount(() => {
                comp._destructor instanceof Function ? comp._destructor() : null;
                window.removeEventListener('resize', resizeHandle)
            })
            expose({
                ...retFuncs,
                graphContext: comp,
            });
            return () => {
                return h(wrapperElementType, {}, [
                    h(wrapperElementType, { ref: domEl }),
                    slots.default !== undefined ? slots.default() : undefined,
                ]);
            };
        }
    })

}