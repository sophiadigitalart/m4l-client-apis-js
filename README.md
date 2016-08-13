# m4l-client-apis-js


####A wrapper for Ableton Live's liveapi, meant to work with mxj-wsserver

#####Understands:
 - start: Reset all clients
 - stop: Reset all clients
 - start \[client_id\]: create a new client with this id
 - stop \[client_id\]: destroy the client with this id
 - \[client_id\] \[args..\]: execute commands in args
	
#####Outputs:
 - \[client_id\] \[status\] \[args..\]: response to previous input using this client_id,  
 status: 0 = ok, 1 = error,  
 args = errormessage or response

 
#####Arguments

The input arguments follow the pattern \[req_id, action, args\].  
The req_id is a reference that gets sent with all responses to this action.  
Read the MaxShell.ts file to get all the supported actions and their args.  

		






