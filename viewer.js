var json_visible = true;
var json_pnl_size = 0;
var table_visible = true;
var tree_visible = true;
var tree_pnl_size = 0;
var xxa_pnl_size = 0;
// Fonction appelée au changement de visibilité des éléments
jQuery(function (a) {
  function e() {
    // Si l'élément JSON est visible
    if (json_visible) {
      // Si les éléments table et tree sont visibles
      if (table_visible && tree_visible) {
        // Redimensionne l'élément #all_panels et #xxa en fonction de leur taille respective
        a("#all_panels").split().position(a("#all_panels").width() - xxa_pnl_size - 2);
        a("#xxa").split().position(xxa_pnl_size - tree_pnl_size - 2);
      } else if (!table_visible && tree_visible) {
        // Si l'élément table est masqué et l'élément tree est visible
        // Redimensionne l'élément #all_panels et #xxa en fonction de leur taille respective
        a("#all_panels").split().position(a("#all_panels").width() - tree_pnl_size - 2);
        a("#xxa").split().position(0);
      } else if (table_visible && !tree_visible) {
        // Si l'élément table est visible et l'élément tree est masqué
        // Redimensionne l'élément #all_panels et #xxa en fonction de leur taille respective
        a("#all_panels").split().position(xxa_pnl_size);
        a("#xxa").split().position(a("#all_panels").width() - xxa_pnl_size - 2);
      } else {
        // Si les éléments table et tree sont masqués
        // Redimensionne l'élément #all_panels
        a("#all_panels").split().position(a("#all_panels").width());
      }
    } else {
      // Si l'élément JSON est masqué
      if (table_visible && tree_visible) {
        // Si les éléments table et tree sont visibles
        // Redimensionne l'élément #all_panels et #xxa en fonction de leur taille respective
        a("#all_panels").split().position(0);
        a("#xxa").split().position(xxa_pnl_size - tree_pnl_size - 2);
      } else if (!table_visible && tree_visible) {
        // Si l'élément table est masqué et l'élément tree est visible
        // Redimensionne l'élément #all_panels et #xxa en fonction de leur taille respective
        a("#all_panels").split().position(0);
        a("#xxa").split().position(0);
      } else if (table_visible && !tree_visible) {
        // Si l'élément table est visible et l'élément tree est masqué
        // Redimensionne l'élément #all_panels et #xxa en fonction de leur taille respective
        a("#all_panels").split().position(a("#all_panels").width() - xxa_pnl_size - 2);
        a("#xxa").split().position(a("#all_panels").width() - 2);
      } else {
        // Si les éléments table et tree sont masqués
        // Redimensionne l'élément #all_panels
        a("#all_panels").split().position(0);
      }
    }
  }

  // Divise la zone #all_panels en deux parties avec une orientation verticale et une position à 33%
  a("#all_panels").split({
    orientation: "vertical",
    limit: 0,
    position: "33%"
  });

  // Divise la zone #xxa en deux parties avec une orientation verticale et une position à 50%
  a("#xxa").split({
    orientation: "vertical",
    limit: 0,
    position: "50%"
  });

  // Stocke la largeur de la zone #tree_pnl dans la variable tree_pnl_size
  tree_pnl_size = a("#tree_pnl").width();

  // Stocke la largeur de la zone #json_pnl dans la variable json_pnl_size
  json_pnl_size = a("#json_pnl").width();

  // Stocke la largeur de la zone #xxa dans la variable xxa_pnl_size
  xxa_pnl_size = a("#xxa").width();

  // Fonction appelée lors du glissement de la barre de division dans la zone #all_panels
  a("#all_panels").split().settings.onDrag = function () {
    // Vérifie si la zone d'affichage JSON est visible
    if (json_visible) {
      // Met à jour les valeurs des variables json_pnl_size et xxa_pnl_size
      json_pnl_size = a("#json_pnl").width();
      xxa_pnl_size = a("#xxa").width();
      // Met à jour la position de la barre de division de la zone #xxa en fonction de la visibilité de la zone #tree_pnl
      if (table_visible && tree_visible) {
        a("#xxa").split().position(xxa_pnl_size - tree_pnl_size - 2);
      } else if (table_visible && !tree_visible) {
        a("#xxa").split().position(xxa_pnl_size - 2);
      } else if (!table_visible && tree_visible) {
        a("#xxa").split().position(0);
      }
    } else {
      // Met à jour la position de la barre de division de la zone #all_panels
      a("#all_panels").split().position(0);
    }
  };

  // Fonction appelée lors du glissement de la barre de division dans la zone #xxa
  a("#xxa").split().settings.onDrag = function () {
    // Si la zone de table est invisible et la zone de l'arbre est visible, met à jour la position de la barre de division de la zone #xxa
    !table_visible && tree_visible ? a("#xxa").split().position(0) : tree_pnl_size = a("#tree_pnl").width()
  };

  // Fonction appelée lorsqu'on clique sur le bouton #jsonViewMenu
  a("#jsonViewMenu").click(function () {
    // Vérifie si la zone de table ou la zone de l'arbre est visible
    if (table_visible || tree_visible) {
      // Active ou désactive le bouton de menu JSON
      a("#jsonLi").toggleClass("active ");
      // Inverse la visibilité de la zone JSON
      json_visible = !json_visible;
      // Met à jour l'affichage des zones
      e();
    }
  });
  // Lorsque le menu de la vue tableau est cliqué
  a("#tableViewMenu").click(function () {
    // Si la vue json ou la vue arbre est visible
    if (json_visible || tree_visible) {
      // Bascule la classe active du menu tableau
      a("#tableLi").toggleClass("active ");
      // Inverse l'état de la visibilité du tableau
      table_visible = !table_visible;
      // Réexécute la fonction e()
      e();
    }
  });

  // Lorsque le menu de la vue arbre est cliqué
  a("#treeViewMenu").click(function () {
    // Si la vue json ou la vue tableau est visible
    if (json_visible || table_visible) {
      // Bascule la classe active du menu arbre
      a("#treeLi").toggleClass("active ");
      // Inverse l'état de la visibilité de l'arbre
      tree_visible = !tree_visible;
      // Réexécute la fonction e()
      e();
    }
  });

  // Lorsque le bouton pour charger un fichier JSON est cliqué
  a("#load_json_btn").click(function () {
    // Exécute la fonction processJson()
    processJson();
  });

  // Lorsque le bouton pour charger un fichier JSON depuis une URL est cliqué
  $("#load_url_btn").click(function () {
    // Affiche la boîte de dialogue pour entrer l'URL
    $("#inputURLModal").modal("show");
  });

  // Lorsque le bouton pour exécuter le chargement depuis une URL est cliqué
  $("#exec_loadBtn").click(function () {
    // Exécute la fonction loadfromURL() en passant l'URL entrée par l'utilisateur
    loadfromURL($("#urlInput").val());
  });
});
// Définition de la fonction sendMsg() qui envoie un message au serveur
function sendMsg() {
  // Envoi d'une requête AJAX GET vers l'URL du serveur pour enregistrer le message
  $.ajax({
    type: "GET",
    url: "http://json2table-env-ayji8pibkt.elasticbeanstalk.com/save_msg",
    data: {
      callback: "call",
      msg: $("#leaveMsg").val()
    },
    contentType: "application/json",
    dataType: "jsonp",
    success: function (a) { },
    error: function (a) { }
  })
}

