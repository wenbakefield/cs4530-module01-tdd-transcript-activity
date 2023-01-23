import { StudentID, Student, Course, CourseGrade, Transcript } from './Types'
import DataBase from './dataBase';

let db: DataBase;

// start each test with a fresh empty database.
beforeEach(() => {
  db = new DataBase
});

// this may look undefined in TSC until you do an npm install
// and possibly restart VSC.
describe('tests for addStudent', () => {

  test('addStudent should add a student to the database', () => {
    // const db = new DataBase ()
    expect(db.nameToIDs('blair')).toEqual([])
    const id1 = db.addStudent('blair');
    expect(db.nameToIDs('blair')).toEqual([id1])
  });

  test('addStudent should return an unique ID for the new student',
    () => {
      // we'll just add 3 students and check to see that their IDs
      // are all different.
      const id1 = db.addStudent('blair');
      const id2 = db.addStudent('corey');
      const id3 = db.addStudent('delta');
      expect(id1).not.toEqual(id2)
      expect(id1).not.toEqual(id3)
      expect(id2).not.toEqual(id3)
    });

  test('the db can have more than one student with the same name',
    () => {
      const id1 = db.addStudent('blair');
      const id2 = db.addStudent('blair');
      expect(id1).not.toEqual(id2)
    })

  test('A newly-added student should have an empty transcript',
    () => {
      const id1 = db.addStudent('blair');
      const retrievedTranscript = db.getTranscript(id1)
      expect(retrievedTranscript.grades).toEqual([])
      expect(retrievedTranscript.student)
        .toEqual({
          studentID: id1, studentName: "blair"
        })
    });

  test('getTranscript should return the right transcript',
    () => {
      // add a student, getting an ID
      // add some grades for that student
      // retrieve the transcript for that ID
      // check to see that the retrieved grades are 
      // exactly the ones you added.    
    });

  test('getTranscript should throw an error when given a bad ID',
    () => {
      // in an empty database, all IDs are bad :)
      // Note: the expression you expect to throw must be wrapped in a (() => ...)
      expect(() => db.getTranscript(1)).toThrowError()
    });

    // test('getTranscript should throw an error when given a bad ID (bogus version)',
    // () => {
    //   // in an empty database, all IDs are bad :)
    //   // Note: the expression you expect to throw must be wrapped in a (() => ...)
    //   expect(db.getTranscript(1)).toThrowError()
    // });

})

describe('tests for addGrade', () => {

  test('addGrade should add the correct grade to a student transcript', () => {
    const id1 = db.addStudent('blair');
    const courseGrade : CourseGrade = {course: "CS 2500", grade: 42};
    db.addGrade(id1, "CS 2500", courseGrade);
    const courseGradeRetrieved = db.getTranscript(id1).grades.find(({ course }) => course === "CS 2500");
    expect(courseGradeRetrieved).toEqual(courseGrade)
  });

  test('addGrade should overwrite an existing grade for the same course', () => {
    const id1 = db.addStudent('blair');

    const oldCourseGrade : CourseGrade = {course: "CS 2500", grade: 42};
    db.addGrade(id1, "CS 2500", oldCourseGrade);
    let courseGradeRetrieved = db.getTranscript(id1).grades.find(({ course }) => course === "CS 2500");
    expect(courseGradeRetrieved).toEqual(oldCourseGrade)

    const newCourseGrade = {course: "CS 2500", grade: 64};
    db.addGrade(id1, "CS 2500", newCourseGrade);
    courseGradeRetrieved = db.getTranscript(id1).grades.find(({ course }) => course === "CS 2500");
    expect(courseGradeRetrieved).toEqual(newCourseGrade)
  });

  test('addGrade should throw an error if grade is less than 0', () => {
    const id1 = db.addStudent('blair');
    const courseGrade : CourseGrade = {course: "CS 2500", grade: -1};
    expect(() => db.addGrade(id1, "CS 2500", courseGrade)).toThrowError()
  });

  test('addGrade should throw an error if grade is greater than 100', () => {
    const id1 = db.addStudent('blair');
    const courseGrade : CourseGrade = {course: "CS 2500", grade: 101};
    expect(() => db.addGrade(id1, "CS 2500", courseGrade)).toThrowError()
  });

  test('addGrade should throw an error if Course does not match CourseGrade', () => {
    const id1 = db.addStudent('blair');
    const courseGrade : CourseGrade = {course: "CS 2500", grade: 42};
    expect(() => db.addGrade(id1, "CS 2501", courseGrade)).toThrowError()
  });

  test('addGrade should throw an error if student does not exist', () => {
    const id1 = 1;
    const courseGrade : CourseGrade = {course: "CS 2500", grade: 42};
    expect(() => db.addGrade(id1, "CS 2500", courseGrade)).toThrowError()
  });

})