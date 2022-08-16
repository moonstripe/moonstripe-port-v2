/** @jsx h */
import { h, Fragment } from "preact"
import { tw } from "twind"
import { IS_BROWSER } from "fresh/runtime.ts"
import { useLayoutEffect, useState } from "preact/hooks"

export default () => {

    const [isLoaded, setLoaded] = useState<boolean>(false)

    if (IS_BROWSER) {
        useLayoutEffect(() => {
            document.querySelector('iframe#data-visualization').addEventListener('load', () => {
                setLoaded(true)
            })
        
            return () => document.querySelector('iframe#data-visualization').removeEventListener('load')
        }, [])
    }

    return (
        <div id="data-visualization" class={tw`px-10 bg-black`}>
            <h1 class={tw`text-2xl lg:text-4xl font-bold mt-4`}>data visualization</h1>
            <i class={tw`font-light mb-4`}>get to the point quicker.</i>
            <div class={tw`mb-4`}>
                {
                    !isLoaded ? (
                        <Fragment>
                            <div class={tw`relative top-0 w-full h-[50vh] lg:h-[75vh] my-2 text-white`}>Loading ...</div>
                            <iframe id="data-visualization" src="https://opencryptomap.deno.dev/15349693" title="Data Viz Demo" class={tw`w-full h-[0vh] lg:h-[0vh] my-2`} />
                        </Fragment>
                    ) : (
                        <iframe id="data-visualization" src="https://opencryptomap.deno.dev/15349693" title="Data Viz Demo" class={tw`w-full h-[50vh] lg:h-[75vh] my-2`}/>
                    )
                }
            </div>
        </div>
    )
}