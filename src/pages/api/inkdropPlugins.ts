import { getInkdropPlugins } from "@/utils/getInkdropPlugins";

import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

const plugins = ["code-title", "link-card", "chartjs"];

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "GET") {
    const data = await getInkdropPlugins();
    res.status(200).json(data);
  } else {
    res.status(405).end("Method Not Allowed");
  }
};

export default handler;
