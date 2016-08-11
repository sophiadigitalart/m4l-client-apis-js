import JsApi from "./JsApi"


export default class ApiClient {
	private api_keys = 0;
	private infoapi : JsApi;
	private jsApis: {[key:number]: JsApi} = {}

	createApi(path: string, followPath: boolean): JsApi {
		var api = new JsApi(path, followPath)
		if(!api.exists()) return null
		var key = ++this.api_keys;
		api.setKey(key)
		this.jsApis[key] = api
		return api
	}

	private getInfoApi() {
		if(!this.infoapi) this.infoapi = new JsApi("live_set")
		return this.infoapi
	}

	getApiByKey(key: number): JsApi {
		return this.jsApis[key]
	}

	getInfo(path: string): string {
		this.getInfoApi().setPath(path)
		return this.getInfoApi().getInfo()
	}

	destroy(apikey: number) {
		var api = this.jsApis[apikey]
		if(!api) return
		api.close()
		delete this.jsApis[apikey]
	}

	close() {
		for(var a in this.jsApis) this.jsApis[a].close()
		this.jsApis = {}

	}
}