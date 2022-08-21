/** @jsx h */
import { h, Fragment } from "preact"
import { tw } from "twind"
import { IS_BROWSER } from "fresh/runtime.ts"
import { useLayoutEffect, useState } from "preact/hooks"
import Data from "./Data.tsx"

export default () => {
    return (
        <div id="data-visualization" class={tw`px-10 mb-64`}>
            <h1 class={tw`text-2xl lg:text-4xl font-bold mt-4`}>data visualization</h1>
            <i class={tw`font-light mb-4`}>get to the point quicker.</i>
            <div class={tw`relative top-2 mb-4 px-10 py-5 bg-[#253237] rounded-lg border-hidden`}>
                <Data blockNumber="15349693" pathname={'/15349693'} />
            </div>
        </div>
    )
}