var g;

// Définition de la fonction loadfromURL(a) qui charge le JSON à partir d'une URL donnée
function loadfromURL(a) {
  // Affichage d'un message de chargement
  $("#json_vl").val("Loading...");
  $("#inner_tree").html("");
  $("#inner_tbl").html("");
  // Ajout du protocole "http://" si absent
  if (a.substr(0, 4) !== "http") {
    a = "http://" + a;
  }

  // Envoi d'une requête AJAX GET vers l'URL du serveur pour récupérer le JSON
  $.ajax({
    type: "GET",
    url: "http://json2table-env-ayji8pibkt.elasticbeanstalk.com/getjson",
    data: {
      callback: "call",
      url: encodeURIComponent(a)
    },
    contentType: "application/json",
    dataType: "jsonp",
    success: function (a) {
      // Affichage du JSON dans la zone de texte prévue à cet effet
      $("#json_vl").val(JSON.stringify(a, null, 2));
      // Traitement du JSON
      processJson();
    },
    error: function (e) {
      // Affichage d'un message d'erreur si le JSON n'est pas valide
      $("#json_vl").val("");
      $("#error_msg").text("Not a valid JSON from " + a);
      $("#errorModal").modal("show");
      return {};
    }
  });
}
// Cette fonction prend en entrée un objet "a" et affiche sa représentation JSON dans un champ de texte
function call(a) {
  $("#json_vl").val(JSON.stringify(a, void 0, 2));
  processJson();
}

