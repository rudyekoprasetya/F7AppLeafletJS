// Initialize your app
var myApp = new Framework7({
    swipePanel: 'left',
    material: true
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

myApp.onPageInit('gocar', function (page) {

    $$('#cari').on('click', function () {
        var keyword=$$('#keyword').val();
         //geocoder plugin
        var geocoder = L.Control.Geocoder.nominatim();

        myApp.showPreloader();

        //cari koordinat lokasi yang dicari
        geocoder.geocode(keyword, function(results) {

            console.log(results[0]);
            var nama_lokasi = results[0].name;
            var lat = results[0].properties.lat;
            var long = results[0].properties.lon;
            var lokasi = [lat , long];

            // kosongkan jika ada map
            var container = L.DomUtil.get('mapid');
            if(container != null){
                container._leaflet_id = null;
            }

            var mymap = L.map('mapid', {
                        center: lokasi,
                        zoom: 13
                    });
           
            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mymap);
       
            //memberikan marker
            var marker = L.marker(lokasi).addTo(mymap);         

            // memberikan popup
            L.marker(lokasi).addTo(mymap)
            .bindPopup(nama_lokasi)
            .openPopup();
            myApp.hidePreloader();
        });
        
    });

});

//fungsi ketika laman gojek.html di load
myApp.onPageInit('gojek', function (page) {
   myApp.alert("haloo !","Peringatan");
   // inisialisasi map
    var lokasi=[-7.821576, 111.992384]; //koordinat
    var mymap = L.map('map-gojek').setView(lokasi, 13);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
   
    //memberikan marker
    var marker = L.marker(lokasi).addTo(mymap);

    // memberikan popup
    L.marker(lokasi).addTo(mymap)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();

});

// // Callbacks to run specific code for specific pages, for example for About page:
// myApp.onPageInit('about', function (page) {
//     // run createContentPage func after link was clicked
//     $$('.create-page').on('click', function () {
//         createContentPage();
//     });
// });

// // Generate dynamic page
// var dynamicPageIndex = 0;
// function createContentPage() {
// 	mainView.router.loadContent(
//         '<!-- Top Navbar-->' +
//         '<div class="navbar">' +
//         '  <div class="navbar-inner">' +
//         '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
//         '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
//         '  </div>' +
//         '</div>' +
//         '<div class="pages">' +
//         '  <!-- Page, data-page contains page name-->' +
//         '  <div data-page="dynamic-pages" class="page">' +
//         '    <!-- Scrollable page content-->' +
//         '    <div class="page-content">' +
//         '      <div class="content-block">' +
//         '        <div class="content-block-inner">' +
//         '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
//         '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
//         '        </div>' +
//         '      </div>' +
//         '    </div>' +
//         '  </div>' +
//         '</div>'
//     );
// 	return;
// }