export const Service = {
    names: ['Vapid', 'Carson', 'Kitano', 'Dabver', 'Ibex', 'Morello', 'Akira', 'Titan', 'Dover', 'Norma'],

    source: ['YT','T', 'YT & T'],

    generate(id:number) {
        return {
            id,
            name: this.generateName(),
            source: this.generateSouce(),
            waffler: this.generatePercent(),
            racizm: this.generatePercent()
        };
    },

    generateName() {
        return this.names[Math.floor(Math.random() * Math.floor(10))];
    },

    generateSouce() {
        return this.source[Math.floor(Math.random() * Math.floor(3))];
    },

    generatePercent() {
        return  Math.floor(Math.random() * Math.floor(100)) +'%';
    }
};
