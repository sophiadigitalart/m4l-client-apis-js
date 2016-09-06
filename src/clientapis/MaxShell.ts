
import ApiClient from "./ApiClient"

var clients: {[key:number]: ApiClient} = {}

export default class MaxShell {
	start(client_id = 0) {
		if(!client_id) return
		clients[client_id] = new ApiClient()
	}

	stop(client_id = 0) {
		if(client_id) {
			if(!clients[client_id]) return
			clients[client_id].close()
			delete clients[client_id]			
		} else {
			for(var c in clients) clients[c].close()
			clients = {}
		}
	}
	
	notifydeleted() { this.stop() }

	msg_int(client_id: number, req_id: number, action: string, ...params: any[]) {
		var client = clients[client_id]
		if(!client) output(client_id, req_id, 2, "no client with id", client_id)
		switch(action) {
		case "echo":
			output(client_id, req_id, 0, params)
			return
		case "info":
			var path = params.join(" ")
			var info = client.getInfo(path)
			if(!info) output(client_id, req_id, 2, "no info for path", path)
			else output(client_id, req_id, 0, info)
			return
		case "new":
			var path = params.slice(0, params.length - 1).join(" ")
			var followPath = params[params.length - 1]
			var jsApi = client.createApi(path, followPath)
			if(!jsApi) output(client_id, req_id, 2, "no api at path", path)
			else output(client_id, req_id, 0, jsApi.getInfo())
			return
		}
		var apikey = parseInt(params[0])
		var api = client.getApiByKey(apikey)
		if(!api) {
			output(client_id, req_id, 2, "no api for key", apikey)
			return
		}
		switch(action) {
		case "get":
			var property = params[1]
			output(client_id, req_id, 0, api.get(property))
			return
		case "set":
			var property = params[1]
			var value = params[2]
			api.set(property, value)
			return
		case "call":
			var name = params[1]
			var args = params.slice(2)
			output(client_id, req_id, 0, api.call(name, args))
			return
		case "observe":
			var property = params[1]
			api.observe(property, val => output(client_id, req_id, 1, val))
			return
		case "unobserve":
			var property = params[1]
			api.unobserve(property)
			return
		case "destroy":
			client.destroy(apikey)
			return
		}
	}
}

function output(client_id: number, req_id: number, status: number, ...args: any[]) {
	me.outlet.apply(me, [0, client_id, req_id, status].concat(args))
}