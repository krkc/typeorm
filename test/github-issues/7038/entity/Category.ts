import {Column, PrimaryGeneratedColumn, Entity, OneToMany} from "../../../../src";
import { PostToCategory } from './PostToCategory';

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name?: string;

    @OneToMany(type => PostToCategory, tag => tag.category, { cascade: true })
    tags?: Promise<PostToCategory[]>;

}
