function processSchoolRegister(studentsArr) {

    function processStudent(studentInfoSplit, schoolRegister) {
        const rawScore = studentInfoSplit[2].split(': ');
        const score = Number(rawScore[1]); // empty student, that means he drops out of school
        const rawGrade = studentInfoSplit[1].split(': ');
        let grade = Number(rawGrade[1]);
        grade++; // he has passed the class so move him up for the new year
        if (score < 3.00 || grade > 12) // student doesn't have enough score or has already graduated
            return {};

        const rawName = studentInfoSplit[0].split(': ');
        const name = rawName[1];
        
        return {
            name: name,
            grade: grade,
            score, score
        }
    }

    function fillRegister(studentsArr, schoolRegister) {
        for (const studentInfo of studentsArr) {
            const studentInfoSplit = studentInfo.split(', ');
            const student = processStudent(studentInfoSplit, schoolRegister);
            if (!student.hasOwnProperty('grade')) // he has dropped out
                continue;
        
                // if the grade of the student is yet to have been created, do so
            if (!schoolRegister.hasOwnProperty(student.grade)) {
                schoolRegister[student.grade] = [];
            }
            schoolRegister[student.grade].push(student);
        }
    }

    function calculateAverageScore(gradeStudents) {
        sum = 0;
        for (let student of gradeStudents) {
            sum += student.score;
        }
        sum /= gradeStudents.length;
        return sum;
    }


    function extractStudentNames(gradeStudents) {
       return gradeStudents.map((student) => student.name).join(', ');
    }

    function formatGradeInfo(gradeNum) {
        const gradeStudents = schoolRegister[gradeNum];
        let gradeOutput = [];
        gradeOutput.push(`${gradeNum} Grade`);
        gradeOutput.push(`List of students: ${extractStudentNames(gradeStudents)}`);
        gradeOutput.push(`Average annual score from last year: ${calculateAverageScore(gradeStudents).toFixed(2)}`);
        return gradeOutput.join('\n');
    }

    function printSchoolRegister(schoolRegister) {
        const sortedGrades = Object.keys(schoolRegister)
        .map(grade => Number(grade))
        .sort((a, b) => {
            if (a < b)
                return -1;
            else if (a > b)
                return 1;
            return 0;
        });

        for (let gradeNum of sortedGrades) {
            console.log(formatGradeInfo(gradeNum) + '\n');
        }
    }


    let schoolRegister = {}
    fillRegister(studentsArr, schoolRegister);
    printSchoolRegister(schoolRegister);
}

processSchoolRegister([
    "Student name: Mark, Grade: 8, Graduated with an average score: 4.75",
     "Student name: Ethan, Grade: 9, Graduated with an average score: 5.66",
     "Student name: George, Grade: 8, Graduated with an average score: 2.83",
     "Student name: Steven, Grade: 10, Graduated with an average score: 4.20",
     "Student name: Joey, Grade: 9, Graduated with an average score: 4.90",
     "Student name: Angus, Grade: 11, Graduated with an average score: 2.90",
     "Student name: Bob, Grade: 11, Graduated with an average score: 5.15",
     "Student name: Daryl, Grade: 8, Graduated with an average score: 5.95",
     "Student name: Bill, Grade: 9, Graduated with an average score: 6.00",
     "Student name: Philip, Grade: 10, Graduated with an average score: 5.05",
     "Student name: Peter, Grade: 11, Graduated with an average score: 4.88",
     "Student name: Gavin, Grade: 10, Graduated with an average score: 4.00"
    ]);
console.log('\n');
processSchoolRegister([
    'Student name: George, Grade: 5, Graduated with an average score: 2.75',
    'Student name: Alex, Grade: 9, Graduated with an average score: 3.66',
    'Student name: Peter, Grade: 8, Graduated with an average score: 2.83',
    'Student name: Boby, Grade: 5, Graduated with an average score: 4.20',
    'Student name: John, Grade: 9, Graduated with an average score: 2.90',
    'Student name: Steven, Grade: 2, Graduated with an average score: 4.90',
    'Student name: Darsy, Grade: 1, Graduated with an average score: 5.15'
]);
