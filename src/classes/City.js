export class City {
    constructor(name, population, number_of_cases) {
        this.name = name;
        this.population = population;
        this.number_of_cases = number_of_cases;
        this.setTransitionMatrix();

    }
    setTransitionMatrix(){

        let p = this.number_of_cases/this.population;
        let complement = 1-p;

        this.tansition_matrix = [
            [complement, p, 0.0, 0.0],
            [0.0, 0.93, 0.0633, 0.0067],
            [0.0, 0.0, 0.0, 1]
        ];

    }
    multiplyTransitionMatrix(){
        this.number_of_cases = Math.floor(this.number_of_cases * 1.2)
        this.tansition_matrix[0][1] = this.number_of_cases/this.population;
        this.tansition_matrix[0][0] = 1 - this.tansition_matrix[0][1];
    }
    matrix(){
        return this.tansition_matrix;
    }
}
