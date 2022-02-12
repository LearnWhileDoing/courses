import { NextApiRequest, NextApiResponse } from "next";

import fetchCourseCertificates from "~/api/functions/fetchCourseCertificates";

// noinspection JSUnusedGlobalSymbols
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const collection = await fetchCourseCertificates(req.query.id as string);

  res.status(200).json(collection);
};
