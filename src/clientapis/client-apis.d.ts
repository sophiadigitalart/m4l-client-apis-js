
declare var require: (string) => any;

interface ClientApis extends jsthis {
	start: (client_id?: number) => void
	stop: (client_id?: number) => void
	msg_int: (client_id: number, req_id: number, action: string, ...args: any[]) => void
}

declare var me : ClientApis;
