import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "../../../../src";
import { PostToCategory } from './PostToCategory';

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title?: string;

    @OneToMany(() => PostToCategory, tag => tag.post, { cascade: true })
    tags?: Promise<PostToCategory[]>;

}
