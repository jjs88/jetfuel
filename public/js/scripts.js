(function() {
  const myForm = document.querySelector('.myForm');
  const shorten = document.querySelector('input[name="shorten"]');
  const linkName = document.querySelector('input[name="linkName"]');
  const selection = document.querySelector('.selection');
  const folderName = document.querySelector('input[name="foldername"]');
  const createFolderBtn = document.querySelector('.createFolder');
  const error = document.querySelector('.error-folder');
  const errorLink = document.querySelector('.error-link');


  createFolderBtn.addEventListener('click', (e) => {
    if(!folderName.value) {
      error.style.display = 'block';
      error.innerHTML = 'No folder entered'
    } else {
      error.style.display = 'none';
      error.innerHTML = '';
    }
    //add folder 
    const obj = { name: folderName.value }
    Helper.addFolder(obj);
  })

  myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!linkName.value || !shorten.value) {
      errorLink.style.display = 'block';
      errorLink.innerHTML = 'no link or name entered';
    } else {
      errorLink.style.display = 'none';
      errorLink.innerHTML = '';
    }

    const obj = {
      name: linkName.value,
      linkUrl: shorten.value,
      folderId: selection.options[selection.selectedIndex].getAttribute('id')
    }
    //helper function in diff file
    Helper.addLink(obj);
    //clear form
    myForm.reset();
  })

  //call this when a folder is added
  Helper.updateFolderList();
  //adds folder tabs
  Helper.fetchFolders();






















})();