import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client';
import { topicPostsQuery } from '../../../utils/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET'){
    const { topic } = req.query;

    const postsQuery = topicPostsQuery(topic);

    const posts = await client.fetch(postsQuery);

    res.status(200).json(posts);
  }
}