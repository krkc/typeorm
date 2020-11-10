import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "../../../../src";
import {Post} from "./Post";
import {Category} from "./Category";

@Entity()
export class PostToCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    postId!: number;

    @ManyToOne(() => Post, post => post.tags)
    post?: Promise<Post>;

    @Column()
    categoryId!: number;

    @ManyToOne(() => Category, category => category.tags)
    category?: Promise<Category>;
}
