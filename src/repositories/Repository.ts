import { SanityClient } from "@sanity/client";

export default abstract class Repository {
    protected static DEFAULT_PROPS: string;
    constructor(protected sanityClient: SanityClient) { }
}