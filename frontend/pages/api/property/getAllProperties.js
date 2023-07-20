import dbConnect from '../../../utils/dbConnect';
import Property from '../../../models/property';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const properties = await Property.find({});
        res.status(200).json({ success: true, data: properties });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
