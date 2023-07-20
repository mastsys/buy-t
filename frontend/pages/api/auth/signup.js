import User from '../../../models/user';
import dbConnect from '../../../utils/dbConnect';
import handler from '../../../utils/handler';

handler
  .post(createUser)

async function createUser(req, res) {
  try {
    const data = req.body;

    const { email, password, firstName, lastName, birthDate, status } = data;

    if (!email || !password || !firstName || !lastName || !birthDate || !status) {
      return res.status(422).json({ message: "Data incomplete" });
    }

    dbConnect();

    const user = await User.create({ email, password, firstName, lastName, birthDate, status });

    return res.status(201).json({ message: 'Created user!' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export default handler;
