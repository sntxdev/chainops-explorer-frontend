import type { NextApiRequest, NextApiResponse } from "next";
import { conn as pool } from "../../../utils/database";

type Data = {
  name: string;
};

async function retrieveData() {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const result = await pool.query(
      "SELECT * FROM block ORDER BY height DESC LIMIT 20 "
    );
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
  }
}
