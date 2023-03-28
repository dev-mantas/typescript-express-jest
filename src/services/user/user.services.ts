import { Request, Response } from 'express'
import userSchema from './user.schema'
import teacherSchema from './teacher.schema'
export async function registerStudents (req: Request, res: Response) {
    
    const { teacher, students } = req.body
    // Should validate inputs, check for valid emails etc...
    try {
        // Loop through array of student emails and create documents, 
        // No need to worry for duplicates as we set 'unique: true' on the model.
        for(let i = 0; i < students.length; i++) {
            const result = await userSchema.create({email: students[i]})
        }
        // Once finished send response
        return res.status(204).send('ok')
    } catch(error) {
        // Should use error middleware
        throw res.status(400).send(error)
    }    
}

export async function retrieveCommonStudents(req: Request, res: Response) {
    try {
        const teacherEmails = req.query.teacher;
    
        if (!teacherEmails || teacherEmails.length === 0) {
          return res.status(200).json({ students: [] });
        }
    
        const teacherEmailArray = Array.isArray(teacherEmails) ? teacherEmails : [teacherEmails];
    
        const teachers = await userSchema.find({ email: { $in: teacherEmailArray }}).populate('students');
    
        const commonStudents = teachers.reduce((acc: any, teacher: any, index: any) => {
          const studentEmails = teachers.map(student => student.email);
          return index === 0 ? studentEmails : acc.filter(email => studentEmails.includes(email));
        }, []);
    
        res.status(200).json({ students: commonStudents });
      } catch (error) {
        res.status(400).send({ message: error });
      }
  }

  export async function suspendStudent(req: Request, res: Response) {
    try {
        const studentEmail = req.body.student;
    
        if (!studentEmail) {
          return res.status(400).json({ message: 'Student email is required' });
        }
    
        await User.updateOne({ email: studentEmail, role: 'student' }, { suspended: true });
    
        res.status(204).send();
      } catch (error) {
        res.status(400).send({ message: error });
      }
  }

  export async function retrieveNoticcations(req: Request, res: Response) {
    try {
        const teacherEmail = req.body.teacher;
        const notification = req.body.notification;
    
        if (!teacherEmail || !notification) {
          return res.status(400).json({ message: 'Teacher email and notification text are required' });
        }
    
        const mentionedStudents = notification.match(/@\S+@\S+\.\S+/g) || [];
    
        const teacher = await teacherSchema.findOne({ email: teacherEmail }).populate('students');
        const registeredStudents = teacher.students.filter(student => !student.suspended).map(student => student.email);
    
        const recipients = [...new Set([...registeredStudents, ...mentionedStudents])];
    
        res.status(200).json({ recipients });
      } catch (error) {
        res.status(400).send({ message: error });
      }
  }