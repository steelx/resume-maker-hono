export interface QueryFnResponse<Response, Meta = NonNullable<unknown>> {
    data?: Response | undefined
    error: unknown
    meta?: Meta
}
