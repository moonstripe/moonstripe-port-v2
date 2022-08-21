/** @jsx h */
import { h } from "preact"
import { tw } from "twind"
import Cube from "./Cube.tsx"

export default () => {
    return (
        <div id="product-pages" class={tw`px-10`}>
            <h1 class={tw`text-2xl lg:text-4xl font-bold mt-4`}>product pages</h1>
            <i class={tw`font-light mb-4`}>find the right way to express how cool your product is.</i>
            <div class={tw`mb-4`}>
                <div class={tw`relative top-2 w-full h-full text-black font-cube`}>
                    <Cube />
                </div>
            </div>
        </div>
    )
}