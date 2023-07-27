import dbConnect from '../../../utils/dbConnect'
import Property from '../../../models/property';

dbConnect()

const handler = async (req, res) => {
  if (req.method === 'PUT') {
    try {
      const { id, ...updateData } = req.body; 
      const updatedProperty = await Property.findByIdAndUpdate(id, updateData, { new: true })  
      
      if (!updatedProperty) {
        return res.status(404).json({ success: false, message: 'Property not found' });
      }

      res.status(200).json({ success: true, message: 'Property updated', data: updatedProperty })
    } catch (error) {
      res.status(400).json({ success: false, message: 'Error', error: error.message })
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" })
  }
}

export default handler;
