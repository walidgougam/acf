export default t = key => {
  return keys[key];
};

const keys = {
  //card
  householder: 'Chef de ménage',
  years: 'années',
  //splashupdating
  sync_progress: 'Synchronisation en cours ...',
  //splashupdated
  synchronized: 'Synchronisé !',
  data_synchronized: 'Données synchronisées avec le serveur.',
  login: 'Login',
  //splashupdate
  connexion_detexted: 'Connexion détéctée',
  sync_data: 'Voulez-vous synchroniser les données?',
  from_phone: 'depuis cet appareil',
  not_now: 'pas maintenant',
  //MainInformation
  province: 'Province',
  territory: 'Territoire',
  group: 'Groupement',
  chieftaincy: 'Chefferie',
  health_zone: 'Zone de santé',
  health_area: 'Aire de santé',
  village: 'Village',
  enter_information: 'Renseignez la géolocalisation de la famille',
  gps: 'Coordonnées GPS (latitude,longitude)',
  site: 'Si le site à bouger, préciser son nom',
  validate: 'Validate',
  //signIn
  login_qrcode: 'LOGIN AVEC QRCODE',
  scan_team: "ou scanner le qrCode de l'équipe",
  last_data: 'DERNIERE SYNCHRONISATION',
  sync_data: 'SYNC DONNÉES',
  email_empty: 'email non renseigné',
  email_invalid: 'email invalide',
  password_empty: 'Mot de passe non renseigné',
  password_character: 'Le mot de passe doit contenir 6 caractères minimum',
  detail_below: 'Entrez vos informations ci-dessous:',
  //homeHeader
  hello: 'Bonjour',
  food_monitor: 'Animateur sécurité alimentaire',
  //home
  change: 'changer',
  //modal home
  quick_add: 'AJOUT RAPIDE',
  detailed: "AJOUT DÉTAILLÉ",
  single_person: "AJOUT PERSONNE SEUL",
  //AddMembers
  man: 'Homme',
  woman: 'Femme',
  not_disclosed: 'Non précisé',
  family_composition: 'Composition de la famille',
  general_info: 'Informations générales',
  add1stMember: 'Ajouter le 1er membre',
  register_family: 'Enregistrer une famille',
  register_single: 'Enregistrer une personne seule',
  about_householder: 'Concernant le chef de ménage',
  take_photo: 'PRENDRE UNE PHOTO',
  library: 'BIBLIOTHÈQUE',
  name: 'Nom',
  first_name: 'Prénom',
  age: 'Age',
  birth_date: 'Date de naissance',
  identity_number: "Numéro d'identité (carte d'électeur)",
  marital_status: 'Statut marital',
  family_member: 'Nombre de personnes dans la famille',
  men_boys: "Nombre d'hommes et de garçons",
  women_girls: 'Nombre de femmes et filles',
  validate: 'Valider',
  save_another: 'ENREGISTRER ET AJOUTER UN AUTRE',
  finish: 'TERMINER',
  //FoodActivity
  select_food_activity: "Choisissez l'activité de sécurité alimentaire pour cette famille.",
  //selectProject
  project: 'PROJET',
  select_project: 'Choississez le projet',
  you_currently_working: 'sur lequel vous travaillez:',
  project_not_listed: "Mon projet n'apparait pas",
  //dataAceptation
  acceptation: 'Consentement',
  agree: "D'ACCORD",
  disagree: "PAS D'ACCORD",
  next: 'suivant',
  dataAcceptationTextTop: 'Les données collectées dans cette application sont recueillies pour des besoins de gestion de nos programmes et aucune donnée à caractère personnelle ne sera partagée avec un tiers. Dans le cadre de la législation en vigueur, vous avez un droit d’accès, de rectification et de suppression de ces données que vous pourrez exercer auprès d’ACF.',
  dataAcceptationTextBottom: 'Pour améliorer l’efficacité de nos programmes, acceptez-vous que nous partagions certaines des informations recueillies ici avec d’autres applications ou logiciels humanitaires ?',
  // family card
  printCard: 'IMPRIMER LA CARTE',
  cardCreation: 'Création de la carte',
  //advanced search
  town: 'Ville',
  advancedSearch: 'Recherche avancée',
  aboutPerson: 'À propos de la personne',
  aboutLocation: 'À propos du lieu',
  //search results
  searchResult: 'résultats de la recherche',
};

