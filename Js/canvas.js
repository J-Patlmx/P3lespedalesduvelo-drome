class Canvas {
    constructor() {
        //boutons en lien avec la class resa 
        this.confirmer = $("#confirmer");
        this.annuler = $("#annuler");
        this.effacer = $("#effacer");
        //objet Canvas
        this.canvas = $("canvas");
        //contexte de l'élément canvas
        this.ctx = this.canvas[0].getContext("2d");

        this.enCoursDeDessin = false;
        this.dessinFini = false;
        //coordonnées pour le déplacement de stylo (moveTo())
        this.topCanvas = this.canvas[0].getBoundingClientRect().top;
        this.leftCanvas = this.canvas[0].getBoundingClientRect().left;

        this.x = this.topCanvas;
        this.y = this.leftCanvas;
        //coordonnées pour le tracé (lineTo)
        this.x2 = this.x;
        this.y2 = this.y2;

        this.initCanvas();
    }

    draw() {
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 5;
        this.ctx.lineJoin = "round";
        this.ctx.lineCap = "round";
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x2, this.y2);
        this.ctx.closePath();
        this.ctx.stroke();
        this.dessinFini = true;
    }

    initCanvas() {
        this.canvas.on("mousemove", (e) => {
            e.preventDefault();
            this.topCanvas = this.canvas[0].getBoundingClientRect().top;
            this.leftCanvas = this.canvas[0].getBoundingClientRect().left;

            this.x2 = this.x;
            this.y2 = this.y;
            this.x = e.clientX - this.leftCanvas;
            this.y = e.clientY - this.topCanvas;
            if (this.enCoursDeDessin) {
                this.draw();
            }
        })

        this.canvas.on("mousedown", (e) => {
            e.preventDefault();
            this.enCoursDeDessin = true;

        })

        this.canvas.on("mouseup", (e) => {
            e.preventDefault();
            this.enCoursDeDessin = false;
        })

        this.canvas.on("mouseleave", (e) => {
            e.preventDefault();
            this.enCoursDeDessin = false;
        })

        this.canvas.on("touchmove", (e) => {
            e.preventDefault();
            this.topCanvas = this.canvas[0].getBoundingClientRect().top;
            this.leftCanvas = this.canvas[0].getBoundingClientRect().left;
           
            this.x2 = this.x;
            this.y2 = this.y;
            this.x = e.touches[0].clientX - this.leftCanvas;
            this.y = e.touches[0].clientY - this.topCanvas;
            if (this.enCoursDeDessin) {
                this.draw();
            }
        })

        this.canvas.on("touchstart", (e) => {
            e.preventDefault();
            this.enCoursDeDessin = true;
            this.topCanvas = this.canvas[0].getBoundingClientRect().top;
            this.leftCanvas = this.canvas[0].getBoundingClientRect().left;
            this.x = e.touches[0].clientX - this.leftCanvas;
            this.y = e.touches[0].clientY - this.topCanvas;
            this.enCoursDeDessin = true;
        })

        this.canvas.on("touchend", (e) => {
            e.preventDefault();
            this.enCoursDeDessin = false;
        })

        this.canvas.on("touchleave", (e) => {
            e.preventDefault();
            this.enCoursDeDessin = false;
        })
    }
}