import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { options } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const session = await getServerSession(req, res, options);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const isFavorited = await prisma.favoriteCharacter.findFirst({
      where: {
        id: id as string,
        authorId: session.user?.id,
      },
    });

    return res.json({ isFavorited: !!isFavorited });
  }

  if (req.method === 'POST') {
    const { character } = req.body;
    
    const existingFavorite = await prisma.favoriteCharacter.findFirst({
      where: {
        id: character.id,
        authorId: session.user?.id,
      },
    });

    if (existingFavorite) {
      return res.status(400).json({ error: 'Character already favorited' });
    }

    const result = await prisma.favoriteCharacter.create({
      data: {
        ...character,
        author: { connect: { id: session.user?.id } },
      },
    });

    return res.json(result);
  }

  if (req.method === 'DELETE') {
    await prisma.favoriteCharacter.deleteMany({
      where: {
        id: id as string,
        authorId: session.user?.id,
      },
    });

    return res.status(204).end();
  }

  res.status(405).end(); 
}
