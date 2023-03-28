import mongoose, { Types } from 'mongoose'

export interface Teacher {
    email: string
}

const teacherSchema = new mongoose.Schema<Teacher>({
    email: {type: String, required: true, unique: true}
})

export default mongoose.model('teacher', teacherSchema)
