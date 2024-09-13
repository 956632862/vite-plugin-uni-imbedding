export default function (config) {
    const {components} = config

    const regex = /<([a-zA-Z][\w-]*)[^>]*>/

    const names =  components.map((component) => component.match(regex)[1])

    return {
        name:"vite-plugin-uni-embedding",
        enforce: 'pre',

        async transform(code, id) {

            if (id.endsWith(".vue")){
                if (names.some(name => id.endsWith(`${name}.vue`))) return null
                let insertCode = ''

                components.forEach(component => {
                    insertCode += component
                })

                const updatedCode = code.replace(/(<template>)/, `$1\n${insertCode}\n`);

                return {
                    code: updatedCode,
                    map: null // 如果需要，可以生成 source map
                };
            }

        }
    }
}
