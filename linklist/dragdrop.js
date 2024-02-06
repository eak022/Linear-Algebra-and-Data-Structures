let carriageCount = 0;
let dragged;

   

document.addEventListener('DOMContentLoaded', (event) => {
  const train = document.getElementById("train");
window.addCarriage = function () {
  // เพิ่มรูปหัวรถไฟและรูปท้ายรถไฟก่อนเพิ่มโบกี้
 if (carriageCount === 1) {
   // เพิ่มรูปหัวรถไฟ
   const trainHead = document.createElement("img");
   trainHead.src = "transport.png"; // เปลี่ยนเป็นที่อยู่ของรูปหัวรถไฟ
   trainHead.alt = "Train Head";
   train.appendChild(trainHead);
 }


  // ลบรูปท้ายรถไฟที่เพิ่มเข้ามาทั้งหมด
  const trainTails = train.querySelectorAll("img[alt='Train Tail']");
  trainTails.forEach((tail) => tail.remove());

  carriageCount++;
  const newCarriage = document.createElement("div");
  newCarriage.className = "carriage";
  newCarriage.setAttribute("draggable", true);
  newCarriage.id = "carriage" + carriageCount;
  newCarriage.textContent = "โบกี้ " + carriageCount;

  // เพิ่มรูปท้ายรถไฟหลังจากโบกี้สุดท้าย หากโบกี้เป็นครั้งแรก
  const trainTail = document.createElement("img");
  trainTail.src = "railway.png"; // เปลี่ยนเป็นที่อยู่ของรูปท้ายรถไฟ
  trainTail.alt = "Train Tail";
  train.appendChild(trainTail);
  train.appendChild(newCarriage);
  addDragEvents(newCarriage);
};






  const addDragEvents = (item) => {
    item.addEventListener("dragstart", (e) => {
      dragged = item;
      e.dataTransfer.setData("text/plain", item.id);
    });
  };

  // จัดการกับการลากและวาง
  // (เพิ่มเหตุการณ์ dragover และ drop ตามตัวอย่างก่อนหน้า)
  train.addEventListener("dragover", (e) => {
    e.preventDefault(); // อนุญาตให้วาง
  });

  train.addEventListener("drop", (e) => {
    e.preventDefault();
    if (dragged && e.target.className === "carriage") {
      // หาโบกี้ที่อยู่ใกล้ที่สุดและวางโบกี้ที่ลากมาก่อนหรือหลัง
      const afterElement = getDragAfterElement(train, e.clientX);
      if (afterElement == null) {
        train.appendChild(dragged);
      } else {
        train.insertBefore(dragged, afterElement);
      }
    }
  });

  ง
  // ฟังก์ชันหาโบกี้ที่ควรจะวางโบกี้ที่ลากมาต่อหน้าหรือหลัง
  function getDragAfterElement(container, x) {
    const draggableElements = [
      ...container.querySelectorAll(".carriage:not(.dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.width / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
});

// เหตุการณ์ dragover และ drop สามารถเพิ่มตามตัวอย่างก่อนหน้า
