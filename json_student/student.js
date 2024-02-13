let weekCount = 4;
let attendanceData = []; // เพิ่มตัวแปรนี้

// ฟังก์ชันโหลดข้อมูลจากไฟล์ JSON และแสดงบนหน้าเว็บ
function loadAttendanceData() {
  fetch("student_attendance.json") // ตรงนี้ให้เปลี่ยนเส้นทางไฟล์ให้ถูกต้อง
    .then((response) => response.json())
    .then((data) => {
      attendanceData = data; // อัพเดทข้อมูลในตัวแปร attendanceData
      const listContainer = document.getElementById("attendance-list");
      data.forEach((student) => {
        const studentRow = document.createElement("tr");
        studentRow.innerHTML = `<td>${student["รหัสประจำตัว"]}</td>
                          <td>${student["ชื่อ"]}</td>
                          <td class="week1" onclick="toggleAttendance(this)">${student["สัปดาห์1"]}</td>
                          <td class="week2" onclick="toggleAttendance(this)">${student["สัปดาห์2"]}</td>
                          <td class="week3" onclick="toggleAttendance(this)">${student["สัปดาห์3"]}</td>
                          <td class="week4" onclick="toggleAttendance(this)">${student["สัปดาห์4"]}</td>`;
        listContainer.appendChild(studentRow);
      });
    })
    .catch((error) => console.error("Error loading the data:", error));
}

// เปลี่ยนสถานะการเข้าเรียนเมื่อคลิก
function toggleAttendance(cell) {
  const rowIndex = cell.parentNode.rowIndex - 1; // หา index ของแถวในตาราง (ลบ 1 เพื่อปรับให้ index เริ่มต้นที่ 0)
  const colIndex = cell.cellIndex - 2; // หา index ของคอลัมน์ในตาราง (ลบ 2 เพื่อปรับให้ index เริ่มต้นที่ 0)

  if (cell.textContent === "เข้าเรียน") {
    cell.textContent = "ขาดเรียน";
    cell.classList.remove("present");
    cell.classList.add("absent");
    attendanceData[rowIndex][`สัปดาห์${colIndex + 1}`] = "ขาดเรียน"; // อัพเดทข้อมูลใน attendanceData
  } else if (cell.textContent === "ขาดเรียน") {
    cell.textContent = "เข้าเรียน";
    cell.classList.remove("absent");
    cell.classList.add("present");
    attendanceData[rowIndex][`สัปดาห์${colIndex + 1}`] = "เข้าเรียน"; // อัพเดทข้อมูลใน attendanceData
  }
}

// เพิ่มสัปดาห์
function addWeek() {
  weekCount++;
  const tableHead = document.querySelector("thead tr");
  const tableBody = document.querySelector("tbody");

  // เพิ่มสัปดาห์ในส่วนหัวของตาราง
  const newWeekHeader = document.createElement("th");
  newWeekHeader.textContent = `สัปดาห์${weekCount}`;
  tableHead.appendChild(newWeekHeader);

  // เพิ่มเซลล์สำหรับสัปดาห์ใหม่ในแต่ละแถวของตาราง
  const students = tableBody.querySelectorAll("tr");
  students.forEach((studentRow) => {
    const newWeekCell = document.createElement("td");
    newWeekCell.classList.add(`week${weekCount}`);
    newWeekCell.onclick = function () {
      toggleAttendance(this);
    };
    newWeekCell.textContent = "เข้าเรียน";
    studentRow.appendChild(newWeekCell);
    attendanceData[studentRow.rowIndex - 1][`สัปดาห์${weekCount}`] =
      "เข้าเรียน"; // อัพเดทข้อมูลใน attendanceData
  });
}

function exportData() {
  const dataToExport = JSON.stringify(attendanceData);
  const blob = new Blob([dataToExport], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "student_attendance.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// เรียกใช้ฟังก์ชันเมื่อหน้าเว็บโหลดเสร็จสมบูรณ์
window.onload = loadAttendanceData;
