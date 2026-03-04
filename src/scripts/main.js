import FlipDown from "./vendor/flipDown.js";
import SlimSelect from "slim-select";
import Swiper from "swiper";

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
      slidesPerView: "auto",
      freeMode: true,
    });
  };

  initFlipDown();
  initFilters();
  checkForm();
  initHeroSlider();
});
