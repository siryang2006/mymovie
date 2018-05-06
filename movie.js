class Movie{
    constructor(name, time, contentUrl, score, type) {
        this.name = name;
        this.time = time;
        this.contentUrl = contentUrl;
        this.score = score;

        this.url = "";
        this.image = "";
        this.describe = "";
        this.time = "";
        this.ratio = "";
        this.typeText = "";
		this.describeImage = ""; 

        this.actor = "";
        this.releaseTime = "";
        this.region = "";

		this.company = "";
		this.type = type;
		this.descriptionHtml = "";
    }
};

module.exports = { Movie };