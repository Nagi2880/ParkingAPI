export class CreateParkingDto {
    id: string;
    ownerId: string;
    name: string;
    description?: string;
    address: string;
    latitude: number;
    longitude: number;
    pricePerHour: number;
    placesToPark: number;
    createdAt: Date;
}
