import {jsx} from "hono/jsx"
import {setup, tw} from "twind"
import * as colors from "twind/colors"
import {virtualSheet, getStyleTag} from "twind/sheets"

const sheet = virtualSheet()

setup({sheet, theme: {
    extend: {
        colors: {
            ...colors,
            muse: "#e4007f",
            aqours: "#009fe8",
            niji: "#fab920",
            liella: "#8b4993",
            treelar: "#3399ff"
        },
    }
}})

const mei = tw`bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent`

const Root = () => (
    <div class={tw`grid place-items-center w-screen h-screen bg-trueGray-800`}>
        <h1 class={tw` font-extrabold text-8xl text-center ${mei} select-none border-blue-300`}>Mei</h1>
    </div>
)

const Twitch = () => {
    <div></div>
}

export const SSR = ({cf}: {cf: IncomingRequestCfProperties|undefined}) => {
    sheet.reset()

    const rootBody = Root()
    console.log(cf)
    const twitchBody = Twitch()

    const st = getStyleTag(sheet)

    return (
        <html lang="en">
            <head dangerouslySetInnerHTML={{__html: st}}></head>
            <body>
                {rootBody}
            </body>
        </html>
    )
}