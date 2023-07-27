import dbConnect from '../../../utils/dbConnect';
import Property from '../../../models/property';

export default async function handler(req, res) {
  // const { method } = req;
  // const { id } = req.query;

  const { method, query: { id } } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const property = await Property.findById(id);

        if (!property) {
          return res.status(404).json({ success: false, message: 'Property not found' });
        }

        res.status(200).json({ success: true, data: property });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
