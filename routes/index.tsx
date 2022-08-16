/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "fresh/server.ts"
import Layout from "../components/Layout.tsx";
import Moon from "../islands/Moon.tsx";


export const handlers: Handlers = {
  GET(req, ctx) {
    console.log("request", req)
    return ctx.render({ url: req })
  }
}

export default function Home({ url }: PageProps) {

  return (
    <Layout pathname={url.pathname}>
      <Moon />
      <main class={tw`overscroll-y-none`}>
        <div id='top' />
        <div class={tw`h-[50vh] lg:h-[60vh]`} />
        <div id="splash" class={tw`z-1 flex flex-col`}>
          <div id="hero" class={tw`ml-10 flex flex-col`}>
            <h1 class={tw`text-4xl lg:text-8xl font-black`}>moonstripe</h1>
            <i class={tw`font-extralight text-left pb-2`}>web development, out of this world.</i>
            {/* <button class={tw`rounded border-2 px-2 py-0 mr-auto`}>blast off</button> */}
          </div>
        </div>
        <div class={tw`h-[35vh] lg:h-[25vh]`} />
        <div id="features" class={tw`flex flex-col w-full bg-black`}>
          <div id="product-pages" class={tw`mx-10`}>
            <h1 class={tw`text-2xl lg:text-4xl font-bold mt-4`}>product pages</h1>
            <i class={tw`font-light mb-4`}>find the right way to express how cool your product is.</i>
            <div class={tw`mb-4`}>
              <iframe src="https://kojinglick.com/products/cube" title="Cube Product Demo" class={tw`w-full h-[75vh] lg:h-[50vh] my-2`}></iframe>
            </div>
          </div>
          <div id="data-visualization" class={tw`mx-10`}>
            <h1 class={tw`text-2xl lg:text-4xl font-bold mt-4`}>data visualization</h1>
            <i class={tw`font-light mb-4`}>get to the point quicker.</i>
            <div class={tw`mb-4`}>
              <iframe src="https://opencryptomap.deno.dev/15349693" title="Cube Product Demo" class={tw`w-full h-[50vh] lg:h-[75vh] my-2`}></iframe>
            </div>
          </div>
        </div>
        <div class={tw`h-[25vh]`} />
      </main>
    </Layout>
  );
}
