# vite-plugin-uni-imbedding
此插件适用于**vite + vue3 + uniapp 的小程序**

## 使用指南
想要进行全局使用的组件，必须先使用uniapp的`easyCom`进行注册，否则无法使用
  
将插件注册到`vite.config.js`
```js
import { defineConfig } from 'vite'
import vitePluginUniImbedding from 'vite-plugin-uni-imbedding'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vitePluginUniImbedding(),
  ],
})
```
配置想要在全局使用的组件  
```js
export default defineConfig({
  plugins: [
    vitePluginUniImbedding({
        components:[
            "<my-test v-model='title' :title='title'></my-test>",
            "<myTest1></myTest1>"
        ]
    }),
  ],
})
```
即可正常使用
