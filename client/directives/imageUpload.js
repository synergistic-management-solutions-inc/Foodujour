app.directive("fileread", ['imgur', 'imgurOptions',function (imgur, imgurOptions) {
    return {
        scope: {
            fileread: "="
        },
        controller: 'MealForm',
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                var file = changeEvent.target.files[0];
                imgurOptions.API_KEY = 'da1ac69610a455d'; //note: this api key is public right now
                imgur.upload(file).then(function then(model) {
                    console.log('Your food image can be found here: ' + model.link);
                    scope.link = model.link;
                    scope.$parent.meal.image = model.link;
                });
            });
        }
    }
}]);
