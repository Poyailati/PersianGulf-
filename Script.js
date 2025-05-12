let colors = ["#1e1e1e", "#2c3e50", "#34495e", "#7f8c8d", "#000000", "#3b3b3b"];
let colorIndex = 0;

function changeColor() {
  colorIndex = (colorIndex + 1) % colors.length;
  document.body.style.backgroundColor = colors[colorIndex];
}

function showInfo() {
  const box = document.getElementById("infoBox");
  if (box.style.display === "none" || box.style.display === "") {
    box.innerHTML = getCarInfo();
    box.style.display = "block";
  } else {
    box.style.display = "none";
  }
}

function getCarInfo() {
  return `
    <h2>مشخصات پژو پارس ELX</h2>
    <ul>
      <li>موتور: 1.8 یا 2.0 لیتر</li>
      <li>قدرت: 105-110 اسب بخار</li>
      <li>گیربکس: دستی 5 دنده</li>
      <li>شتاب 0 تا 100: حدود 11 ثانیه</li>
      <li>مصرف سوخت ترکیبی: حدود 8 لیتر در 100 کیلومتر</li>
      <li>سیستم تهویه مطبوع: اتوماتیک</li>
      <li>کیسه هوا: راننده و سرنشین</li>
      <li>ترمز ABS + EBD</li>
    </ul>
  `;
}

// انیمیشن خودکار عنوان
let title = document.getElementById("title");
let colorsTitle = ["gold", "orange", "red", "yellow"];
let i = 0;
setInterval(() => {
  title.style.color = colorsTitle[i % colorsTitle.length];
  i++;
}, 1000);

// افکت آرام باز شدن عکس
window.onload = () => {
  const img = document.getElementById("carImage");
  img.style.opacity = 0;
  let opacity = 0;
  let interval = setInterval(() => {
    opacity += 0.02;
    img.style.opacity = opacity;
    if (opacity >= 1) clearInterval(interval);
  }, 30);
};

// کد نمایشی شمارنده اسب بخار
let bhp = 0;
setInterval(() => {
  if (bhp < 110) {
    bhp++;
    if (document.getElementById("infoBox").style.display === "block") {
      document.getElementById("infoBox").querySelector("ul").children[1].innerText = "قدرت: " + bhp + " اسب بخار";
    }
  }
}, 100);
