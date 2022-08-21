/** @jsx h */
import { h } from "preact"
import { useState } from "preact/hooks"
import { tw } from "twind"

interface EmailRequestBody {
    email: string;
    choices: Array<string>;
}

export default () => {
    const [email, setEmail] = useState<string | undefined>()
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


        await fetch('/api', { method: 'POST', body: JSON.stringify(requestBody) })
    }

    const handleChoice = (e: Event) => {
        e.preventDefault()
        setChoices(choices => choices?.includes(e.target?.id) ? [...choices.filter(c => c !== e.target?.id)] : [...choices, e.target?.id])
        // console.log(e: Event)
    }


    return (
        <div class={tw`h-[35vh] lg:h-[25vh] flex flex-col w-full`}>
            <div class={tw`px-10 my-auto w-full`}>
                <p class={error ? tw`pl-4 visible text-sm font-extralight text-red-600 py-2` : tw`py-2 invisible text-sm font-extralight`}>{error ? error : "d"}</p>
                <form class={tw`flex flex-col lg:flex-row`} onSubmit={handleSubmit}>
                    {/* basic info */}
                    <h2 class={tw`my-auto lg:m-auto`}>looking for...</h2>
                    <input checked={choices?.includes("website") ? true : false} class={tw`my-auto lg:m-auto`} type="checkbox" id="website" onClick={handleChoice}/>
                    <label class={tw`my-auto lg:m-auto`} for="website">a web developer?</label>

                    <input checked={choices?.includes("branding") ? true : false} class={tw`my-auto lg:m-auto`} type="checkbox" id="branding" onClick={handleChoice}/>
                    <label class={tw`my-auto lg:m-auto`} for="branding">a brand designer?</label>

                    <input checked={choices?.includes("marketing") ? true : false} class={tw`my-auto lg:m-auto`} type="checkbox" id="marketing" onClick={handleChoice}/>
                    <label class={tw`my-auto lg:m-auto`} for="marketing">a marketing strategist?</label>

                    <input checked={choices?.includes("chat") ? true : false} class={tw`my-auto lg:m-auto`} type="checkbox" id="chat" onClick={handleChoice}/>
                    <label class={tw`my-auto lg:m-auto`} for="chat">a chat?</label>

                    <div class={tw`flex flex-row mx-auto my-auto`}>
                        <input type="email" placeholder="let's get in touch" class={tw`rounded-full text-black pl-3 pr-9 py-1.5 w-full`} onInput={handleChange} />
                        <button type="submit" class={tw`bg-black text-white px-2 py-0.5 my-1 rounded-full relative right-8`} onClick={handleSubmit}>@</button>
                    </div>
                </form>
            </div>
        </div>
    )
}