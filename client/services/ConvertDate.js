app.factory('ConvertDate', [function() {
  convert = function(d) {
    var dateObj = new Date(d * 1000)
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    newDate = month + "/" + day + "/" + year;
    return newDate;
  }

  return {
    convert: convert
  }
  
}]);
