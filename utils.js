/**
 * @author: pjlin
 * @date: 2024-10-14 17:52
 * @description：utils
 * @update: 2024-10-14 17:52
 */
import path from "path"
import fs from "fs"
const stripJsonComments = require("strip-json-comments")

let pagesJson = {}
let rootPath =  process.env.UNI_INPUT_DIR || (process.env.INIT_CWD + "\\src")
let insetLoader = {}

// 生成path对应的对象结构
const getLabelConfig = (json)=>{
  return {
    label: (json.style && json.style.label) || insetLoader.label,
    ele: (json.style && json.style.rootEle) || insetLoader.rootEle
  }
}

const initPages = (that)=>{
  let pagesPath = (that.query || {}).pagesPath
  if(!pagesPath){
    // 默认读取pages.json
    pagesPath = path.resolve(rootPath, "pages.json")
  }else{
    // 如有传自定义pagesPath，则截取出所在目录作为rootPath，用于后续匹配路由
    rootPath = path.resolve(pagesPath,"../")
  }
  pagesJson = JSON.parse(stripJsonComments(fs.readFileSync(pagesPath,"utf8")))
  return pagesJson
}

// 分析pages.json，生成路由和配置的映射对象
const getPagesMap = ()=>{
  // 获取主包路由配置
  const pages = pagesJson.pages || []
  const subpackages = pagesJson.subpackages || pagesJson.subPackages || []
  return pages.reduce((obj,item)=>{
    obj["/"+item.path] = item
    return obj
  },subpackages.reduce((obj,item)=>{
    // 获取分包路由配置
    const root = item.root
    item.pages.forEach((item)=>{
      obj["/"+root+"/"+item.path] = item
    })
    return obj
  },{}))
}
const getRoute = (resourcePath) => resourcePath
    .replace(rootPath,'')
    .replace('.vue','')
    .replace(/\\/g,'/')

export {
  getPagesMap,
  initPages,
  getRoute
}
