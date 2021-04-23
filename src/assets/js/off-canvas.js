'use strict';
/* eslint-disable import/no-duplicates */
import $ from 'jquery'
// import jQuery from 'jquery'

const offCanvas = function() {
  'use strict';
  $(function() {
    $('[data-toggle="offcanvas"]').on("click", function() {
      $('.sidebar-offcanvas').toggleClass('active')
    });
  });
}

export { offCanvas }
