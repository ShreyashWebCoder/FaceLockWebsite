function handleFileUpload(event) {
    const file = event.target.files[0];
    const fileList = document.getElementById('file-list');
    
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = '<i class="fas fa-file"></i> ' + file.name;
        fileList.appendChild(fileItem);
      }
      reader.readAsDataURL(file);
    }
  }
  
  function createFolder() {
    const folderName = document.getElementById('folder-name').value;
    const fileList = document.getElementById('file-list');
    
    if (folderName.trim() !== '') {
      const folderItem = document.createElement('div');
      folderItem.className = 'file-item';
      folderItem.innerHTML = '<i class="fas fa-folder"></i> Folder: ' + folderName;
      fileList.appendChild(folderItem);
    }
  }
  