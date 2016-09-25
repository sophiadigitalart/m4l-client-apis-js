# m4l-client-apis-js


####A wrapper for Ableton Live's liveapi, meant to work with mxj-wsserver

#####Understands:
 - start: Reset all clients
 - stop: Reset all clients
 - start \[client_id\]: create a new client with this id
 - stop \[client_id\]: destroy the client with this id
 - \[client_id\] \[req_id\] \[action\] \[args..\]: execute action with args
	
#####Outputs:
 - \[client_id\] \[req_id\] \[status\] \[args..\]: response to previous req_id from client_id,  
 status: 0 = ok, 1 = keep-alive, 2 = error  
 args = errormessage or response


Read the MaxShell.ts file to get all the supported actions and their args.  

		