// Cette fonction extrait le JSON du champ de texte "json_vl", le transforme en objet JavaScript et appelle la fonction "processJson"
function getJsonVar() {
  try {
    var a = $.parseJSON($("#json_vl").val());
    $("#json_vl").val(JSON.stringify(a, void 0, 2));
    return a;
  } catch (e) {
    $("#error_msg").text(e.message);
    $("#errorModal").modal("show");
    return {};
  }
}

// Cette fonction appelle "buildTable" pour créer une table HTML à partir des données JSON extraites
// à partir du champ de texte "json_vl", puis appelle "showTree" pour construire une représentation arborescente de l'objet JSON.
function processJson() {
  $("#inner_tbl").html(buildTable(getJsonVar()));
  showTree();
}

// Cette fonction crée un arbre DOM pour afficher l'objet JSON en tant que structure arborescente.
function showTree() {
  var a = document.createElement("ol"),
    e = document.createElement("li"),
    d = "_" + Math.random().toString(36).substr(2, 9);
  e.innerHTML = "<label for='" + d + "' class='lbl_obj'> </label> <input type='checkbox' checked id='" + d + "' />";
  d = document.createElement("ol");
  e.appendChild(d);
  a.appendChild(e);
  buildTree(getJsonVar(), 0, d);
  $("#inner_tree").html(a);
}
// Cette fonction construit une table HTML en utilisant les données passées en paramètre
function buildTable(a) {
  var e = document.createElement("table"),
    d, b;
  // Vérifie si le paramètre est un tableau, et si c'est le cas, appelle la fonction buildArray pour le construire
  if (isArray(a)) return buildArray(a);
  // Parcours chaque élément du tableau passé en paramètre
  for (var c in a)
    // Vérifie si l'élément est un objet ou un tableau
    if ("object" != typeof a[c] || isArray(a[c]))
      // Si c'est un tableau, appelle la fonction buildArray pour le construire et l'insère dans la table en cours de construction
      "object" == typeof a[c] && isArray(a[c]) ?
        (d = e.insertRow(-1), b = d.insertCell(-1), b.colSpan = 2, b.innerHTML = '<div class="td_head">' + encodeText(c) + '</div><table style="width:100%">' + $(buildArray(a[c]), !1).html() + "</table>") :
        // Si ce n'est ni un objet ni un tableau, insère directement la valeur dans la table en cours de construction
        (d = e.insertRow(-1), b = d.insertCell(-1), b.innerHTML = "<div class='td_head'>" + encodeText(c) + "</div>", d = d.insertCell(-1), d.innerHTML = "<div class='td_row_even'>" + encodeText(a[c]) + "</div>");
    else
      // Si c'est un objet, appelle la fonction buildTable pour le construire et l'insère dans la table en cours de construction
      (d = e.insertRow(-1), b = d.insertCell(-1), b.colSpan = 2, b.innerHTML = '<div class="td_head">' + encodeText(c) + '</div><table style="width:100%">' + $(buildTable(a[c]), !1).html() + "</table>");
  // Retourne la table HTML construite
  return e;
}

