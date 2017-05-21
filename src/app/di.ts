import { InjectionToken } from "@angular/core";

export const ioToken: InjectionToken<SocketIOClientStatic> = new InjectionToken<SocketIOClientStatic>("io");
