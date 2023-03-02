var myApp = angular.module('myApp', []);

myApp.controller('mainController', [
  '$scope',
  function ($scope) {
    $scope.values = [
      {
        netto: 0,
        vatRate: 23,
        vatValue: 0,
        brutto: 0,
      },
    ];

    $scope.summary = {
      nettoSum: 0,
      vatValueSum: 0,
      bruttoSum: 0,
    };

    $scope.removeZero = function () {
      if (this.value.netto == 0) {
        this.value.netto = '';
      }
    };

    $scope.addZero = function () {
      if (this.value.netto === '') {
        this.value.netto = 0;
      }
    };

    $scope.calculate = function () {
      if (this.value.netto !== 0 && this.value.netto !== '') {
        this.value.vatValue = (
          parseFloat(this.value.netto) * parseFloat(this.value.vatRate / 100)
        ).toFixed(2);

        this.value.brutto = (
          parseFloat(this.value.netto) +
          parseFloat(this.value.netto * (this.value.vatRate / 100))
        ).toFixed(2);
      } else {
        this.value.vatValue = 0;
        this.value.brutto = 0;
      }

      $scope.calcSummary();
    };

    $scope.calcSummary = function () {
      $scope.summary = {
        nettoSum: 0,
        vatValueSum: 0,
        bruttoSum: 0,
      };

      $scope.values.forEach(function (value) {
        $scope.summary.nettoSum += parseFloat(value.netto);
        $scope.summary.vatValueSum += parseFloat(value.vatValue);
        $scope.summary.bruttoSum += parseFloat(value.brutto);
      });

      if (isNaN($scope.summary.nettoSum)) {
        $scope.summary.nettoSum = 0;
      }

      if (isNaN($scope.summary.vatValueSum)) {
        $scope.summary.vatValueSum = 0;
      }

      if (isNaN($scope.summary.bruttoSum)) {
        $scope.summary.bruttoSum = 0;
      }

      $scope.summary.nettoSum = $scope.summary.nettoSum.toFixed(2);
      $scope.summary.vatValueSum = $scope.summary.vatValueSum.toFixed(2);
      $scope.summary.bruttoSum = $scope.summary.bruttoSum.toFixed(2);
    };

    $scope.removeRow = function (value) {
      let removedRow = $scope.values.indexOf(value);
      $scope.values.splice(removedRow, 1);

      $scope.calcSummary();
    };

    $scope.addRow = function () {
      $scope.values.push({
        netto: 0,
        vatRate: 23,
        vatValue: 0,
        brutto: 0,
      });
    };
  },
]);
