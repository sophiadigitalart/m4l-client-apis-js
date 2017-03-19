
import ApiClient from "./ApiClient"

var clients = {}

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
  
  notifydeleted() { 
    this.stop() 
    pusher.cancel()
  }

  msg_int(client_id, req_id, action, ...params) {
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
//      api.observe(property, val => output(client_id, req_id, 1, val))
      api.observe(property, val => observebuffered(client_id, req_id, val))
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

function output(client_id, req_id, status, ...args) {
  me.outlet.apply(me, [0, client_id, req_id, status].concat(args))
}


/*
 * When you have a lot of param updates (e.g. by moving around hard on a live-remote-params/XY-Pad),
 * you can observe ever increasing delays.
 * The number one way to get rid of those is to NOT have the Live App visible on the desktop. Really.
 * It would be a little silly to ask people to do that, so here's one workaround:
 * The observed values don't get sent immediately. Instead they are buffered and sent out every 5 ms.
 * If an observed value changes in the meantime, only the latest value is sent.
 * Also, the Task has to wait longer if js is too busy which kinda auto-adjusts the output.
 *
 * tl;dr: We trade observe-param speed for a massive boost in set-param speed.
 * 
 */

var obuffer = []
var pusher = new Task(outputBuffer)
pusher.interval = 5
pusher.repeat(-1)


function observebuffered(client_id, req_id, val) {
  var client = obuffer[client_id]
  if(!client) {
    client = []
    obuffer[client_id] = client
  }
  client[req_id] = val
}

function outputBuffer() {
  for(var cid in obuffer) {
    var cl = obuffer[cid]
    for(var rid in cl) {
      output(parseInt(cid), rid, 1, cl[rid])
      delete cl[rid]
    }
    if(!cl.length) delete obuffer[cid]
  }
}


