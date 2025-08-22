import Repository from "./Repository";

export default class RoomCategoryRepository extends Repository {
    static DEFAULT_PROPS = `{ 
        _id,
        name
    }`;

    async listAll(): Promise<RoomCategory[]> {
        return await this.sanityClient.fetch(`*[_type=="room_category"]${RoomCategoryRepository.DEFAULT_PROPS}`);
    }
}