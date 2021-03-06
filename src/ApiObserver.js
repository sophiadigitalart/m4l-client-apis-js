
export default class ApiObserver {
  constructor(api, property, callback) {
    var self = this;
    this.api = new LiveAPI(me.patcher, val => {
      if(val.shift() == property) callback(val)
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
