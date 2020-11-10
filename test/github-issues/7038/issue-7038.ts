import "reflect-metadata";
import {expect} from "chai";
import {closeTestingConnections, createTestingConnections, reloadTestingDatabases} from "../../utils/test-utils";
import {Connection} from "../../../src/connection/Connection";
import {Post} from "./entity/Post";
import {Category} from "./entity/Category";
import {PostToCategory} from './entity/PostToCategory';

describe("github issues > #7038 Skips Creation of Multiple Related Items if their Primary Keys are Set to Null", () => {

    let connections: Connection[];
    before(async () => connections = await createTestingConnections({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql"]
    }));
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it("when related ids given are null, should successfully create related items", () => Promise.all(connections.map(async connection => {
        const postRepo = connection.getRepository(Post);
        const catRepo = connection.getRepository(Category);

        const post = await postRepo.save(postRepo.create({ title: 'post 1' }));
        const category1 = await catRepo.save(catRepo.create({ name: 'category 1' }));
        const category2 = await catRepo.save(catRepo.create({ name: 'category 2' }));

        post.tags = Promise.resolve([
            { id: null, postId: post.id, categoryId: category1.id},
            { id: null, postId: post.id, categoryId: category2.id}
        ] as any);

        const result = await postRepo.save(post);
        const rels = await result.tags as PostToCategory[];

        expect(rels.map(rel => rel.id)).to.be.an('array').that.includes(1).and.includes(2);
    })));

});
