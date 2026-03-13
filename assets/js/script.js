//// loader
function hideLoader() {
    const l = document.getElementById('loader');
    l.classList.add('hide');
    setTimeout(() => {
      l.style.display = 'none';
      document.getElementById('page').classList.add('show');
    }, 500);
  }
 
  // arcs finish at ~2.05+0.42 = 2.47s, add buffer
  setTimeout(hideLoader, 3000);
 
  function replayLoader() {
    const l = document.getElementById('loader');
    l.style.cssText = 'display:flex; opacity:1; transform:none;';
    l.classList.remove('hide');
    document.getElementById('page').classList.remove('show');
 
    // l.querySelectorAll('.g-text, .g-dot, .g-card, .g-arc1, .g-arc2, .g-arc3, .g-arc4, .bar-wrap, .bar-fill')
    //   .forEach(el => {
    //     el.style.animation = 'none';
    //     el.offsetHeight; // reflow
    //     el.style.animation = '';
    //   });
 
    setTimeout(hideLoader, 3000);
  }
/// END pre loader


// nav scroll
$(document).ready(function(){
  var docEl = $(document),
      headerEl = $('header'),
      headerWrapEl = $('.main-header-in'),
      navEl = $('nav'),
      linkScroll = $('.scroll');

  docEl.on('scroll', function(){
    if ( docEl.scrollTop() > 60 ){
      headerEl.addClass('fixed-to-top');
      headerWrapEl.addClass('fixed-to-top');
      navEl.addClass('fixed-to-top');
    }
    else {
      headerEl.removeClass('fixed-to-top');
      headerWrapEl.removeClass('fixed-to-top');
      navEl.removeClass('fixed-to-top');
    }
  });

  linkScroll.click(function(e){
      e.preventDefault();
      $('body, html').animate({
         scrollTop: $(this.hash).offset().top
      }, 500);
   });
});

// nav mobile 
var t1 = new TimelineMax({
  paused: true
});
t1.to(".nav-container", 1, {
  left: 0,
  ease: Expo.easeInOut
});
t1.staggerFrom(
  ".menu > div",
  0.8, {
    y: 100,
    opacity: 0,
    ease: Expo.easeOut
  },
  0.1,
  "-=0.4"
);
// animate buttons
t1.staggerFrom(
  ".mob-btn",
  0.8,
  {
    y: 80,
    opacity: 0,
    ease: Expo.easeOut
  },
  0.2,
  "-=0.4"
);
t1.reverse();
$(".menu-toggle").click(function () {
  $(this).toggleClass("active"); // hamburger animation
  t1.reversed(!t1.reversed()); // popup open close
  return false;
});

// clients 
document.addEventListener("DOMContentLoaded", function () {
  $('.client-slider').owlCarousel({
    items: 3,
    margin: 10,
    lazyLoad: true,
    dots: true,
    loop: true,
    autoplay: true,
    autoPlayTimeout: 3000,
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 3,
      },
      600: {
        items: 4,
      },
      1200: {
        items: 5,
      },
      1000: {
        items: 6,
      }
    }
  });
});

// card-slider
$(document).ready(function () {
  $('.card-slider').owlCarousel({
    loop: true,
    margin: 20,
    dots: true,
    nav: true,
    autoplay: true,
    autoplayTimeout: 3000,
    smartSpeed: 800,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      992: {
        items: 3
      }
    }
  });
});

/* <!-- ==================== Reveal type ==================== --> */
gsap.registerPlugin(ScrollTrigger);

const splitTypes = document.querySelectorAll('.reveal-type');

splitTypes.forEach((char, i) => {
    const bg = char.dataset.bgColor;
    const fg = char.dataset.fgColor;

    // Split into words first to prevent breakage
    const text = new SplitType(char, {
        types: 'words, chars' // First split into words, then into characters
    });

    // Ensure words stay together by using `white-space: nowrap`
    gsap.set(text.words, {
        display: 'inline-block',
        whiteSpace: 'nowrap'
    });

    gsap.fromTo(text.chars, {
        color: bg,
    }, {
        color: fg,
        duration: 0.3,
        stagger: 0.02,
        scrollTrigger: {
            trigger: char,
            start: 'top 90%',
            end: 'bottom 40%',
            scrub: true,
            markers: false,
            toggleActions: 'play play reverse reverse'
        }
    });
});

