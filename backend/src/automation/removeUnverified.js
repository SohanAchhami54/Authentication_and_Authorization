import cron from 'node-cron' 
import { User } from '../models/user.models.js'

const automation=()=>{
    cron.schedule(' */30 * * * *',async()=>{
        const thirtyMinAgo= new Date(Date.now()- 30 * 60 *1000) 
        await User.deleteMany({
            accountVerified:false, 
            createdAt:{$lt:thirtyMinAgo}
        })
    })
}
export {automation}