/** @jsx h */
import { IS_BROWSER } from "https://deno.land/x/fresh@1.0.2/runtime.ts";
import { h } from "preact"
import { useState, useLayoutEffect } from "preact/hooks"
import { tw } from "twind"

interface EmailRequestBody {
    email: string;
    choices: Array<string | undefined>;
}

export default () => {
    const [email, setEmail] = useState<string>('')
    const [error, setError] = useState<string | undefined>()
    const [choices, setChoices] = useState<Array<string | undefined>>([])

    const handleChange = (e: Event) => {
        e.preventDefault()

        const val: string = e.target?.value

        setEmail(e.target?.value)
    }

    const handleSubmit = async (e: Event) => {
        e.preventDefault()
        if (!email?.split('').includes('@') || !email?.split('').includes('.')) {
            return setError(`the email address you entered isn't a valid email address.`)
        }

        // reset error
        setError(undefined)


        // send to email controller
        const requestBody: EmailRequestBody = {
            email: email,
            choices: choices
        }


        setEmail('')
        setChoices([])

        await fetch('/api', { method: 'POST', body: JSON.stringify(requestBody) }).then(r => console.log(r)).catch(console.error)
    }

    const handleChoice = (e: Event) => {
        e.preventDefault()
        setChoices(choices => choices?.includes(e.target?.id) ? [...choices.filter(c => c !== e.target?.id)] : [...choices, e.target?.id])
    }

    return (
        <div class={tw`h-[35vh] lg:h-[25vh] flex flex-col w-full`}>
            <div class={tw`px-10 my-auto w-full`}>
                <p class={error ? tw`pl-4 visible text-sm font-extralight text-red-600 py-2` : tw`py-2 invisible text-sm font-extralight`}>{error ? error : "d"}</p>
                <form class={tw`flex flex-col lg:flex-row`} onSubmit={handleSubmit}>
                    {/* basic info */}
                    <h2 class={tw`w-5/6 md:w-1/3 mx-auto`}>looking for...</h2>
                    <div class={tw`flex flex-row my-auto w-5/6 md:w-1/3 mx-auto`} onClick={handleChoice} >
                        <input checked={choices?.includes("website") ? true : false} class={tw`my-auto mr-1 lg:m-auto`} type="checkbox" id="website"/>
                        <label class={tw`my-auto ml-1 lg:m-auto`} for="website">a web developer?</label>
                    </div>
                    <div class={tw`flex flex-row my-auto w-5/6 md:w-1/3 mx-auto`} onClick={handleChoice} >
                        <input checked={choices?.includes("branding") ? true : false} class={tw`my-auto mr-1 lg:m-auto`} type="checkbox" id="branding"/>
                        <label class={tw`my-auto ml-1 lg:m-auto`} for="branding">a brand designer?</label>
                    </div>
                    <div class={tw`flex flex-row my-auto w-5/6 md:w-1/3 mx-auto`} onClick={handleChoice} >
                        <input checked={choices?.includes("marketing") ? true : false} class={tw`my-auto mr-1 lg:m-auto`} type="checkbox" id="marketing"/>
                        <label class={tw`my-auto ml-1 lg:m-auto`} for="marketing">a marketing strategist?</label>
                    </div>
                    <div class={tw`flex flex-row my-auto w-5/6 md:w-1/3 mx-auto`} onClick={handleChoice} >
                        <input checked={choices?.includes("chat") ? true : false} class={tw`my-auto mr-1 lg:m-auto`} type="checkbox" id="chat"/>
                        <label class={tw`my-auto ml-1 lg:m-auto`} for="chat">a chat?</label>
                    </div>
                    <div class={tw`flex flex-row w-5/6 md:w-1/3 mx-auto mt-1`}>
                        <input type="email" value={email} placeholder="let's get in touch" class={tw`rounded-full text-black pl-3 pr-9 py-1.5 w-full`} onInput={handleChange} />
                        <button type="submit" class={tw`bg-black text-white px-2 py-0.5 my-1 rounded-full relative right-8`} onClick={handleSubmit}>@</button>
                    </div>
                </form>
            </div>
        </div>
    )
}