/* <!-- ==================== Reveal type ==================== --> */

// return scroll
$(document).ready(function(){ 
    $(window).scroll(function(){ 
        if ($(this).scrollTop() > 100) { 
            $('#scroll').fadeIn(); 
        } else { 
            $('#scroll').fadeOut(); 
        } 
    }); 
    $('#scroll').click(function(){ 
        $("html, body").animate({ scrollTop: 0 }, 600); 
        return false; 
    }); 
});


/// otp
document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(".otp-inputs input");
  const timerEl = document.getElementById("timer");
  const resendBtn = document.getElementById("resend");
  const submitBtn = document.getElementById("submitOtp");

  // 🚫 Stop script if OTP section not on page
  if (!inputs.length) return;

  // Focus first input
  inputs[0].focus();

  // Handle input behavior
  inputs.forEach((input, index) => {

    // Allow only numbers
    input.addEventListener("input", (e) => {
      input.value = input.value.replace(/[^0-9]/g, "");

      if (input.value && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    // Backspace support
    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && index > 0) {
        inputs[index - 1].focus();
      }
    });

    // Paste support
    input.addEventListener("paste", (e) => {
      e.preventDefault();
      const data = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
      const digits = data.split("");

      inputs.forEach((inp, i) => {
        inp.value = digits[i] || "";
      });

      const lastFilled = Math.min(digits.length, inputs.length) - 1;
      if (lastFilled >= 0) {
        inputs[lastFilled].focus();
      }
    });

  });

  // ⏳ Countdown Timer
  if (timerEl) {
    let time = 150;
    let countdown = startTimer();

    function startTimer() {
      return setInterval(() => {
        let min = Math.floor(time / 60);
        let sec = time % 60;

        timerEl.textContent = `${min}:${sec < 10 ? "0" : ""}${sec}`;
        time--;

        if (time < 0) {
          clearInterval(countdown);
          timerEl.textContent = "Expired";
        }
      }, 1000);
    }

    // 🔁 Resend OTP
    if (resendBtn) {
      resendBtn.addEventListener("click", function (e) {
        e.preventDefault();
        time = 150;
        clearInterval(countdown);
        countdown = startTimer();
        alert("OTP Resent");
      });
    }
  }

  // ✅ Submit OTP
  if (submitBtn) {
    submitBtn.addEventListener("click", function () {
      const otp = Array.from(inputs).map(input => input.value).join("");

      if (otp.length < inputs.length) {
        alert("Please enter complete OTP");
        return;
      }

      console.log("OTP Submitted:", otp);
      // You can send OTP to server here
    });
  }

});

// form dropdown
document.addEventListener('DOMContentLoaded', function () {
    const selects = document.querySelectorAll('.floating-label2 select');
    selects.forEach(select => {
      const wrapper = select.closest('.floating-label2');
      function updateLabel() {
        if (select.value) {
          wrapper.classList.add('has-value');
        } else {
          wrapper.classList.remove('has-value');
        }
      }
      // Initial load
      updateLabel();
      // On change
      select.addEventListener('change', updateLabel);
    });
});

