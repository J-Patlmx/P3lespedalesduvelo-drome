class Resa {
    constructor(canvas) {
        this.canvas = canvas;
        //methodes a exectuer
        this.initResa();
        this.resaEnCours();
    }
    timer() {
        //toutes secondes =>
        this.interval = setInterval(() => {
            //recuperer la date actuelle
            this.dateActuelle = new Date();
            //date actuelle - date d'expiration = le temps restant
            this.tempsRestant = new Date(this.deadline - this.dateActuelle);
            //on récupère les minutes du temps restant
            this.min = Math.floor((this.tempsRestant % (1000 * 60 * 60)) / (1000 * 60));
            //on recupere les secondes du temps restant 
            this.sec = Math.floor((this.tempsRestant % (1000 * 60)) / 1000);
            //on affiche les minutes et les secondes dans notre message de resa
            $("#timer").text("Votre réservation expire dans " + this.min + "min " + this.sec + "sec.");
            //si le temps restant < 0 =>
            if (this.tempsRestant < 0) {
                //on arrête l'interval
                clearInterval(this.interval);
                //on supprime les infos du session storage (nom de la station et date d'expiration)
                sessionStorage.clear();
                //on modifie le message du timer
                $("#timer").text("Votre reservation est expirée.");
                //on retire le message de resa
                $("#resa").text(" ");
            }
        }, 1000);
    }

    infoResa() {
        $(".signature").css("display", "none");
        //affiche les infos de la resa en récupérant le nom de la station, et le prenom via le storage
        $("#infoResa").css("display", "block");
        $("#infoResa").text("Retrouvez votre réservation ci-dessous.");
        $("#resa").text(localStorage.getItem("firstname") + " votre vélo vous attend à la station : " + sessionStorage.getItem("station"));
    }

    initResa() {
        //lors du click sur le bouton reserver => 
        $("#reserver").on("click", () => {
            //si il n'y a pas de date d''expiration enregistrée en session storage && si les input ne sont pas vide =>
            if ((sessionStorage.getItem("deadline") === null) && ($("#firstname").val() !== "") && ($("#lastname").val() !== "")) {
                //on enregistre le nom de la station en session
                sessionStorage.setItem("station", $(".nomStation").text());
                //on enregistre le nom et le prenom en local
                localStorage.setItem("firstname", $("#firstname").val());
                localStorage.setItem("lastname", $("#lastname").val());
                //on cache les infos de la station
                $("#infoStation").css("display", "none");
                //on fait apparaitre le canvas
                $(".signature").css("display", "block");
                //si le champs prenom est vide et le champs nom est rempli
            } else if (($("#firstname").val() == "") && ($("#lastname").val() !== "")) {
                //on affiche un message pour demander à remplir le prenom
                alert("Veuillez remplir votre prénom !");
                //on met le background de l'input prenom en rouge
                $("#firstname").css("backgroundColor", "red");
                //si le champs nom est vide et le champs prenom est rempli 
            } else if (($("#lastname").val() == "") && ($("#firstname").val() !== "")) {
                //on affiche un message pour demander à remplir le prenom
                alert("Veuillez remplir votre nom !");
                //on met le background de l'input nom en rouge
                $("#lastname").css("backgroundColor", "red");
                //si les deux champs sont vides
            } else if (($("#lastname").val() == "") && ($("#firstname").val() == "")) {
                //on affiche un message pour demander à remplir les champs requis
                alert("Veuillez remplir les champs requis !");
                //on met le background des input en rouge
                $("#lastname, #firstname").css("backgroundColor", "red");
                //si il existe une deadline dans le session storage (s'il y a déjà une réservation en cours)
            } else if (sessionStorage.getItem("deadline") !== null) {
                //on affiche un message de confirmation pour annuler la réservation
                this.confirmMessage = confirm("Vous avez une réservation en cours, souhaitez vous l'annulée ?");
                //si le message de confirmation est confimé
                if (this.confirmMessage == true) {
                    //on annule la reservation
                    clearInterval(this.interval);
                    sessionStorage.clear();
                    //on enregistre le nom de la station en session
                    sessionStorage.setItem("station", $(".nomStation").text());
                    //on enregistre le nom et le prenom en local
                    localStorage.setItem("firstname", $("#firstname").val());
                    localStorage.setItem("lastname", $("#lastname").val());
                    //on cache les infos de la station
                    $("#infoStation").css("display", "none");
                    //on fait apparaitre le canvas
                    $(".signature").css("display", "block");
                                    //on modifie le message du timer
                $("#timer").text("Pas de reservation en cours.");
                //on retire le message de resa
                $("#resa").text(" ");
                }
            }
        });

        //lors du click sur le bouton annuler du canvas =>
        this.canvas.annuler.on("click", () =>{
            //on remet les paramétres du canvas à 0
            this.canvas.ctx.clearRect(0,0,this.canvas.canvas.width(), this.canvas.canvas.height());
            //on indique que le dessin n'est pas fini
            this.canvas.dessinFini = false;
            //on cache le canvas
            $(".signature").css("display", "none");
            //on fait réapparaitre les infos de la station
            $("#infoStation").css("display", "block");    
        })
        this.canvas.effacer.on("click", () => {
             //on remet les paramétres du canvas à 0
            this.canvas.ctx.clearRect(0,0,this.canvas.canvas.width(), this.canvas.canvas.height());
            //on indique que le dessin n'est pas fini
            this.canvas.dessinFini = false;
        })

        //lors du click sur le bouton confirmer du canvas
        this.canvas.confirmer.on("click", () => {
            //si le dessin est fini (si on a bien signer)
            if (this.canvas.dessinFini) {
                            //on remet les paramétres du canvas à 0
            this.canvas.ctx.clearRect(0,0,this.canvas.canvas.width(), this.canvas.canvas.height());
            //on indique que le dessin n'est pas fini
            this.canvas.dessinFini = false;
                //on creer une nouvelle date + le temps de la reservation(20min) = la date d'expiration
                this.deadline = new Date().getTime() + 20*60*1000; 
                //on enregistre cette date d'expiration dans le session storage pour pouvoir relancer la reservation au moment du refresh de la page
                sessionStorage.setItem("deadline", this.deadline);
                //on lance le timer
                this.timer();
                //on lance infoResa
                this.infoResa();
            //si le canvas n'est pas rempli
            } else {
                //message d'alert
                alert("Veuillez signer pour réserver.");
            }
        })
    }

    resaEnCours() {
        //si un nom et un prenom sont enregistrés en local storage 
        if (localStorage.getItem("lastname") !== null) {
            //on donne pour valeur à l'input lastname le nom enregistré dans le local storage
            $("#lastname").val(localStorage.getItem("lastname"));
            //on donne pour valeur à l'input firstname le prenom enregistré dans le local storage
            $("#firstname").val(localStorage.getItem("firstname"));
        }
 
        //si il y a une date d'expiration d'enregistré dans le session storage 
        if (sessionStorage.getItem("deadline") !== null) {
            //on recupere notre deadline enregistrée dans le sessionStorage
            this.deadline = sessionStorage.getItem("deadline");
            //on relance le timer
            this.timer();
            //on relance infoResa
            this.infoResa();
        }
    }
}