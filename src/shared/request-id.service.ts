import { Injectable, Scope } from "@nestjs/common";

@Injectable({scope: Scope.REQUEST})
export class RequestIdService {
    public readonly requestId = `req-${Math.random().toString(36).substring(2, 9)}`;
}