import FlipDown from "./vendor/flipDown.js";
import SlimSelect from "slim-select";
import Swiper from "swiper";
import { Autoplay } from "swiper/modules";

import "slim-select/styles";
import "flipdown/dist/flipdown.css";
import "swiper/css";

document.addEventListener("DOMContentLoaded", () => {
  const initFlipDown = () => {
    const el = document.getElementById("flipdown");

    if (!el) return;

    const endDate = new Date(el.dataset.end).getTime() / 1000;

    const flipdown = new FlipDown(endDate);

    flipdown.start();
  };

  const initFilters = () => {
    document.querySelectorAll(".js-select").forEach((select) => {
      new SlimSelect({
        select: select,
        settings: {
          search: true,
        },
      });
    });
  };

  function checkForm() {
    const form = document.querySelector(".form__form");

    if (!form) return;

    const inputs = form.querySelectorAll("input");
    const submitBtn = form.querySelector(".form__submit");
    let isFilled = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        isFilled = false;
      }
    });

    submitBtn.classList.toggle("form__submit--active", isFilled);

    inputs.forEach((input) => {
      input.addEventListener("input", checkForm);
    });
  }
  const initHeroSlider = () => {
    const slider = document.querySelector(".hero__list");
    if (!slider) return;

    const swiper = new Swiper(slider, {
      modules: [Autoplay],

      slidesPerView: "auto",
      freeMode: true,
      loop: true,
      speed: 4000,

      autoplay: {
        delay: 1,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: "auto",
        },
      },

      on: {
        init(swiper) {
          if (window.innerWidth >= 1024) {
            swiper.autoplay.stop();
          }
        },
        resize(swiper) {
          if (window.innerWidth >= 1024) {
            swiper.autoplay.stop();
          } else {
            swiper.autoplay.start();
          }
        },
      },
    });
  };

  initFlipDown();
  initFilters();
  checkForm();
  initHeroSlider();
});
