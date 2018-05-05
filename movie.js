class Movie{
    constructor(name, time, contentUrl, score) {
        this.name = name;
        this.time = time;
        this.contentUrl = contentUrl;
        this.score = score;

        this.url = "";
        this.image = "";
        this.describe = "";
        this.time = "";
        this.ratio = "";
        this.type = "";

        this.actor = "";
        this.releaseTime = "";
        this.region = "";
    }

    setType(type) {
        this.type = type;
    }

    getType() {
        return this.type;
    }

    setRatio(ratio) {
        this.ratio = ratio;
    }

    getRatio() {
        return this.ratio;
    }

    setTime(time) {
        this.time = time;
    }

    getTime() {
        return this.time;
    }

    setDescribe(describe) {
        this.describe = describe;
    }

    getDescibe() {
        return this.describe;
    }

    setImage(image) {
        this.image = image;
    }

    getImage() {
        return this.image;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setTime(time) {
        this.time = time;
    }

    getTime() {
        return this.time;
    }

    setScore(score) {
        this.score = score;
    }

    getScore() {
        return this.score;
    }

    setContentUrl(contentUrl) {
        this.contentUrl = contentUrl;
    }

    getContentUrl() {
        return this.contentUrl;
    }
};

module.exports = { Movie };