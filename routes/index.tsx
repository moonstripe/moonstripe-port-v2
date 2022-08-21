/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import { IS_BROWSER } from "fresh/runtime.ts"
import { Handlers, PageProps } from "fresh/server.ts"
import Layout from "../components/Layout.tsx";
import Moon from "../islands/Moon.tsx";
import ProductPages from "../islands/ProductPages.tsx";
import DataVisualization from "../islands/DataVisualization.tsx";
import Form from "../islands/Form.tsx"


export const handlers: Handlers = {
  async GET(req, ctx) {
    return await ctx.render({ url: req })
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
            <h1 class={tw`text-[2.25rem] xl:text-8xl font-black`}>moonstripe</h1>
            <i class={tw`font-extralight text-left`}>web development, out of this world.</i>
          </div>
        </div>
        <div id="features" class={tw`flex flex-col w-full absolute top-[100vh]`}>
          <Fragment>
            <ProductPages />
            <Form />
            <DataVisualization />
          </Fragment>
        </div>
        <div class={tw`h-[35vh] lg:h-[25vh]`} />
      </main>
    </Layout>
  );
}
