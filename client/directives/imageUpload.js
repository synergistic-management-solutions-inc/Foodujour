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
                console.log('what even are you?:', changeEvent.target.files[0]);
                var file = changeEvent.target.files[0];
                imgurOptions.API_KEY = 'da1ac69610a455d';
                imgur.upload(file).then(function then(model) {
                    console.log('Your food image can be found here: ' + model.link);
                    scope.blah = model.link;
                    console.log(scope.blah);
                    scope.$parent.meal.image = model.link;
                });
            });
        }
    }
}]);
