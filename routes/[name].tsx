/** @jsx h */
import { h } from "preact";
import { tw } from "twind"
import { PageProps } from "fresh/server.ts";

export default function Greet(props: PageProps) {
  return <div class={tw`text-white w-1/4 mx-auto mt-24`}>You seem lost. There's nothing here.</div>;
}
