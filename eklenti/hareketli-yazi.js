(function () {
  "use strict";

  function initZanvielleMarquee() {
    // Daha önce eklenmişse tekrar oluşturma
    if (document.getElementById("zanvielle-moving-text")) return;

    var header = document.querySelector("header");
    if (!header) return;

    var style = document.createElement("style");

    style.id = "zanvielle-moving-text-style";
    style.textContent = `
      #zanvielle-moving-text {
        width: 100%;
        overflow: hidden;
        background: #f7f2e8;
        border-top: 1px solid rgba(143, 110, 62, 0.14);
        border-bottom: 1px solid rgba(143, 110, 62, 0.14);
        height: 38px;
        display: flex;
        align-items: center;
        position: relative;
        z-index: 20;
      }

      #zanvielle-moving-text .zmt-track {
        display: flex;
        width: max-content;
        white-space: nowrap;
        animation: zanvielleMarquee 28s linear infinite;
        will-change: transform;
      }

      #zanvielle-moving-text .zmt-item {
        display: inline-flex;
        align-items: center;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 1.7px;
        color: #6f593b;
        padding: 0 30px;
      }

      #zanvielle-moving-text .zmt-dot {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #b79a6b;
        margin-left: 30px;
        display: inline-block;
      }

      @keyframes zanvielleMarquee {
        from {
          transform: translateX(0);
        }

        to {
          transform: translateX(-50%);
        }
      }

      @media (max-width: 600px) {
        #zanvielle-moving-text {
          height: 34px;
        }

        #zanvielle-moving-text .zmt-item {
          font-size: 9px;
          letter-spacing: 1.35px;
          padding: 0 20px;
        }

        #zanvielle-moving-text .zmt-dot {
          margin-left: 20px;
          width: 3px;
          height: 3px;
        }

        #zanvielle-moving-text .zmt-track {
          animation-duration: 24s;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        #zanvielle-moving-text .zmt-track {
          animation: none;
          transform: none;
        }
      }
    `;

    document.head.appendChild(style);

    var ticker = document.createElement("div");
    ticker.id = "zanvielle-moving-text";

    var messages = [
      "ÜCRETSİZ KARGO",
      "ZANVIELLE EXTRAIT DE PARFUM",
      "PREMİUM KALİTE",
      "GÜVENLİ ALIŞVERİŞ",
      "YENİ KOLEKSİYONU KEŞFET"
    ];

    function createItems() {
      var html = "";

      messages.forEach(function (message) {
        html +=
          '<span class="zmt-item">' +
          message +
          '<span class="zmt-dot"></span>' +
          "</span>";
      });

      return html;
    }

    // İki kez ekliyoruz ki hareket kesintisiz devam etsin.
    ticker.innerHTML =
      '<div class="zmt-track">' +
      createItems() +
      createItems() +
      "</div>";

    // Header'ın hemen altına ekle.
    header.insertAdjacentElement("afterend", ticker);
  }

  // Sayfa tamamen hazır olduğunda çalıştır.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initZanvielleMarquee);
  } else {
    initZanvielleMarquee();
  }
})();
