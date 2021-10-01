class Map {
  constructor() {
    //initialisation de la MAP 
    this.myMap = L.map('mapid').setView([43.2701, 5.3925], 16);
    // Apparence de la MAP
    this.tileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="http://cocktails-paradise.jpatlmx.com">Cocktails Paradise</a><a href="https://creativecommons.org/licenses/by-sa/2.0/">,CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
      id: 'mapbox/streets-v11',
      accessToken: 'pk.eyJ1IjoianA2MSIsImEiOiJjazN6ejJkbTYwOHF6M2xtdDFxMWIyajljIn0.2rimEVS1qIG5dkq6NQWc0A'
    }).addTo(this.myMap);

    //création d'un modèle de stations
    this.stationModele = {
      //utilisation d'une fonction init pour assigner les parametres/informations des stations
      init: function (name, address, poslat, poslng, status, availableBike, availableStand) {
        this.name = name;
        this.address = address;
        this.position = {
          lat: poslat,
          lng: poslng
        };
        this.status = status;
        this.availableBike = availableBike;
        this.availableStand = availableStand;
      }
    }
    this.greenIcon = new L.Icon({
      iconUrl: 'ico/greenIcon.png',
      shadowUrl: 'ico/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    this.redIcon = new L.Icon({
      iconUrl: 'ico/redIcon.png',
      shadowUrl: 'ico/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    this.orangeIcon = new L.Icon({
      iconUrl: 'ico/orangeIcon.png',
      shadowUrl: 'ico/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    //méthode à éxecuté
    this.ajaxGet();

  } //fin du constructor

  ajaxGet() {
    //Requete ajax vers l'URL de notre API
    $.ajax("https://api.jcdecaux.com/vls/v1/stations?contract=marseille&apiKey=c898d9d6969d39fd8480e5464be2a1943e201890").then((response) => {
      //creation des groupements de marker
      this.groupMarker = new L.MarkerClusterGroup();
      //lancement d'une boucle for Of pour gérer chaque index (station) du tableau JSON récupéré (response)
      for (let station of response) {
        //creation de newStation en utilisant le modèle objet stationModile
        let newStation = Object.create(this.stationModele);
        //initialisation des parametres du modele objet avec les infos des stations récupérées via l'API
        newStation.init(station.name, station.address, station.position.lat, station.position.lng, station.status, station.available_bikes, station.available_bike_stands);
        let stationMarker = this.greenIcon;
        if (newStation.status === "CLOSED") {
          newStation.availableBike === 0;
        };
        if (0 > newStation.availableBike < 10) {
          stationMarker = this.orangeIcon;
        };
        if (newStation.availableBike === 0) {
          stationMarker = this.redIcon;
        };
        //cration des markers et ajout des  markers sur la map;
        let marker = L.marker([newStation.position.lat, newStation.position.lng], {
          icon: stationMarker
        });
        marker.bindPopup(newStation.name);

        //gestion du click sur les markers   
        marker.on('click', () => {

          //uniquement si il y a des vélos à la stations 
          if (newStation.availableBike > 0) {
            //on lance la méthode stationInfo pour afficher les informations de notre objet newStation
            this.stationInfo(newStation)
          } else {
            //afficher un message (alert) pour dire qu'il n'y a plus de vélos
            alert("Il n'y a plus de vélos disponible à cette station.");
          }
        });
        //ajout des markers au groupement de marker et ajout de l'ensemble à la map
        this.groupMarker.addLayer(marker).addTo(this.myMap);
      }

    });
  }

  stationInfo(newStation) {
    $("#infoResa").css("display", "none");
    $("#infoStation").css("display", "block");
    /*remplacement du contenu des <p/> associés;*/
    $('.nomStation').text(newStation.name);
    $('.address').text(newStation.address);
    $('.placeDispo').text(newStation.availableStand);
    $('.veloDispo').text(newStation.availableBike);
    $('.status').text(newStation.status);

  }
}