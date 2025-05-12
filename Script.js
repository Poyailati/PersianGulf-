const colors = ["#1e1e1e", "#333", "#444", "#222"];
let index = 0;

function changeColor() {
  index = (index + 1) % colors.length;
  document.body.style.backgroundColor = colors[index];
  showInfo();
}

function showInfo() {
  const info = `
    <h2>مشخصات پژو ELX</h2>
    <ul style="text-align: right;">
      <li>موتور: XU7P</li>
      <li>قدرت: 110 اسب بخار</li>
      <li>ترمز ABS</li>
      <li>شتاب 0 تا 100: حدود 11 ثانیه</li>
      <li>مصرف سوخت: 8 لیتر در 100km</li>
    </ul>
  `;
  document.getElementById("infoBox").innerHTML = info;
}
