import dbConnect from '../../../db/connectDB'
import Hero from '../../../models/Hero'

dbConnect()

// get a unique record, edit record, delete record
export default async (req, res) => {
  const { 
    method,
    query: { id } 
  } = req

  switch(method) {
    case 'GET':
      try {
        const hero = await Hero.findById(id)
        
        if(!hero) {
          res.status(400).json({
            success: false
          });
        }
        
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
    case 'PUT': 
      try {
        const hero = await Hero.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        }) 

        if(!hero) {
          res.status(400).json({
            success: false
          });
        }
        
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
    case 'DELETE': 
      try {
        await Hero.deleteOne({ _id: id }) 
        
        res.status(200).json({
          success: true,
        })
      } catch (error) {
        res.status(400).json({
          success: false
        });
      }
      break;
    default: 
    res.status(400).json({
      success: false
    });
    break;
  }

}