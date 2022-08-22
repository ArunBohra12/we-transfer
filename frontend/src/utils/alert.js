const showAlert = (type, message) => {
  const alertHTML = `<div class='alert alert--${type}'>${message}</div>`;

  document.body.insertAdjacentHTML('afterbegin', alertHTML);

  setTimeout(() => {
    const alert = document.querySelector('.alert');
    alert.remove();
  }, 3000);
};

export default showAlert;
