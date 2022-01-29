import dbConnect from '../../../db/connectDB'
import Hero from '../../../models/Hero'

dbConnect()

// get all records, post a new record
export default async (req, res) => {
  const { method }  = req

  switch(method) {
    case 'GET':
      try {
        const hero = await Hero.find()
        res.status(200).json({
          success: true,
          hero
        })
      } catch (error) {
        res.status(400).json({
          success: false
        });
      }
      break;
    case 'POST':
      try {
        const hero = await Hero.create(req.body)

        res.status(201).json({
          success: true,
          hero
        })
      } catch (error) {
        res.status(400).json({
          success: false
        })
      }
      break;
    default:
      res.status(400).json({
        success: false
      })
      break;
  }
}