const themeKey = "martim-barber-theme";
const root = document.documentElement;
const themeSwitches = document.querySelectorAll("[data-theme-choice]");
const themeColor = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme) {
  root.dataset.theme = theme;
  themeSwitches.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.themeChoice === theme));
  });
  themeColor.content = theme === "dark" ? "#111111" : "#f8f8f8";
}

const savedTheme = localStorage.getItem(themeKey);
applyTheme(savedTheme === "light" ? "light" : "dark");

themeSwitches.forEach((button) => {
  button.addEventListener("click", () => {
    const theme = button.dataset.themeChoice;
    if (theme !== "dark" && theme !== "light") {
      return;
    }

    localStorage.setItem(themeKey, theme);
    applyTheme(theme);
  });
});
