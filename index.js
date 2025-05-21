import {getPagesMap, initPages, getRoute} from "./utils"
import {normalizePath} from "vite"

let pagesMap = {}

export default function (config) {
    const {components} = config

    return {
        name: "vite-plugin-uni-imbedding",
        enforce: 'pre',

        async transform(code, id) {
            const _id = normalizePath(id)

            init(this)

            const route = getRoute(_id)
            if (_id.endsWith(".vue") && pagesMap[route]) {

                let insertCode = ''

                components.forEach(component => {
                    insertCode += component
                })

                const updatedCode = code.replace(/(<\/template>)/, `\n${insertCode}\n</template>`);


                return {
                    code: updatedCode,
                    map: null // 如果需要，可以生成 source map
                };

            }


        }
    }
}

function init(that) {
    const isWx = process.env.UNI_PLATFORM === "mp-weixin"
    isWx && initPages(that)
    isWx && (pagesMap = getPagesMap())
}
