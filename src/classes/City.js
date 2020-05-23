export class City {
    constructor(name, population, number_of_cases) {
        this.name = name;
        this.population = population;
        this.number_of_cases = number_of_cases;
        this.current_day = 1;
        this.setTransitionMatrix();

    }
    setTransitionMatrix(){

        let p = this.number_of_cases/this.population;
        let complement = 1-p;

        this.tansition_matrix = [
            [complement, p, 0.0, 0.0],
            [0.0, 0.93, 0.0633, 0.0067],
            [0.0, 0.0, 0.0, 1],
            [0.0, 0.0, 1, 0.0]
        ];

    }
    multiplyTransitionMatrix(){
        if (this.current_day < 34){
            this.number_of_cases = Math.floor(this.number_of_cases * 1.045);
        } else {
            this.number_of_cases = Math.floor(this.number_of_cases * 0.953);
        }
        this.tansition_matrix[0][1] = this.number_of_cases/this.population;
        this.tansition_matrix[0][0] = 1 - this.tansition_matrix[0][1];
        this.current_day++;
    }
    matrix(){
        return this.tansition_matrix;
    }
}
