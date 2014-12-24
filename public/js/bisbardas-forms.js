// Formulario de registro


$(document).ready(function () {
  $("form[name='user-registry'] input").focus(function() {
    $("form[name='user-registry']").find('.form-line-error:visible').fadeOut();
    $("form[name='user-registry']").find('.error-msg:visible').fadeOut();
  });

  $("form[name='user-registry'] input[type='submit']").click(function() {
    var forminstance = $("form[name='user-registry']");

    if (!validateEmail(forminstance.find('input[name="username"]').val())) {
      forminstance.find('.form-line-error, #error-username').fadeIn();
      return false;
    }

    if (stringEmpty(forminstance.find('input[name="firstname"]').val())) {
      forminstance.find('.form-line-error, #error-firstname').fadeIn();
      return false;
    }

    if (stringEmpty(forminstance.find('input[name="lastname"]').val())) {
      forminstance.find('.form-line-error, #error-lastname').fadeIn();
      return false;
    }

    var pass1 = forminstance.find('input[name="password"]').val();
    var pass2 = forminstance.find('input[name="password-repeat"]').val();

    if (pass1.length < 6 || pass1.length > 24) {
      forminstance.find('.form-line-error, #error-password').fadeIn();
      return false;
    } else if (pass1 != pass2) {
      forminstance.find('.form-line-error, #error-password-repeat').fadeIn();
      return false;
    }
    else {
      $('input[name="password"]').val('');
      $('input[name="password-repeat"]').val('');
      $('input[name="password-encrypted"]').val(CryptoJS.SHA1(pass1));
    }

    forminstance.find('.form-line-error').fadeOut();
  });
});
