import React from 'react';
import $ from 'jquery';
  $(document).ready(function() {
    $("#checkall").click(function(){
      $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $(".ischeck").click(function() {
      var ischeck = $(this).data('id');
      $('.isscheck_' + ischeck).prop('checked', this.checked);
    });
  });

