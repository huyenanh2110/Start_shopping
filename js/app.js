
var app = angular.module('myApp', ['ngRoute']);
        app.config(function ($routeProvider) {
            $routeProvider
            .when('/home', {
              templateUrl: 'view/home.html'
          })
           .when('/login', {
                templateUrl: 'view/login.html'
            })
            .when('/cart', {
              templateUrl:'view/cart.html'
            })
              .otherwise({
                    redirectTo: '/home'
                });
        });
        app.run(function ($rootScope) {
            $rootScope.$on("$routeChangeStart", function () {
                $rootScope.loading = true;
            })
            $rootScope.$on("$routeChangeSuccess", function () {
                $rootScope.loading = false;
            })
            $rootScope.$on("$routeChangeError", function () {
                $rootScope.loading = false;
                alert('Lỗi rồi');
            })
        })

var productApi = 'http://localhost:3000/products';
 app.controller('myController', function($scope, $http) {
    $http.get(productApi)
      .then(function(response) {
        // Dữ liệu đã được tải thành công
        $scope.products = response.data;
        // Sử dụng dữ liệu ở đây
        $scope.index = -1;    
        $scope.product = {};
        // edit
        $scope.edit = function (index) {
          $scope.index = index;        
          $scope.product = angular.copy($scope.products[index]);
        };
        //filter
        $scope.resetFilterBtns = function() {
          $('.filter-button-group button').removeClass('active-filter-btn');
        };

        $scope.filterItems = function(filterValue) {
          $scope.resetFilterBtns();
          $scope.resetFilterBtns();
          $('.filter-button-group button[data-filter="' + filterValue + '"]').addClass('active-filter-btn');
          $('.collection-list').isotope({ filter: filterValue });
        }
        $scope.update = function() {
          var product = angular.copy($scope.product);
          
          var productId = product.id;
          console.log(productId);
          var url = productApi + '/' + productId;
        
          $http.put(url, product)
            .then(function(response) {
              console.log('Product updated:', response.data);
              $scope.products[$scope.index] = angular.copy(product);
              $scope.cancel();
              $("#exampleModal").modal("hide");
            })
            .catch(function(error) {
              console.log('Error:', error);
            });
        };

        $scope.delete = function (index) {
            var productId = $scope.products[index].id;
            console.log(productApi);
            var url = productApi + '/' + productId;
          
            $http.delete(url)
              .then(function(response) {
                console.log('Product deleted:', response.data); 
                $scope.products.splice(index, 1);
                console.log($scope.products);
                $scope.cancel();
              })
              .catch(function(error) {
                console.log('Error:', error);
              });
          };
          $scope.add = function () {
          
            $http.post(productApi, $scope.product)
              .then(function(response) {
                console.log('Product added:', response.data);
                $scope.products.push(response.data);
                console.log($scope.products);
                $scope.cancel();
                $scope.successMessage = 'Thêm sản phẩm thành công!';
                
              })
              .catch(function(error) {
                console.log('Error:', error);
              });
          };
          // 
          $scope.getFileDetails = function (e) {
            // Lấy tên tệp từ input type file
            $scope.product.image = e.files[0].name;
        };
        // 
          $scope.$watch('file', function (newFile) {
            if (newFile) {
            // Lấy tên của tệp
            var fileName = newFile.name;

            // In ra console hoặc làm bất kỳ thứ gì bạn muốn với tên tệp
            console.log("Selected File Name: " + fileName);

            // Gán tên tệp cho một biến trong $scope để sử dụng trong template AngularJS
            $scope.p.img = fileName;
            }
        });

        // Lắng nghe sự kiện change trên input type file và cập nhật giá trị của biến 'file'
        document.getElementById('formFileSm').addEventListener('change', function (event) {
            $scope.$apply(function () {
                $scope.file = event.target.files[0];
            });
        });
  
          $scope.customFilter = function(product) {
            var searchTerm = $scope.searchTerm;
            var regex = new RegExp(searchTerm, 'i');
            
            return regex.test(product.name);
          };
        // cancel
        $scope.cancel = function () {
          $scope.index = -1;
          $scope.product = {};
        };
        $scope.prop = "name";
        $scope.sortBy = function (prop) {
          $scope.prop = prop;
        };
        $scope.counter = 1;
        $scope.begin = 0;
        $scope.pageCount = Math.ceil($scope.products.length / 6);

        $scope.first = function () {
          $scope.begin = 0;
        };
        $scope.prev = function () {
          if ($scope > 0) {
            $scope.begin -= 6;
          }
        };
            //counter
            $scope.updateCounter = function() {
              // $scope.counter = $scope.begin + 1;
              $scope.begin += 6;
            };
        $scope.next = function () {
          if ($scope.begin < ($scope.pageCount - 1) * 6) {
            $scope.begin += 6;
          }
        };
        $scope.last = function () {
          $scope.begin = ($scope.pageCount - 1) * 6;
        };

      })
      .catch(function(error) {
        // Xử lý lỗi nếu có
        console.error('Lỗi:', error);
      });
      $http.get(popularApi)
       .then(function(response) {
         // Dữ liệu đã được tải thành công
         
         $scope.popularProducts= response.data;
      

// Tạo mảng mới với số lượng phần tử giới hạn

       })
       .catch(function(error) {
         // Xử lý lỗi nếu có
         console.error('Lỗi:', error);  
       });
       $http.get('http://localhost:3000/bestSelling_Products')
       .then(function(response) {
         // Dữ liệu đã được tải thành công
         
         $scope.bestSelling_Products= response.data;
// Tạo mảng mới với số lượng phần tử giới hạn

       })
       .catch(function(error) {
         // Xử lý lỗi nếu có
         console.error('Lỗi:', error);  
       });
       $http.get('http://localhost:3000/onSale_Products')
       .then(function(response) {
         // Dữ liệu đã được tải thành công
         
         $scope.onSale_Products = response.data;
      

// Tạo mảng mới với số lượng phần tử giới hạn
       })
       .catch(function(error) {
         // Xử lý lỗi nếu có
         console.error('Lỗi:', error);  
       });
      
      
  });
 
  

