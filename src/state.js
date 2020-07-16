
class State {

    constructor() {
        this.id = 'chords';
        if (!!localStorage.getItem(this.id)) {
            this.data = this.getInLocal();
        } else {
            this.data = [];
        }
    }

    saveInLocal (data) {
        const DATA = JSON.stringify(data)
        localStorage.setItem(this.id, DATA)
    }

    getInLocal () {
        const DATA = localStorage.getItem(this.id)
        return JSON.parse(DATA)
    }

    add (payload) {
        this.data.push(payload);
        this.saveInLocal(this.data);
    }

    update (index, payload) {
        this.data[index] = payload;
        this.saveInLocal(this.data);
    }

    remove (index) {
        this.data = this.data.filter((e, i) => i !== index);
        this.saveInLocal(this.data);
    }

    get () {
        return this.data;
    }
}

let state = new State();

export default state;