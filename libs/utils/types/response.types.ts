export class ApiResponse {
    constructor(
        public status: string,
        public message?: string,
        public data?: any,
    ) {}
}
