import { NextApiRequest, NextApiResponse } from "next";

import fetchCourseIndex from "~/api/functions/fetchCourseIndex";

// noinspection JSUnusedGlobalSymbols
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const collection = await fetchCourseIndex(req.query.id as string);

  res.status(200).json(collection);
};
