import {City} from "./City";
import {Student} from "./Student";

export class Simulator {
    constructor(num_students, perGDL, perTLQ, perZAP, perTON, perTLJ, perSAL) {
        this.num_students = num_students;
        this.countHealty = num_students;
        this.countSick = 0;
        this.countRecover = 0;
        this.countDeath = 0;
        this.trackStudent = undefined;
        this.init(perGDL, perTLQ, perZAP, perTON, perTLJ, perSAL);
        this.track();

    }

    init(perGDL, perTLQ, perZAP, perTON, perTLJ, perSAL) {
        this.cities = [];
        this.cities.push(new City('Guadalajara', 1460189, 310));
        this.cities.push(new City('Tlaquepaque', 642114, 54));
        this.cities.push(new City('Zapopan', 1351854, 122));
        this.cities.push(new City('Tonala', 587982, 72));
        this.cities.push(new City('Tlajomulca', 603689, 35));
        this.cities.push(new City('El Salto', 603689, 35));

        let num_fromGDL = Math.floor(perGDL * this.num_students);
        let num_fromTLQ = Math.floor(perTLQ * this.num_students);
        let num_fromZAP = Math.floor(perZAP * this.num_students);
        let num_fromTON = Math.floor(perTON * this.num_students);
        let num_fromTLJ = Math.floor(perTLJ * this.num_students);
        let num_fromSAL = Math.floor(perSAL * this.num_students);

        this.students = [];

        for (let i = 0; i < this.num_students; i++) {
            if (num_fromGDL > 0) {
                this.students.push(new Student(this.cities[0]));
                num_fromGDL--;
                continue;
            }
            if (num_fromTLQ > 0) {
                this.students.push(new Student(this.cities[1]));
                num_fromTLQ--;
                continue;
            }
            if (num_fromZAP > 0) {
                this.students.push(new Student(this.cities[2]));
                num_fromZAP--;
                continue;
            }
            if (num_fromTON > 0) {
                this.students.push(new Student(this.cities[3]));
                num_fromTON--;
                continue;
            }
            if (num_fromTLJ > 0) {
                this.students.push(new Student(this.cities[4]));
                num_fromTLJ--;
                continue;
            }
            if (num_fromSAL > 0) {
                this.students.push(new Student(this.cities[5]));
                num_fromSAL--;
                continue;
            }
        }

    }

    nextDay(){
        let newSick = 0;
        for(let i = 0; i < this.num_students; i++){
            let state = this.students[i].nextState();
            //index 0 is prevState -- index 1 is currentState
            if (state[0] == 0 && state[1] == 1){
                this.countHealty--;
                this.countSick++;
                newSick++;
            }
            else if (state[0] == 1 && state[1] == 3){
                this.countSick--;
                this.countDeath++;
            }
            else if (state[0] == 1 && state[1] == 2){
                this.countSick--;
                this.countRecover++;
            }
            else{
                continue;
            }
        }
        for(let i = 0; i< this.cities.length;i++){
            this.cities[i].multiplyTransitionMatrix();
        }
        return [this.countHealty, this.countSick, this.countRecover, this.countDeath, newSick]
    }
    getRandomStudent(){
        let random = Math.floor(Math.random() * this.num_students)
        console.log(random)
        return this.students[random];
    }
    track(){
        if (this.trackStudent == undefined){
            this.trackStudent = this.getRandomStudent()
        }
        return this.trackStudent.healt_state;
    }

}


//let simulator = new Simulator(10000, 0.2, 0.2, 0.25, 0.2, 0.1, 0.05)
