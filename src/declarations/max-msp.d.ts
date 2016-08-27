
declare var $: (ref: string) => Maxobj
declare var outlet: (out: number, ...args: any[]) => void
declare var cpost: (arg: any) => void
declare var post: (arg: any) => void
declare var postprops: (obj: any) => void


interface LiveAPI {
	children: string[]
	id: string | number
	info: string
	mode: number
	patcher: Patcher
	path: string
	unquotedpath: string
	property: string | number
	proptype: string
	type: string
	
	call: (name: string, ...args: any[]) => any
	get: (property: string) => any
	getcount: (child: string) => number
	getstring: (property: string) => string
	goto: (path: string) => void
	set: (property: string, value: number) => void
}

declare var LiveAPI: {
	new(thispatcher: Patcher, path: string): LiveAPI
	new(thispatcher: Patcher, callback: (value: any) => void, path: string): LiveAPI
}

interface Patcher {
	
}

interface Maxobj {
	patcher: Patcher
}

interface jsthis extends Maxobj {
	outlet: (outlet_number: number, ...data: any[]) => void
	msg_int: (i: number, ...args: any[]) => void
	msg_float: (i: number, ...args: any[]) => void
	open: () => void
}