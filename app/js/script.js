jQuery(document).ready(function() {
  jQuery("#retrieve-resources").click(function() {
    var displayResources = jQuery(".top-list-links");

    displayResources.text("Loading data from JSON source...");

    jQuery.ajax({
      type: "GET",
      url: "/Assets/urls.json", // Using our resources.json file to serve results
      success: function(result) {
        console.log(result);
        var output =
          "<table><tbody>";
        for (var i in result) {
          output +=
            "<tr><td>" +
            result[i].shortUrl +
            "</td><td>" +
            result[i].hits +
            "</td></tr>";
        }
        output += "</tbody></table>";

        displayResources.html(output);
        jQuery("table").addClass("table");
      }
    });
  });
});

function getTotalHits(urls) {
    // get the hits of the urls to a new array
    var hits = urls.map(function (a) {
        return a.hits;
    });
    // sum the array
    var total = hits.reduce(function (a, b) {
        return a + b;
    });

    return total;
}

// returns the n links with the most hits from the urls json
function getTopN(urls, n) {
    // sort by hits in descending order
    urls.sort(function (a, b) {
        return b.hits - a.hits;
    });

    var topN = urls.slice(0, n);

    return topN;
}

// based on the json urls, fills the linksList div with the links with the
// top n of links with the most hits
function fillTopN(urls, n) {
    var topN = getTopN(urls, n);

    var list = document.getElementById("linksList");

    // remove all the children of the linksList
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    // add the topN to the list
    for (var i in topN) {
        var shortUrl = topN[i].shortUrl;
        var hits = topN[i].hits;
        var item = "<div class='linkItem box'><a href='" + shortUrl +
                "'>" + shortUrl + "</a> <span class='supportText'>" +
                hits + "</span></div><br>";
        list.innerHTML += item;
    }
}

$(document).ready(function () {
//    var requestUrl = "https://github.com/chaordic/frontend-intern-challenge/blob/master/Assets/urls.json";
    var requestUrl = "/Assets/urls.json";
    $.getJSON(requestUrl, function (urls) {
        fillTopN(urls, 5);

        var totalHits = getTotalHits(urls);

        var hitsBox = document.getElementById("hitsBox");
        hitsBox.innerHTML = Number(totalHits).toLocaleString();
    });

    $("#urlButton").click(function () {
        var content = document.getElementById("urlButton").value;

        if (content === "ENCURTAR") {
            shortenUrl();
        }
    });
});
