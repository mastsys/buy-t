import User from "../../../models/user";
import dbConnect from "../../../utils/dbConnect";


export default async function getAllUsers(req, res) {
  if (req.method === 'GET') {
    try {
      await dbConnect();
      const users = await User.find();

      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
