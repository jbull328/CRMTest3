$(document).ready(function(){
    var name = $('#emialTemplateSelector :selected').text();
    console.log(name);

     $('#emailPreviewButton').click(function(){
        $('#emailPreview').modal('show');
     });
});
