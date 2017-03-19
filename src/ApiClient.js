import JsApi from "./JsApi"

var api_keys = 0
var jsApis = {}

export default class ApiClient {

  createApi(path, followPath = false) {
    var api = new JsApi(path, followPath)
    if(!api.exists()) return null
    var key = ++api_keys;
    api.setKey(key)
    jsApis[key] = api
    return api
  }

  getInfoApi() {
    if(!this.infoapi) this.infoapi = new JsApi("live_set")
    return this.infoapi
  }

  getApiByKey(key) {
    return jsApis[key]
  }

  getInfo(path) {
    this.getInfoApi().setPath(path)
    return this.getInfoApi().getInfo()
  }

  destroy(apikey) {
    var api = jsApis[apikey]
    if(!api) return
    api.close()
    delete jsApis[apikey]
  }

  close() {
    for(var a in jsApis) jsApis[a].close()
    jsApis = {}
  }
}