var Helper = (function() {
  const selection = document.querySelector('.selection');
  const folderTabs = document.querySelector('.folder-tabs');
  const content = document.querySelector('.content');

  async function updateFolderList () {
    const res = await fetch('/api/folders');
    const data = await res.json();
    selection.innerHTML = '';

    data.forEach( ({ name, _id }) => {
      const ele = document.createElement('option')
      const textNode = document.createTextNode(name);
      ele.appendChild(textNode);
      ele.setAttribute('id', _id)
      selection.appendChild(ele);
      }); 
  }

  //starting point for API
  //adds data to the Link table and appends it to the specific folder
  async function addLink(obj) {
    const res = await fetch('/api/addLink',{
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'content-type': 'application/json'
      }
    });
    //get folder back
    const data = await res.json();
    //use folder id to make another API call to grab the links folder with the links data
    const res1 = await fetch(`/api/folder/${data._id}`);
    const data1 = await res1.json();
    //pass folder with links data to re-populate the content div with updated links
    renderFolderContent(data1);
  }

  async function addFolder(data) {
    const res = await fetch('/api/addFolder', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      }
    })
    
    await res.json();
    //add folder to options dropdown list
    updateFolderList();
    //add to folder tab
    fetchFolders();
  }


  async function fetchFolders() {
    const res = await fetch('/api/folders');
    const data = await res.json();
    renderFolderTabs(data);
  }

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
    let links;

    if(data.links.length === 0) {
      links = `<div class="folder-link">no links created</div>`;
      renderData(content, links);
      return;
    }
    
    links = data.links.map(item => {
      return `
        <div class="folder-link">
        <a href=${item.shortenedUrl}>${item.name}</a>
        </div>
      `;
    }).join(' ');

    //need to utit
    renderData(content, links);
  }

  folderTabs.addEventListener('click', async (e) => {
    const id = e.target.getAttribute('data-id');
    //retrieve folder data
    console.log(id);
    const res = await fetch(`/api/folder/${id}`);
    const data = await res.json();
    renderFolderContent(data);
  });



  //this needs to be used since content re-rendering is done using .innerHTML method
  //need to manually set the opacity to 0, wait 200ms, update innerHTML and then set opacity to 1
  function renderData(ele, data) {
    ele.style.opacity = 0;    
    setTimeout(() => {
      ele.innerHTML = data;
      ele.style.opacity = 1;
    }, 200)
  }


  // expose functions here
  return {
    updateFolderList,
    addLink,
    fetchFolders,
    addFolder
  }

})();