/** @jsx h */
import { h, ComponentChildren } from "preact";
import { IS_BROWSER } from "fresh/runtime.ts"
import { tw } from "@twind";
import Logo from "../islands/Logo.tsx";
import Foot from "../islands/Foot.tsx";

interface LayoutProps {
  pathname: string;
  children: ComponentChildren;
}

export default (props: LayoutProps) => {
  const { pathname, children } = props;

  if (IS_BROWSER) {
    const root = document.documentElement
    console.log('hyello', root)
  }

  return (
    <div class={tw`h-screen flex flex-col font-sans`}>
      <Logo />

      <div class={tw`h-screen text-white overscroll-y-none`}>
        {children}
      </div>

      <Foot />
    </div>
  );
}
