$(function() {
  var toDMS = function(d, lon) {
    return {
      dir: d < 0 ? lon ? 'W' : 'S' : lon ? 'E' : 'N',
      deg: 0 | (d < 0 ? d = -d : d),
      min: 0 | d % 1 * 60,
      sec: ((0 | d * 60 % 1 * 6000) / 100).toFixed(0)
    };
  };

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var longitude = position.coords.longitude;
      var latitude = position.coords.latitude;
      
      $("strong").each(function() {
        if ($(this).text() === "Example:") {
          $(this).text("Live example:");
        }
      });

      var updateLegacyExample = function() {
        var lat = toDMS(latitude, false);
        var lon = toDMS(longitude, true);

        var legacy =
          "(" +
          lat.deg + "°" + lat.min + "'" + lat.sec + "\" " + lat.dir +
          ", " +
          lon.deg + "°" + lon.min + "'" + lon.sec + "\" " + lon.dir +
          ") " +
          moment.tz(moment.tz.guess()).format("YYYY-MM-DD HH:mm:ss z");
        $(".screen#legacy-format pre:eq(0) code").html(legacy);
      };

      var updateMachineExample = function() {
        var timestamp = new Date() / 1000;
        var machine = latitude.toFixed(4) + " " + longitude.toFixed(4) + " " + timestamp.toFixed(2);
        $(".screen#machine-format pre:eq(1) code").html(machine);
      };
      
      var updateHumanExample = function() {
        if (typeof window.geodate === "function") {
          var timestamp = new Date() / 1000;
          var date = window.geodate(timestamp, longitude);

          var human = "(" + latitude.toFixed(4) + " " + longitude.toFixed(4) + ") " + date.slice(3);
          $(".screen#human-readable-format pre:eq(1) code").html(human);
        }
      };

      updateLegacyExample();
      updateMachineExample();
      updateHumanExample();
      setInterval(updateLegacyExample, 1000);
      setInterval(updateMachineExample, 10);
      setInterval(updateHumanExample, 8640);
    });
  }
});
