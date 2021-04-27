import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '../../utils/initSupabase';

// Example of how to verify and get user data server-side.
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const token: any = req.headers.token;

  const { data: user, error } = await supabase.auth.api.getUser(token);

  if (error) res.status(401).json({ error: error.message });

  res.status(200).json(user);
};