// compare view table
document.addEventListener("DOMContentLoaded", function () {
  const headerTHs = document.querySelectorAll(".table-head th[data-col]");
  const tables = document.querySelectorAll(".sticky-table");

  if (!tables.length) return;

  function clearAllTables() {
    tables.forEach(table => {
      table.querySelectorAll("td").forEach(td => {
        td.classList.remove("col-active", "col-hover");
      });
    });
  }
  function highlightColumn(colIndex, className) {
    tables.forEach(table => {
      table.querySelectorAll("tbody tr").forEach(row => {
        const td = row.children[colIndex - 1];
        if (td && !td.classList.contains("feature-name")) {
          td.classList.add(className);
        }
      });
    });
  }
  headerTHs.forEach(th => {
    const col = parseInt(th.dataset.col);
    const inner = th.querySelector(".table-head-inner");

    // CLICK → ACTIVE COLUMN
    th.addEventListener("click", () => {
      document.querySelectorAll(".table-head-inner")
        .forEach(el => el.classList.remove("active"));

      clearAllTables();
      inner?.classList.add("active");
      highlightColumn(col, "col-active");
    });

    // HOVER → TEMP COLUMN
    th.addEventListener("mouseenter", () => {
      if (!inner?.classList.contains("active")) {
        highlightColumn(col, "col-hover");
      }
    });

    th.addEventListener("mouseleave", () => {
      tables.forEach(table => {
        table.querySelectorAll(".col-hover")
          .forEach(td => td.classList.remove("col-hover"));
      });
    });
  });
  // Default active column (Business)
  document.querySelector('.table-head th[data-col="4"]')?.click();
});

// login signup 
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.hash === "#signup") {
    const signupTab = new bootstrap.Tab(
      document.querySelector('#profile-tab')
    );
    signupTab.show();
  }
});

//qr-code generator
const tabTitles = {
  URL: {
    title: 'URL',
    label: 'URL',
    placeholder: 'www.yourweburl.com',
    type: 'url'
  },
  Email: {
    title: 'Email',
    label: 'Email',
    placeholder: 'hello@example.com',
    type: 'email'
  },
  Text: {
    title: 'Text',
    label: 'Text',
    placeholder: 'Enter your text here...',
    type: 'text'
  },
  Phone: {
    title: 'Phone',
    label: 'Phone',
    placeholder: '+1 234 567 8900',
    type: 'tel'
  },
};

function setTab(el, type) {
  document.querySelectorAll('.qr-type').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const cfg = tabTitles[type];
  document.getElementById('form-title').textContent = cfg.title; // ← needs id="form-title" on h4
  document.getElementById('input-label').textContent = cfg.label;
  document.getElementById('qr-input').placeholder = cfg.placeholder;
  document.getElementById('qr-input').type = cfg.type; // ← also updates input type
  document.getElementById('qr-input').value = '';
}

function setTab(el, type) {
  document.querySelectorAll('.qr-type').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const cfg = tabTitles[type];
  // update h4 title
  const formTitle = document.getElementById('form-title');
  if (formTitle) formTitle.textContent = cfg.title;
  // update label
  const inputLabel = document.getElementById('input-label');
  if (inputLabel) inputLabel.textContent = cfg.label;
  // update placeholder ← this is likely what's failing
  const qrInput = document.getElementById('qr-input');
  if (qrInput) {
    qrInput.placeholder = cfg.placeholder;
    qrInput.value = '';
  }
  console.log('Tab set to:', type, cfg); // ← add this to debug
}
let qrInstance = null;

function generateQR() {
  const val = document.getElementById('qr-input').value.trim();
  const color = document.getElementById('qr-color').value;
  const round = document.querySelector('input[name="qr-type"]:checked').value === 'round';
  if (!val) {
    document.getElementById('qr-input').focus();
    document.getElementById('qr-input').style.borderColor = '#e74c3c';
    setTimeout(() => document.getElementById('qr-input').style.borderColor = '', 1500);
    return;
  }
  const wrap = document.getElementById('qrcode');
  wrap.innerHTML = '';
  qrInstance = new QRCode(wrap, {
    text: val,
    width: 170,
    height: 170,
    colorDark: color,
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H,
  });
  // Apply border-radius for round style
  if (round) {
    setTimeout(() => {
      const canvas = wrap.querySelector('canvas');
      if (canvas) canvas.style.borderRadius = '12px';
    }, 100);
  }
  document.getElementById('download-btn').style.display = 'flex';
}

function downloadQR() {
  const canvas = document.querySelector('#qrcode canvas');
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = 'qrcode.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}





