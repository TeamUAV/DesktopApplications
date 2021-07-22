const el = document.querySelector(".image");
let isResizing = false;
el.addEventListener("mousedown", dragElement);

let viewport = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0
};           

function dragElement(e) {
  viewport.bottom = window.innerHeight;
  viewport.top = 0;
  viewport.left = 0;
  viewport.right = window.innerWidth;
  window.addEventListener("mousemove", elementDrag);
  window.addEventListener("mouseup", closeDragElement);

  let prevPosx = e.clientX;
  let prevPosy = e.clientY;

  function elementDrag(e) {
    if (!isResizing) {
      let newPosx = prevPosx - e.clientX;
      let newPosy = prevPosy - e.clientY;

      const rect = el.getBoundingClientRect();

      let newLeft = el.offsetLeft - newPosx;
      let newTop = el.offsetTop - newPosy;

      if (newLeft > viewport.left &&
        newTop > viewport.top &&
        newLeft + rect.width < viewport.right &&
        newTop + rect.height + 55 < viewport.bottom
      ) {
        el.style.left = newLeft + "px";
        el.style.top = newTop + "px";
      }
        prevPosx = e.clientX;
        prevPosy = e.clientY;

      }
    }

    function closeDragElement() {
      window.removeEventListener("mousemove", elementDrag);
      window.removeEventListener("mouseup", closeDragElement);
    }
  }

  const rsz = document.querySelector(".resize");

  rsz.addEventListener("mousedown", resizeElement);
  function resizeElement(e) {
    isResizing = true;

    let prevPosX = e.clientX;
    let prevPosY = e.clientY;

    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", closeResize);

    function resize(e) {
      const rect = el.getBoundingClientRect();



      let newLeft = el.offsetLeft;
      let newTop = el.offsetTop;

      if (newLeft < viewport.left ||
        newTop < viewport.top ||
        newLeft + rect.width > viewport.right ||
        newTop + rect.height > viewport.bottom
      ) {
        console.log("....")
      }
      else {
        el.style.width = rect.width + (prevPosX - e.clientX) + "px";
        el.style.height = rect.height + (prevPosY - e.clientY) + "px";
        el.style.top = rect.top - (prevPosY - e.clientY) + "px";
        el.style.left = rect.left - (prevPosX - e.clientX) + "px";
      }

      prevPosX = e.clientX;
      prevPosY = e.clientY;
    }

    function closeResize() {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", closeResize);
      isResizing = false;
    }
  }




