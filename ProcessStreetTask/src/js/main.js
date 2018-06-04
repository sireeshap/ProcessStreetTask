(function () {
    'use strict';
    angular.module('wistiaUpload').controller('mainController', ['$scope', 'fileUploadConfig',
        function ($scope, fileUploadConfig) {
            $scope.videoUrl = null;
            $scope.progress = 0;
            $scope.posturl = fileUploadConfig.posturl;
            $scope.error = '';
            $scope.allowedTypes = ['avi', 'flv', 'wmv', 'mov', 'mp4', 'mp3']
            $scope.uploadedData = null;
            $('#fileupload').fileupload({
                dataType: 'json',
                formData: {api_password:'9d445190e5c389da2934a3895f6c91d8a9477d74636a1fc9f080d0b01430c812'},
                add: function (e, data) {
                    $scope.$apply($scope.posturl);
                    angular.forEach(data.files, function (val, key) {
                        console.log(val);
                        if (val.type.indexOf('video') > -1) {
                            var ext = val.name.split('.')[1];
                            if ($scope.allowedTypes.indexOf(ext) > -1) {
                                $scope.error = '';
                                data.submit();
                            }
                            else {
                                $scope.error = 'Only avi,flv,wmv,mov,mp4,mp3 files are allowed'
                            }
                        }
                        else {
                            $scope.error = 'Only video files are allowed'
                        }
                    });
                    $scope.$apply($scope.error);

                },
                progressall: function (e, data) {
                    $scope.progress = parseInt(data.loaded / data.total * 100, 10);
                    $scope.$apply(function () {
                        $('.progress .progress-bar').css(
                            'width',
                            $scope.progress + '%'
                        );
                    });
                },
                done: function (e, data) {
                    console.log(data)
                    $scope.$apply(function () {
                        $scope.uploadedData = data.result.thumbnail;
                        $scope.videoUrl = 'https://fast.wistia.net/embed/iframe/' + data.result.hashed_id;
                    });

                }
            });
        }]);
})();