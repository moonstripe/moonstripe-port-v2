/** @jsx h */
import { h } from "preact";
import { useState, useLayoutEffect } from "preact/hooks"
import { tw } from "twind"

export default () => {
    const [isHover, setHover] = useState<boolean>(false)

    return (
        <div class={tw`flex flex-col`}>
            <div class={tw`text-white fixed bottom-10 left-10 text-2xl hover:bg-black`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <p class={tw`text-white text-lg text-thin`}>contact:</p>
                <div class={tw`flex flex-row `}>
                    <p class={!isHover ? tw`p-2` : tw`p-2 align-middle rotate-45`}>
                        +
                    </p>
                    {
                        isHover ? <a href={`mailto:moonstripe@proton.me?subject=Let's Build Something Together&body=The sky's the limit!`} target="_blank" rel="noopener noreferrer" class={tw`mx-2 py-2`}>moonstripe@proton.me</a> : null
                    }
                </div>
            </div>
        </div>
    )
}