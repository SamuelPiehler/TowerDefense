var delta = new class {
    id = 0;
    start = Date.now();
    last = Date.now();
    timeouts = [];
    loops = [];
    interval = setInterval(this.tick, 0);
    tick() {
        var n = Date.now();
        var dt = n - this.last;
        this.last = Date.now();
        for (let index = 0; index < delta.timeouts.length; index++) {
            const element = delta.timeouts[index];
            if (n - element[2] >= element[1]) {
                element[0]();
                delta.timeouts.splice(index, 1);
                index--;
            }
        }
    }
    timeout(func, time) {
        delta.timeouts.push([func, time, Date.now()]);
    }

    loop(func, time, times = -1) {
        this.loops.push([id, func, time, times, Date.now(), false, false]);
        this.id++;
        return {
            id: this.id,
            getindex: () => {
                return (() => {
                    delta.loops.forEach(el => {
                        if (el[0] = this.id) return el;
                    })
                })
            },
            stop: () => {
                this.getindex()[5] = true;
            },
            resume: () => {
                this.getindex()[5] = false;
            },
            start: () => {
                this.getindex()[5] = false;
            },
            remove: () => {
                this.getindex()[6] = true;
            }
        }
    }

}