/** @jsx h */
import { h } from "preact";
import { tw } from "twind"

export default () => {

    return (
        <a href={'#top'}>
            <img
                class={tw`fixed left-10 w-1/4 lg:w-[10%]`}
                src={"/kojin_logo_invert.svg"}
                alt="A moon surrounded by long clouds"
            />
        </a>
    )
}