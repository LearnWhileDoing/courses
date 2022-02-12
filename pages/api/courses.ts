import { NextApiRequest, NextApiResponse } from "next";

import fetchCourses from "~/api/functions/fetchCourses";

// noinspection JSUnusedGlobalSymbols
export default async (_: NextApiRequest, res: NextApiResponse) => {
  const collection = await fetchCourses();

  res.status(200).json(collection);
};
