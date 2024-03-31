const dropBox = document.getElementById('drop-box');
const deleteBox = document.getElementById('delete-box');
const smallBoxes = document.querySelectorAll('.small-box');

let countRed = 0;
let countBlue = 0;

smallBoxes.forEach(box => {
  box.addEventListener('dragstart', dragStart);
});

dropBox.addEventListener('dragover', dragOver);
dropBox.addEventListener('drop', drop);

deleteBox.addEventListener('dragover', dragOver);
deleteBox.addEventListener('drop', deleteDrop);

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.className);
}

function dragOver(e) {
  e.preventDefault();
}
let newBox = null; // สร้างตัวแปร newBox นอกจากบล็อกของ if

function drop(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData('text/plain');
  const draggedBox = document.querySelector('.' + data);
  
  // เช็คว่าลากไปวางใน drop-box หรือไม่
  if (e.target.id === 'drop-box') {
    if (data.includes('red') && countRed < 2) {
      newBox = document.createElement('div'); // กำหนดค่าให้กับ newBox ในบล็อกของ if
      newBox.className = 'small-box red';
      dropBox.appendChild(newBox);
      countRed++;
    } else if (data.includes('blue') && countBlue < 2) {
      newBox = document.createElement('div'); // กำหนดค่าให้กับ newBox ในบล็อกของ if
      newBox.className = 'small-box blue';
      dropBox.appendChild(newBox);
      countBlue++;
    }
    // เรียกใช้ dragStart เพื่อเพิ่มข้อมูลใน dataTransfer
    if (newBox) { // ตรวจสอบว่า newBox มีค่าหรือไม่ก่อนเรียกใช้งาน
      triggerDragStart(newBox);
    }
  } 
  // เช็คว่าลากไปวางใน delete-box หรือไม่ และลบกล่องที่ถูกลากมา
  else if (e.target.id === 'delete-box' && draggedBox.parentNode.id === 'drop-box') {
    draggedBox.remove();
    if (data.includes('red')) {
      countRed--;
    } else if (data.includes('blue')) {
      countBlue--;
    }
  }
  
  updateStats();
}

  // ฟังก์ชันสำหรับเรียกใช้ dragStart
  function triggerDragStart(element) {
    const event = new MouseEvent('dragstart', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    element.dispatchEvent(event);
  }
  

function deleteDrop(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData('text/plain');
  const box = e.target.closest('.small-box');
  if (box && box.parentNode.id === 'drop-box' && (data.includes('red') || data.includes('blue'))) {
    box.remove();
    countRed = Math.max(0, countRed - (data.includes('red') ? 1 : 0));
    countBlue = Math.max(0, countBlue - (data.includes('blue') ? 1 : 0));
  }
  updateStats();
}

function updateStats() {
  document.getElementById('max-boxes').textContent = 'สามารถใส่ได้สูงสุดสีล่ะ: 2 กล่อง';
  document.getElementById('red-boxes').textContent = 'จำนวนกล่องสีแดง: ' + countRed;
  document.getElementById('blue-boxes').textContent = 'จำนวนกล่องน้ำเงิน: ' + countBlue;
}
