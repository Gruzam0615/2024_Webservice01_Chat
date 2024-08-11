import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "Chatroom"
})
export class Chatroom {

    @PrimaryGeneratedColumn()
    chatRoomIndex: bigint

    @Column()
    chatRoomUUID: string

    @Column()
    chatRoomTitle: string

    @Column()
    chatRoomCreatedDate: string

}