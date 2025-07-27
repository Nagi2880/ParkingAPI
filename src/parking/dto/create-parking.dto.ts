export class CreateParkingDto {
    id: string;
    ownerId: string;
    name: string;
    description?: string;
    latitude: string;
    longitude: string;
    pricePerHour: number;
    placesToPark: number;
    createdAt: Date;
}