// en anglais :
// const keys = {
//   //card

//   householder: 'Householder',
//   years: 'years',

//   //splashupdating

//   sync_progress: 'Sync in progress...',
//   //splashupdated

//   synchronized: 'Synchronized !',
//   data_synchronized: 'Data synchronized with the center.',
//   login: 'Login',

//   //splashupdate

//   connexion_detexted: 'Connection detected',
//   sync_data: 'Do you want sync data',
//   from_phone: 'from this phone',
//   not_now: 'not now',
//   //MainInformation

//   province: 'Province',
//   territory: 'Territory',
//   group: 'Groupe',
//   chieftaincy: 'Chieftaincy',
//   health_zone: 'Health zone',
//   health_area: 'Health area',
//   village: ' Village',
//   enter_information: "Enter the information about the family's location",
//   gps: 'GPS coordinates (latitude,longitude)',
//   site: 'If site moved, specify the name',

//   //signIn

//   login_qrcode: 'LOGIN WITH QRCODE',
//   scan_team: "or scan team's qr code:",
//   last_data: 'LAST DATA SYNC',
//   sync_data: 'SYNC DATA',
//   email_empty: 'Email is empty',
//   email_invalid: 'Email is invalid',
//   password_empty: 'Password is empty',
//   password_character: 'Password must be at least 6 characters',
//   detail_below: 'Enter your details below:',

//   //homeHeader

//   hello: 'hello',
//   food_monitor: 'Food monitor',

//   //home

//   change: 'change',
//modal home
// QUICK ADD
// DETAILED
// SINGLE PERSON

//   //AddMembers

//   man: 'Man',
//   woman: 'Woman',
//   not_disclosed: 'Not disclosed',
//   family_composition: 'Family composition',
//   general_info: 'General informations',
//   add1stMember: 'Add the 1st member',
//   register_family: 'Register a family',
//   register_single: 'Register a single person',
//   about_householder: 'About the family householder',
//   take_photo: 'TAKE A PHOTO',
//   library: 'LIBRARY',
//   name: 'Name',
//   first_name: 'First name',
//   age: 'Age',
//   birth_date: 'Birth date',
//   identity_number: 'Identity number (voter card)',
//   marital_status: 'Marital status',
//   family_member: 'Number of family members',
//   men_boys: 'Number of men and boys',
//   women_girls: 'Number of women and girls',
//   validate: 'Validate',
//   save_another: 'SAVE AND ADD ANOTHER',
//   finish: 'FINISH',
//   //FoodActivity
//   select_food_activity: 'Select the food activity that will benefit this family.',
//   //selectProject
//project: 'THE PROJECT',
//   select_project: 'Select the project',
//   you_currently_working: ' you are currently working on:',
//   project_not_listed: 'My project is not listed',
//   //dataAceptation
//   acceptation: 'Acceptation',
//   agree: 'AGREE',
//   disagree: 'DISAGREE',
//   next: 'next',
//   dataAcceptationTextTop: 'lorem ipsum to lorem ipsum to lorem ipsum to lorem ipsum to lorem ipsum to',
//   dataAcceptationTextBottom: 'lorem ipsum to lorem ipsum to lorem ipsum to lorem ipsum to lorem ipsum to',
//   // family card
//   printCard: 'PRINT THE CARD',
//   cardCreation: 'card creation date',
//   //advanced search
//   town: 'Town',
//   advancedSearch: 'Advanced search',
//   aboutPerson: 'About the person',
//   aboutLocation: 'About the location',
//   //search results
//   searchResult: 'Search results',
// };