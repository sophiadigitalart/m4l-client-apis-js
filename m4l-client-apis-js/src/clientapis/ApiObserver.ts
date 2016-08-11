
export default class ApiObserver {
	private api: LiveAPI;
	constructor(api: LiveAPI, property: string, callback: (value: any) => void) {
		var self = this;
		this.api = new LiveAPI(me.patcher, val => {
			if(val[0] == property) callback(val[1])
		}, "live_set")
		this.api.path = api.path
		this.api.mode = api.mode
		this.api.property = property
	}
	close() {
		this.api.property = 0
		this.api.id = 0
		this.api = null
	}
}