export class Student{
    constructor(city) {
        this.city = city;
        this.healt_state =  0;
        // 0 = HEALTHY -- 1 = SICK -- 2 = RECOVER -- 3 = DEATH
    }
    nextState(){
        let random =  Math.random();
        let prevState =  this.healt_state;
        switch (this.healt_state) {
            case 0:
                if(random <= this.city.matrix()[0][1]){
                    this.healt_state = 1;
                }else{
                    this.healt_state = 0;
                }
                break;

            case 1:
                if(random <= this.city.matrix()[1][3]){
                    this.healt_state = 3;
                }else if (random <= this.city.matrix()[1][2]){
                    this.healt_state = 2;
                }else{
                    this.healt_state = 1
                }
                break;
            case 2:
                this.healt_state = 2;
                break;
            case 3:
                this.healt_state = 3;
        }
        return [prevState, this.healt_state];
    }
}
