class Slider {
    constructor (imgtext) {
        this.imgtext = imgtext;

        this.i = 0;

        //Cible des balises HTML
        this.imageTarget = $("#sliderimage"); //<img>
        this.textTarget = $("#slidertexte"); //<p>

        this.imageTarget.attr('src', this.imgtext[this.i].image);
        this.imageTarget.attr('alt', this.imgtext[this.i].alt);
        this.textTarget.text(this.imgtext[this.i].text);
        this.initSlider()
    } 

    nextSlide() {
        this.i++;
        if (this.i > this.imgtext.length - 1){ //si nous sommes sur la derniere slide nextSlide est 
            this.i = 0;//la première
        }
        this.imageTarget.attr('src', this.imgtext[this.i].image);
        this.imageTarget.attr('alt', this.imgtext[this.i].alt);
        this.textTarget.text(this.imgtext[this.i].text);
    }

    prevSlide() {
        this.i--;
        if (this.i < 0){ //si nous sommes sur la derniere slide nextSlide est 
            this.i = this.imgtext.length -1;//la première
        }
        this.imageTarget.attr('src', this.imgtext[this.i].image);
        this.imageTarget.attr('alt', this.imgtext[this.i].alt);
        this.textTarget.text(this.imgtext[this.i].text);
    }

  //method + autoplay +ecoute evenement 
    initSlider() {
        this.idAutoPlay = setInterval(() => {
            this.nextSlide();
        }, 5000);
        $("#pauseBtn").on("click", () => {
            clearInterval(this.idAutoPlay);
            $("#playBtn").css('display', 'block');
            $("#pauseBtn").css('display', 'none');
        });
        $("#playBtn").on("click", ()=> {
            $("#playBtn").css('display', 'none');
            $("#pauseBtn").css('display', 'block');
            this.idAutoPlay = setInterval(() => {
                this.nextSlide();
            }, 5000);
        });
        $("#suivantBtn").on("click", ()=> {
            $("#playBtn").css('display', 'block');
            $("#pauseBtn").css('display', 'none');
            clearInterval(this.idAutoPlay);
            this.nextSlide();
        });
        $("#precedentBtn").on("click", ()=> {
            $("#playBtn").css('display', 'block');
            $("#pauseBtn").css('display', 'none');
            clearInterval(this.idAutoPlay);
            this.prevSlide();
        });
        $(document).on('keydown',() => {
            if(event.key === 'ArrowRight') {
                $("#playBtn").css('display', 'block');
                $("#pauseBtn").css('display', 'none');
                clearInterval(this.idAutoPlay);
               this.nextSlide();
            } else if (event.key === 'ArrowLeft') {
                $("#playBtn").css('display', 'block');
                $("#pauseBtn").css('display', 'none');
                clearInterval(this.idAutoPlay);
                this.prevSlide();
            } 
        });
    }
}

