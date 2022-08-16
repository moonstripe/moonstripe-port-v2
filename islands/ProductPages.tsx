/** @jsx h */
import { h, Fragment } from "preact"
import { tw } from "twind"
import { IS_BROWSER } from "fresh/runtime.ts"
import { useLayoutEffect, useState } from "preact/hooks"

export default () => {

    const [isLoaded, setLoaded] = useState<boolean>(false)

    if (IS_BROWSER) {
        useLayoutEffect(() => {
            document.querySelector('iframe#cube').addEventListener('load', () => {
                setLoaded(true)
            })

            return () => document.querySelector('iframe#cube').removeEventListener('load')
        }, [])
    }

    return (
        <div id="product-pages" class={tw`px-10 bg-black`}>
            <h1 class={tw`text-2xl lg:text-4xl font-bold mt-4`}>product pages</h1>
            <i class={tw`font-light mb-4`}>find the right way to express how cool your product is.</i>
            <div class={tw`mb-4`}>
                {
                    !isLoaded ? (
                        <Fragment>
                            <div class={tw`relative top-0 w-full h-[75vh] lg:h-[50vh] my-2 text-white`}>Loading ...</div>
                            <iframe id="cube" src="https://kojinglick.com/products/cube" title="Cube Product Demo" class={tw`w-full h-[0vh] lg:h-[0vh] my-2`} />
                        </Fragment>
                    ) : (
                        <iframe id="cube" src="https://kojinglick.com/products/cube" title="Cube Product Demo" class={tw`w-full h-[75vh] lg:h-[50vh] my-2`} />
                    )
                }
            </div>
        </div>
    )
}