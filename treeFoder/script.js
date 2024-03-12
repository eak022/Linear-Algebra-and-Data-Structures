// script.js
document.addEventListener("DOMContentLoaded", function () {
  const tree = document.getElementById("tree");

  function createNode(name, type) {
    const node = document.createElement("div");
    node.classList.add(type);
    node.innerHTML = name;
    node.addEventListener("click", function (event) {
      toggleActions(event, node);
    });
    return node;
  }

  function toggleActions(event, node) {
    const existingActions = node.querySelector(".actions");
    if (existingActions) {
      node.removeChild(existingActions);
    } else {
      showActions(node);
    }
    event.stopPropagation();
  }

  function showActions(node) {
    const actions = document.createElement("div");
    actions.classList.add("actions");
    if (node.classList.contains("folder")) {
      const addFile = document.createElement("span");
      addFile.innerHTML = "Add File";
      addFile.addEventListener("click", function () {
        addFileToFolder(node); // เรียกใช้ฟังก์ชันโดยตรง
      });
      actions.appendChild(addFile);
    }
    const rename = document.createElement("span");
    rename.innerHTML = "Rename";
    rename.addEventListener("click", function () {
      renameNode(node);
    });
    const del = document.createElement("span");
    del.innerHTML = "Delete";
    del.addEventListener("click", function () {
      deleteNode(node);
    });
    actions.appendChild(rename);
    actions.appendChild(del);
    node.appendChild(actions);
  }

  function renameNode(node) {
    const newName = prompt("Enter new name:");
    if (newName !== null && newName !== "") {
      node.innerHTML = newName;
      node.removeChild(node.querySelector(".actions"));
    }
  }

  function deleteNode(node) {
    if (confirm("Are you sure you want to delete this?")) {
      node.parentNode.removeChild(node);
    }
  }

  function addFolder() {
    const folderName = prompt("Enter folder name:");
    if (folderName !== null && folderName !== "") {
      const folder = createNode(folderName, "folder");
      tree.appendChild(folder);
    }
  }

  function addFileToFolder(folderNode) {
    const fileName = prompt("Enter file name:");
    if (fileName !== null && fileName !== "") {
      const file = createNode(fileName, "file");
      folderNode.appendChild(file);
    }
  }

  // Initial folder
  const rootFolder = createNode("Root", "folder");
  tree.appendChild(rootFolder);

  // Add folder button
  const addFolderBtn = document.getElementById("addFolderBtn");
  addFolderBtn.addEventListener("click", addFolder);

  // Add file button
  const addFileBtn = document.getElementById("addFileBtn");
  addFileBtn.addEventListener("click", function () {
    addFileToFolder(rootFolder); // Add file to root folder
  });

  // Close actions when clicking outside
  document.addEventListener("click", function () {
    const existingActions = document.querySelector(".actions");
    if (existingActions) {
      existingActions.parentNode.removeChild(existingActions);
    }
  });
});
