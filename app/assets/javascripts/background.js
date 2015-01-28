(
  function() {

    var resize_home = function(vph) {
      var bi = document.getElementById('box-image');
      if (!bi) return;

      if (bi.offsetWidth > 2310) {
        bi.style.height = vph + 'px';
        bi.className = 'qapp-back-image-2300';
      } else if (bi.offsetWidth > 1481) {
        bi.style.height = vph + 'px';
        bi.className = 'qapp-back-image-1500';
      } else if (bi.offsetWidth > 977) {
        bi.style.height = vph + 'px';
        bi.className = 'qapp-back-image-1000';
      } else {
        bi.style.height = vph + 'px';
        bi.className = 'qapp-back-image-500';
      }
    };

    var resize_image = function() {
      var vph = document.documentElement.clientHeight;

      resize_home(vph);
    };

    window.onresize = resize_image;
    resize_image();
  }
)();
