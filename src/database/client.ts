import { basename } from 'path';
import { createReadStream } from 'fs';
import { SanityClient, createClient } from '@sanity/client';

export const sanityClient: SanityClient = createClient({
  projectId: 'g8kwgm04',
  dataset: 'production',
  apiVersion: '2022-10-05',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

class Client {
  sanity_client: SanityClient;
  constructor(sanity_client: SanityClient) {
    this.sanity_client = sanity_client;
  }

  async uploadImage(filePath: string) {
    try {
      var imageAsset = await this.sanity_client.assets.upload('image', createReadStream(filePath), { filename: basename(filePath) });
    } catch (err) {
      console.log('db_error:', err);
      return null;
    }

    return { image: imageAsset }
  }
}

/*
async function clearDatabase(type){
  try {
    var r = await client.delete({ query: '*[_type=="'+type+'"]'});
  } catch(err){
    console.log(type,err);
  }
  return r;
}
*/

let database_client = new Client(sanityClient);

export default database_client;