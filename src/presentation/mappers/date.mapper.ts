import { type IMapper } from "./mapper.interface.js";
import { Injectable } from "@nestjs/common";

export type Timestamp = {
    nanos: number,
    seconds: string;
}

@Injectable()
export class DateMapper implements IMapper<Date, Timestamp> {
    public toPresentation(domain: Date): Timestamp {
        const time = domain.getTime();
        return {
            seconds: Math.floor(time / 1000).toString(),
            nanos: (time % 1000) * 1_000_000
        };
    }
}