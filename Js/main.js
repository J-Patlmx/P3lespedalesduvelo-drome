class Main{
    constructor() {
        //creation dun nouvel objet tableau sur model array
        this.tableau = new Array();
        this.tableau = [{
            image:"image/img1.jpg",
            alt: "image1",
            text: "1. Bienvenue chez les Pédales du Vélodromes choisissez votre velo parmis nos 119 stations"
        },{
            image:"image/img2.jpg",
            alt: "image2",
            text: "2. Selectionner votre station."
        },{
            image:"image/img3.jpg",
            alt: "image3",
            text: "3. remplissez vos informations"
        },{
            image:"image/img4.jpg",
            alt: "image4",
            text: "4. Signez votre bon de reservation puis retrouver les infos de votre resa en bas de page"
        },{
            image:"image/img5.jpg",
            alt: "image5",
            text: "Merci d'avoir choisi les Pédales du Vélodromes"
        },];

        this.slider = new Slider(this.tableau);
        this.map = new Map();
        this.canvas = new Canvas();
        this.resa = new Resa(this.canvas);
    } 
};

let main = new Main();