// Cette fonction construit un tableau HTML à partir d'un tableau de données passé en paramètre
function buildArray(a) {
  var e = document.createElement("table");
  var d, b;
  var c = false;
  var p = false;
  var m = {};
  var h = -1;
  var n = 0;
  var l = "";

  // Vérifie si le tableau est vide, et si c'est le cas, renvoie un div vide
  if (0 == a.length) {
    return "<div></div>";
  }

  // Crée la première ligne du tableau, qui servira à insérer les en-têtes
  d = e.insertRow(-1);

  // Boucle for qui parcourt le tableau a
  for (var f = 0; f < a.length; f++) {

    // Vérifie si l'élément en cours n'est pas un objet ou est un tableau
    if ("object" != typeof a[f] || isArray(a[f])) {
      // Vérifie si l'élément en cours est un tableau
      if ("object" == typeof a[f] && isArray(a[f])) {

        // Insère une cellule dans la table et définit la valeur HTML avec un tableau imbriqué
        b = d.insertCell(h);
        b.colSpan = 2;
        b.innerHTML =
          '<div class="td_head"></div><table style="width:100%">' +
          $(buildArray(a[f]), false).html() +
          "</table>";
        c = true;
      } else if (!p) {

        // Si la cellule précédente n'était pas une cellule vide, insère une nouvelle cellule vide
        h += 1;
        p = true;
        b = d.insertCell(h);
        m.empty = h;
        b.innerHTML = "<div class='td_head'>&nbsp;</div>";
      }
    } else {
      // Si l'élément en cours est un objet, parcourt ses propriétés
      for (var k in a[f]) {
        l = "-" + k;

        // Si la propriété n'a pas encore été insérée, insère une cellule pour cette propriété
        if (!(l in m)) {
          c = true;
          h += 1;
          b = d.insertCell(h);
          m[l] = h;
          b.innerHTML = "<div class='td_head'>" + encodeText(k) + "</div>";
        }
      }
    }
  }
  // Si aucune nouvelle cellule n'a été insérée, supprime la première ligne de la table
  if (!c) {
    e.deleteRow(0);
  }

  // Définit la valeur de n comme la dernière colonne + 1
  n = h + 1;

  // Boucle for qui parcourt à nouveau le tableau a
  for (f = 0; f < a.length; f++) {

    // Si l'élément en cours n'est pas un objet ou est un tableau
    if (d = e.insertRow(-1), td_class = isEven(f) ? "td_row_even" : "td_row_odd", "object" != typeof a[f] || isArray(a[f])) {
      // Si l'élément en cours est un tableau
      if ("object" == typeof a[f] && isArray(a[f])) {

        // Parcourt chaque colonne de la ligne et définit la valeur HTML pour chaque cellule
        for (h = m.empty, c = 0; c < n; c++) {
          b = d.insertCell(c);
          b.className = td_class;
          l = c == h ? '<table style="width:100%">' + $(buildArray(a[f]), !1).html() + "</table>" : " ";
          b.innerHTML = "<div class='" + td_class + "'>" + encodeText(l) + "</div>";
        }
      } else {
        // Une boucle qui parcourt chaque colonne d'un tableau
        for (h = m.empty, c = 0; c < n; c++) {
          // Insertion d'une cellule dans la colonne courante
          b = d.insertCell(c);
          // Si la colonne courante est la colonne vide, on met la valeur de l'élément actuel dans la cellule, sinon on met un espace
          l = c == h ? a[f] : " ";
          // Ajout de la classe CSS spécifiée à la cellule
          b.className = td_class;
          // Ajout du contenu HTML à la cellule, qui contient la valeur encodée de l'élément actuel
          b.innerHTML = "<div class='" + td_class + "'>" + encodeText(l) + "</div>";
        }
      }
      // Si le tableau ne contient pas d'éléments, on remplit la ligne avec des cellules vides
    } else {
      for (c = 0; c < n; c++) {
        b = d.insertCell(c);
        b.className = td_class;
        b.innerHTML = "<div class='" + td_class + "'>&nbsp;</div>";
      }
      // Pour chaque propriété de l'élément actuel, on ajoute une cellule contenant sa valeur
      for (k in a[f]) {
        c = a[f];
        l = "-" + k;
        h = m[l];
        b = d.cells[h];
        b.className = td_class;
        // Si la propriété n'est pas un objet ou un tableau, on l'ajoute simplement dans la cellule
        if ("object" != typeof c[k] || isArray(c[k])) {
          // Si la propriété est un tableau, on crée une nouvelle table pour afficher ses éléments
          if ("object" == typeof c[k] && isArray(c[k])) {
            b.innerHTML = '<table style="width:100%">' + $(buildArray(c[k]), !1).html() + "</table>";
          } else {
            // Sinon, on ajoute simplement la propriété dans la cellule
            b.innerHTML = "<div class='" + td_class + "'>" + encodeText(c[k]) + "</div>";
          }
        } else {
          // Si la propriété est un objet, on crée une nouvelle table pour afficher ses propriétés
          b.innerHTML = '<table style="width:100%">' + $(buildTable(c[k]), !1).html() + "</table>";
        }
      }
    }
  }
  // Retourne l'élément HTML créé
  return e;
}
// Cette fonction encode du texte en HTML pour éviter l'exécution de code malveillant
function encodeText(a) {
  return $("<div />").text(a).html()
}

