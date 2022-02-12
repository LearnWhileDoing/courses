import { NextApiRequest, NextApiResponse } from "next";

import fetchTags from "~/api/functions/fetchTags";

// noinspection JSUnusedGlobalSymbols
export default async (_: NextApiRequest, res: NextApiResponse) => {
  const collection = await fetchTags();

  res.status(200).json(collection);
};
