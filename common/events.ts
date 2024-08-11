export type RoomUUID = string;

export interface Room {
    roomUUID: RoomUUID;
    roomTitle: string;
    roomCreatedDate: string;
}

interface Success<T> {
    data: T;
}

export type Response<T> = Error | Success<T>;

export interface ServerEvents {
    
}

export interface ClientEvents {
    "room:list": (callback: (res: Response<Room[]>) => void) => void;
}