import mongoose, { Types } from 'mongoose'



export interface User {
    email: string
    teachers: {
        type: Types.DocumentArray<Types.ObjectId>
    }
}

const userSchema = new mongoose.Schema<User>({
    email: {type: String, required: true, unique: true},
    teachers: {type: Types.DocumentArray<Types.ObjectId>, ref: 'teachers'}
})

export default mongoose.model('user', userSchema)