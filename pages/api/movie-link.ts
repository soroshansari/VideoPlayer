import { NextApiRequest, NextApiResponse } from "next";

const MovieLink = async (
  { query, method }: NextApiRequest,
  res: NextApiResponse
) => {
  switch (method) {
    case "GET":
      const { name, email, subject, message } = query;
      try {
        res.status(200).json({ Status: "Success" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default MovieLink;
