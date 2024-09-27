import { getUser } from "../../lib/dataSource";

export default async function handler(req, res) {
  let params = JSON.parse(req.body);
  const result = await getUser(params.email, params.password);
  return res.status(200).json({ data: result });
}