// Cette fonction vérifie si un élément est un tableau
function isArray(a) {
  return "[object Array]" === Object.prototype.toString.call(a)
}

// Cette fonction vérifie si un nombre est pair
function isEven(a) {
  return 0 == a % 2
}

// Cette fonction construit un arbre récursif à partir d'un objet JSON donné
function buildTree(a, e, d) {
  e += 1; // incrémente la profondeur de l'arbre
  if ("undefined" === typeof a) { // si l'objet est indéfini
    log("undef!!", e); // affiche un message d'erreur dans la console
  } else {
    for (var b in a) { // parcourt tous les éléments de l'objet
      if ("object" == typeof a[b]) { // si l'élément est un objet, on crée un nouvel arbre pour cet élément
        var c = addTree(b, d, isArray(a[b]));
        buildTree(a[b], e, c); // on continue à construire l'arbre récursivement
      } else { // sinon, on ajoute une feuille à l'arbre pour cet élément
        addLeaf(b, a, d);
      }
    }
  }
}

// Cette fonction ajoute un nouvel arbre à l'élément parent donné
function addTree(a, e, d) {
  var b = "lbl_obj";
  if (d) {
    b = "lbl_array";
  }
  var c = "_" + Math.random().toString(36).substr(2, 9);
  d = document.createElement("li");
  d.innerHTML = "<label for='" + c + "' class='" + b + "'>" + encodeText(a) + "</label> <input type='checkbox' checked id='" + c + "' />";
  a = document.createElement("ol");
  d.appendChild(a);
  if (null != e) {
    e.appendChild(d);
  }
  return a;
}

// Cette fonction ajoute une feuille (élément terminal) à l'arbre en cours de construction
function addLeaf(a, e, d) {
  var b = "";
  if (!isArray(e)) {
    b = a + ":";
  }
  b += e[a];
  Math.random().toString(36).substr(2, 9);
  a = document.createElement("li");
  a.className = "file";
  a.innerHTML = "<a>" + encodeText(b) + "</a>";
  d.appendChild(a);
}

// Cette fonction est utilisée pour afficher des messages dans la console de débogage
function log(a, e, d) {
  console.log(a)
};