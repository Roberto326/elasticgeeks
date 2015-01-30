var app = angular.module('ngQApp.services');

app.service('Utils', [ function(){

  return {
    fileSize: function (a,b,c,d,e){
      if (a == null) return null;
      return (b=Math,c=b.log,d=1e3,e=c(a)/c(d)|0,a/b.pow(d,e)).toFixed(2)
        +' '+(e?'kMGTPEZY'[--e]+'B':'Bytes')
    }
  }

}]);

