import { StudentID, Student, Course, CourseGrade, Transcript } from './Types'
import { IDataBase } from './IDataBase'

const Avery : Student = { studentID: -1, studentName: "Avery"}
const emptyTranscript : Transcript = { student: Avery, grades: [] };

export default class DataBase implements IDataBase {

    /** the list of transcripts in the database */
    private transcripts : Transcript [] = []

    /** the last assigned student ID 
     * @note Assumes studentID is Number
    */
    private lastID : number

    constructor () {this.lastID = 0}

    /** Adds a new student to the database
     * @param {string} newName - the name of the student
     * @returns {StudentID} - the newly-assigned ID for the new student
     */
    addStudent (newName: string): StudentID {
        const newID = this.lastID++
        const newStudent:Student = {studentID: newID, studentName: newName}
        this.transcripts.push({student: newStudent, grades: []})
        return newID
    }


    /**
     * @param studentName 
     * @returns list of studentIDs associated with that name
     */
    nameToIDs (studentName: string) : StudentID[] {
        return this.transcripts
            .filter(t => t.student.studentName === studentName)
            .map(t => t.student.studentID)
    }


    /**
     * 
     * @param id - the id to look up
     * @returns the transcript for this ID
     */
    getTranscript (id: StudentID): Transcript {
        const ret : Transcript | undefined = this.transcripts.find(t => t.student.studentID === id)
            if (ret === undefined) {throw new Error("StudentID does not exist")}
            else {return ret}
    }

        
    deleteStudent (id: StudentID): void  {
        throw new Error("not implemented yet")  
    }   // hmm, what to do about errors??

    /**
     * 
     * @param id - the ID of the student that the grade should be added to
     * @param course - the course that the grade should be added to
     * @param courseGrade - the grade that should be added
     */
    addGrade (id: StudentID, course: Course, courseGrade: CourseGrade) : void {
        if (course !== courseGrade.course) {
            throw new Error("Course does not match CourseGrade");
        }
        if (courseGrade.grade < 0) {
            throw new Error("Grade is less than 0");
        }
        if (courseGrade.grade > 100) {
            throw new Error("Grade is greater than 100");
        }
        
        const studentTranscript = this.getTranscript(id);
        let newGrade = courseGrade;

        try {
            newGrade = this.getGrade(id, course);
            newGrade.grade = courseGrade.grade;
        } catch (error) {
            newGrade = courseGrade;
        }
        studentTranscript.grades.push(newGrade);
    }

    getGrade (id: StudentID, course: Course) : CourseGrade {
        const studentTranscript = this.getTranscript(id);
        const courseGrade : CourseGrade | undefined = studentTranscript.grades.find(t => t.course === course)
            if (courseGrade === undefined) {
                throw new Error("Course does not exist");
            }
            else {
                return courseGrade;
            }
    }

    getAllStudentIDs () : StudentID[] {
        throw new Error("not implemented yet");
    }
    
    
}
    