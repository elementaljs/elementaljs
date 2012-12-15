Elemental.Reload = function(element){
  setInterval(function(){
    var options = {
      dataType: 'html',
      beforeSend: function(xhr){
        xhr.setRequestHeader('X-PJAX', 'true');
      },
      success: function(data) {
        $(element).html(data);
      }
    };
    $.ajax(options);
  }, 30000);
};
