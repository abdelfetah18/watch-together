import Repository from "./Repository";

export default class RoomCategoryRepository extends Repository {
    DEFAULT_PROPS = `{ 
        _id,
        name
    }`;

    async listAll(): Promise<RoomCategory[]> {
        return await this.sanityClient.fetch(`*[_type=="room_category"]${this.DEFAULT_PROPS}`);
    }
}