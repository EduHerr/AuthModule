import { Module } from "@nestjs/common";
import { IEncryptService } from "./adapater";
import { EncryptService } from "./service";

@Module({
    imports: [],
    providers: [{
        provide: IEncryptService,
        useClass: EncryptService
    }],
    exports: [IEncryptService]
})
export class EncryptModule {}
