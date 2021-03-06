import { IsNotEmpty, IsInt, Max, Min } from 'class-validator';

export class TvShowDTO {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    scoring: number;

    actor: string;

    image: string;
}

// tslint:disable-next-line:max-classes-per-file
export class TvShowRO {
    id?: string;
    title: string;
    description: string;
    actor: string;
    scoring: number;
    image?: string;
}
