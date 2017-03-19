
var ssplit = require("string-split-keep")

import ApiObserver from "./ApiObserver"


export default class JsApi {

  constructor(path, followPath) {
    this.api = new LiveAPI(me.patcher, path)
    this.api.mode = followPath ? 0 : 1
    this.observers = {}
  }
  exists() { return this.getId() != 0 }
  getKey() { return this.key }
  setKey(key) { this.key = key }
  getPath() { return this.api.path }
  setPath(path) { this.api.path = path }
  getId() { return parseInt(this.api.id + "") }
  isFollowPath() { return this.api.mode == 1 }

  close() {
    for(var o in this.observers) this.observers[o].close()
    this.observers = {}
  }
  get(property) {
    return this.api.get(property)
  }
  call(name, ...args) {
    return this.api.call(name, args)
  }

  set(property, value) {
    this.api.set(property, value)
  }
  observe(property, callback) {
    if(this.observers[property]) return
    this.observers[property] = new ApiObserver(this.api, property, callback)
  }
  unobserve(property) {
    if(!this.observers[property]) return
    this.observers[property].close()
    delete this.observers[property]  
  }
  
  getInfo() {
    if(!this.getId()) return null
    var info = {  
        key: this.key,
        id: this.getId(),
        path: this.api.unquotedpath,
        type: this.api.type,
        description: undefined,
        properties: [],
        functions: [],
        children: [],
        childs: [],
    }
    this.api.info.split("\n").forEach(line => {
      var kv = ssplit(line, " ", 2)
      switch(kv[0]) {
      case "child": info.childs.push(kv[1]); break
      case "children": info.children.push(kv[1]); break
      case "description": info.description = kv[1]; break
      case "property": info.properties.push(kv[1]); break
      case "function": info.functions.push(kv[1]); break
      }
    })

    return JSON.stringify(info)
  }
}