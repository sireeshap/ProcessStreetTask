describe("Testing Upload Controller", function () {
    beforeEach(angular.mock.module('mainController'));
    beforeEach(angular.mock.module('wistiaUpload'));

    describe("FileUploadController", function () {
        var $scope, $upload, $rootScope;

        beforeEach(inject(function ($injector) {
            $upload = $injector.get('$upload');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();

            var $controller = $injector.get('$controller');

            createController = function () {
                return $controller('mainController', {
                    '$scope': $scope
                });
            };
            var controller = createController();
        }));

        describe("uploadFile", function () {
            var $httpBackend, promise, successCallback, errorCallback, httpController, mockFile;
            var expectedUrl = 'https://upload.wistia.com';

            beforeEach(inject(function ($rootScope, $controller, _$httpBackend_) {
                $httpBackend = _$httpBackend_;
                scope = $rootScope.$new();
                successCallback = jasmine.createSpy();
                errorCallback = jasmine.createSpy();
                httpController = $controller('mainController', {
                    '$scope': scope
                });
                var params = { api_password: '9d445190e5c389da2934a3895f6c91d8a9477d74636a1fc9f080d0b01430c812' }
                mockFile = { data: "testdata", method: "POST", params: params, url: expectedUrl, file: [{ "name": "File.mp4", "body": "abcd121212" }] };
            }));

            it('returns http requests successfully and resolves the promise', function () {
                var data = '{"success":"true"}';
                expect(expectedUrl).toBeDefined();

                $httpBackend.expectPOST(expectedUrl).respond(200, data);

                promise = $upload.upload(mockFile);

                promise.then(successCallback, errorCallback);

                $httpBackend.flush();

                expect(successCallback).toHaveBeenCalledWith(angular.fromJson(data));

                expect(errorCallback).not.toHaveBeenCalled();
            });

        });
    });
});