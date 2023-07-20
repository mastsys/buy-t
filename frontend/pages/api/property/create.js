import dbConnect from '../../../utils/dbConnect'
import Property from '../../../models/property'

dbConnect()

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const property = await Property.create(req.body)  
      res.status(201).json({ success: true, message: 'Property created', data: property })
    } catch (error) {
      res.status(400).json({ success: false, message: 'Error creating property', error: error.message })
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" })
  }
}

export default handler;
