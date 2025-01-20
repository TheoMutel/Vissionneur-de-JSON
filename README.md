Visionneur de JSON
Description
Ce projet est une application web interactive qui permet de visualiser, naviguer et manipuler des données JSON sous forme de tableau et d'arborescence. Il est conçu pour simplifier l'analyse et la validation des fichiers JSON.

Fonctionnalités
Affichage JSON sous forme de tableau : Visualisez les données JSON sous forme de tableau structuré.
Affichage JSON sous forme d'arborescence : Naviguez facilement dans une structure JSON complexe grâce à une vue hiérarchique.
Tri des données : Triez les entrées JSON par ordre croissant ou décroissant.
Chargement de fichiers JSON : Importez un fichier JSON directement ou via une URL.
Interface utilisateur interactive : Une interface fluide basée sur Bootstrap pour une navigation intuitive.
Pré-requis
Avant de démarrer, assurez-vous d'avoir les éléments suivants installés :

Un navigateur web moderne (Google Chrome, Firefox, etc.)
Un serveur local pour héberger les fichiers HTML, CSS et JavaScript (comme XAMPP, WAMP, ou un serveur HTTP simple comme http-server pour Node.js)
Installation
Clonez le dépôt sur votre machine locale :
bash
Copier
Modifier
git clone <URL_DU_REPO>
Placez les fichiers dans le répertoire de votre serveur local.
Ouvrez le fichier index.html dans votre navigateur.
Utilisation
Chargez un fichier JSON en le copiant dans le champ prévu ou en utilisant une URL.
Naviguez entre les vues disponibles :
Vue tableau
Vue arborescence
Utilisez les options de tri pour organiser vos données JSON.
Technologies utilisées
HTML5/CSS3 : Structure et style de l'application.
JavaScript/jQuery : Manipulation DOM et gestion des événements.
Bootstrap : Mise en page responsive et composants UI.
jQuery Splitter : Gestion des panneaux divisés.
Développement
Structure des fichiers
index.html : Page principale de l'application.
viewer.css : Feuille de style pour l'application.
viewer.js : Script principal pour la logique de visualisation JSON.
Exemple de code
Pour trier les données d'un tableau JSON :

javascript
Copier
Modifier
function sortTable(order) {
  var table = document.getElementById("table_data");
  var rows = Array.from(table.rows).slice(1); // Exclure la ligne d'en-tête
  rows.sort(function (a, b) {
    var aValue = a.cells[0].textContent.trim();
    var bValue = b.cells[0].textContent.trim();
    return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
  });
  rows.forEach(row => table.appendChild(row));
}
Licence
Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

Auteur
Développé par [Votre Nom].
