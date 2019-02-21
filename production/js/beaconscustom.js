$(function () {

    function initMap() {

        // Register Manual Beacons
        var location = new google.maps.LatLng(1.36267848, 103.85521197);
        var beacon_blk406A = new google.maps.LatLng(1.36214755, 103.85376358);
        var beacon_blk406B = new google.maps.LatLng(1.36197057, 103.85421419);
        var beacon_fitness = new google.maps.LatLng(1.36166757, 103.85446096);
        var beacon_FoodCourtA = new google.maps.LatLng(1.36264898, 103.8555392);
        var beacon_FoodCourtB = new google.maps.LatLng(1.36287959, 103.85539973);
        var beacon_MarketA = new google.maps.LatLng(1.3626168, 103.85511005);
        var beacon_BusStation = new google.maps.LatLng(1.36221459, 103.85574842);
        var beacon_CommunityC = new google.maps.LatLng(1.36395753, 103.85412836);
        var beacon_SACBeaconA = new google.maps.LatLng(1.36503547, 103.85330761);
        var beacon_SACBeaconB = new google.maps.LatLng(1.36498721, 103.85321641);
        var beacon_SACAntenna = new google.maps.LatLng(1.36459035, 103.85693395);

        // Load Map to Teck Ghee
        var mapCanvas = document.getElementById('map');
        var mapOptions = {
            center: location,
            zoom: 17,
            panControl: false,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(mapCanvas, mapOptions);

        // Marker Image Load
        var markerImage = 'images/map-marker-2-xxls2.png';

        // Set Up Location, Content and Listener
        var marker_blk406A = new google.maps.Marker({
            position: beacon_blk406A, map: map, icon: markerImage});
        var contentString_blk406A = '<p>blk406A</p>'+ '<img src="images/blk406B.png" class="img-responsive center-block" width="100%">' + '<p>Block 406 is included in the Teck Ghee deployment. The north-east corner of the block (A) has a direct link to the wet market and the AMK Market & Food Center. We intend to place beacons there (B) and near the main elevator and letter boxes (C).</p>';
        var infowindow_blk406A = new google.maps.InfoWindow({
            content: contentString_blk406A, maxWidth: 300});
        marker_blk406A.addListener('click', function () {
            infowindow_blk406A.open(map, marker_blk406A);});
        // Set Up Location, Content and Listener
        var marker_blk406B = new google.maps.Marker({
            position: beacon_blk406B, map: map, icon: markerImage});
        var contentString_blk406B = '<p>blk406B</p>'+ '<img src="images/blk406B.png" class="img-responsive center-block" width="100%">' + '<p>Block 406 is included in the Teck Ghee deployment. The north-east corner of the block (A) has a direct link to the wet market and the AMK Market & Food Center. We intend to place beacons there (B) and near the main elevator and letter boxes (C).</p>';
        marker_blk406B.addListener('click', function () {
            infowindow_blk406B.open(map, marker_blk406B);});
        var infowindow_blk406B = new google.maps.InfoWindow({
            content: contentString_blk406B, maxWidth: 300});
        // Set Up Location, Content and Listener
        var marker_fitness = new google.maps.Marker({
            position: beacon_fitness, map: map, icon: markerImage});
        var contentString_fitness = '<p>fitness</p>'+ '<img src="images/fitness.png" class="img-responsive center-block" width="100%">' + '<p>The Ang Mo Kio Town Council opened the Elderly Fitness Corner in 2015 in order to enable a senior-friendly community in Teck Ghee. The fitness area has 10+ installations. The area is subject to direct exposure to rain. Thus, remaining possibilities are to stick beacons under fitness equipment’s seats and nearest benches. Block 404 nearest wall might as well be appropriate.</p>';
        marker_fitness.addListener('click', function () {
            infowindow_fitness.open(map, marker_fitness);});
        var infowindow_fitness = new google.maps.InfoWindow({
            content: contentString_fitness, maxWidth: 300});
        // Set Up Location, Content and Listener
        var marker_FoodCourtA = new google.maps.Marker({
            position: beacon_FoodCourtA, map: map, icon: markerImage});
        var contentString_FoodCourtA = '<p>FoodCourtA</p>'+ '<img src="images/FoodCourtB.png" class="img-responsive center-block" width="100%">' + '<p>Blk 409 AMK Market & Food Centre (Teck Ghee Square) is a popular area in AMK. The place is divided into two main areas: on the north-side, the hawker center, and on the south- side, the market. The Food Center is quite large, and has 40+ stalls; it is a vibrant place where a lot of elderly people meet during the day. Beacons will be placed on top of food stalls (if possible the one near the centre corners) and near the supporting beam.</p>';
        marker_FoodCourtA.addListener('click', function () {
            infowindow_FoodCourtA.open(map, marker_FoodCourtA);});
        var infowindow_FoodCourtA = new google.maps.InfoWindow({
            content: contentString_FoodCourtA, maxWidth: 300});
        // Set Up Location, Content and Listener
        var marker_FoodCourtB = new google.maps.Marker({
            position: beacon_FoodCourtB, map: map, icon: markerImage});
        var contentString_FoodCourtB = '<p>FoodCourtB</p>'+ '<img src="images/FoodCourtB.png" class="img-responsive center-block" width="100%">' + '<p>Blk 409 AMK Market & Food Centre (Teck Ghee Square) is a popular area in AMK. The place is divided into two main areas: on the north-side, the hawker center, and on the south- side, the market. The Food Center is quite large, and has 40+ stalls; it is a vibrant place where a lot of elderly people meet during the day. Beacons will be placed on top of food stalls (if possible the one near the centre corners) and near the supporting beam.</p>';
        marker_FoodCourtB.addListener('click', function () {
            infowindow_FoodCourtB.open(map, marker_FoodCourtB);});
        var infowindow_FoodCourtB = new google.maps.InfoWindow({
            content: contentString_FoodCourtB, maxWidth: 300});
        // Set Up Location, Content and Listener
        var marker_MarketA = new google.maps.Marker({
            position: beacon_MarketA, map: map, icon: markerImage});
        var contentString_MarketA = '<p>MarketA</p>'+ '<img src="images/MarketA.png" class="img-responsive center-block" width="100%">' + '<p>The Market represents more than half of the AMK Center area. We need thus an effective beacons positioning system. Beacons broadcast 2.4 GHz radio waves are susceptible to environmental factors (interference, human bodies, metal obstacles...)</p>';
        marker_MarketA.addListener('click', function () {
            infowindow_MarketA.open(map, marker_MarketA);});
        var infowindow_MarketA = new google.maps.InfoWindow({
            content: contentString_MarketA, maxWidth: 300});
        // Set Up Location, Content and Listener
        var marker_BusStation = new google.maps.Marker({
            position: beacon_BusStation, map: map, icon: markerImage});
        var contentString_BusStation = '<p>BusStation</p>';
        marker_BusStation.addListener('click', function () {
            infowindow_BusStation.open(map, marker_BusStation);});
        var infowindow_BusStation = new google.maps.InfoWindow({
            content: contentString_BusStation, maxWidth: 300});
        // Set Up Location, Content and Listener
        var marker_CommunityC = new google.maps.Marker({
            position: beacon_CommunityC, map: map, icon: markerImage});
        var contentString_CommunityC = '<p>CommunityC</p>' + '<img src="images/CommunityC.png" class="img-responsive center-block" width="100%">' + '<p>Teck Ghee Community Club (CC) on Block 861 is closed until 1st quarter of 2018. Courses and activities have been relocated to other alternative venues. Block 414 is a CC antenna and is opened.</p>';
        marker_CommunityC.addListener('click', function () {
            infowindow_CommunityC.open(map, marker_CommunityC);});
        var infowindow_CommunityC = new google.maps.InfoWindow({
            content: contentString_CommunityC, maxWidth: 300});
        // Set Up Location, Content and Listener
        var marker_SACBeaconA = new google.maps.Marker({
            position: beacon_SACBeaconA, map: map, icon: markerImage});
        var contentString_SACBeaconA = '<p>SACBeaconA</p>' + '<img src="images/SACBeaconB.png" class="img-responsive center-block" width="100%">' + '<p>COMNET Senior Activity Centres (SACs) engage seniors in various activities such as morning exercises, games, health and wellness programmes, as well as arts and crafts sessions. The SACs provide regular outreach, monitoring and support to seniors living within the block.</p>';
        marker_SACBeaconA.addListener('click', function () {
            infowindow_SACBeaconA.open(map, marker_SACBeaconA);});
        var infowindow_SACBeaconA = new google.maps.InfoWindow({
            content: contentString_SACBeaconA, maxWidth: 300});
        // Set Up Location, Content and Listener
        var marker_SACBeaconB = new google.maps.Marker({
            position: beacon_SACBeaconB, map: map, icon: markerImage});
        var contentString_SACBeaconB = '<p>SACBeaconB</p>'+ '<img src="images/SACBeaconB.png" class="img-responsive center-block" width="100%">' + '<p>COMNET Senior Activity Centres (SACs) engage seniors in various activities such as morning exercises, games, health and wellness programmes, as well as arts and crafts sessions. The SACs provide regular outreach, monitoring and support to seniors living within the block.</p>';
        marker_SACBeaconB.addListener('click', function () {
            infowindow_SACBeaconB.open(map, marker_SACBeaconB);});
        var infowindow_SACBeaconB = new google.maps.InfoWindow({
            content: contentString_SACBeaconB, maxWidth: 300});
        // Set Up Location, Content and Listener
        var marker_SACAntenna = new google.maps.Marker({
            position: beacon_SACAntenna, map: map, icon: markerImage});
        var contentString_SACAntenna = '<p>SACAntenna</p>'+ '<img src="images/SACAntenna.png" class="img-responsive center-block" width="100%">' + '<p>Just opposite of the road (Ang Mo Kio Ave 10), the COMNET Senior Activity Centre deployed an antenna. The center is smaller but is very valuable to the elderly people living in the nearest blocks (466, 467, 468, 469, 470, 471, ...476). </p>';
        marker_SACAntenna.addListener('click', function () {
            infowindow_SACAntenna.open(map, marker_SACAntenna);});
        var infowindow_SACAntenna = new google.maps.InfoWindow({
            content: contentString_SACAntenna, maxWidth: 300});


    }

    google.maps.event.addDomListener(window, 'load', initMap);
});