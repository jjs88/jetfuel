var Content = (function() {
  const folderTabs = document.querySelector('.folder-tabs');
  const content = document.querySelector('.content');

  // event listener for clicking the folder tab
  // folder id is attached to the data attribute. will be used to make the api call for getting the data
  folderTabs.addEventListener('click', async (e) => {
    const id = e.target.getAttribute('data-id');
    //retrieve folder data
    const res = await fetch(`/api/folder/${id}`);
    const data = await res.json();
    //render the data to the content DIV
    renderFolderContent(data);
  });

  // populates the folder tabs
  function renderFolderTabs(data) {
    const folders = data.map(item => {
      return `
        <div class="folder-tab" data-id=${item._id}>${item.name}</div>
      `
    }).join(' ');

    folderTabs.innerHTML = folders;
  }

  //populates the folder tab with links when clicked
  function renderFolderContent(data) {
    const links = data.links.map(item => {
      return `
        <div class="folder-link">
        <a href=${item.shortenedUrl}>${item.name}</a>
        </div>
      `;
    }).join(' ');
    content.innerHTML = links;
  }









  return {
    renderFolderTabs
  }

})();