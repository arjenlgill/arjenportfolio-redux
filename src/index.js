import "./scss/style.scss";

const devTB = document.getElementsByClassName("g-devtool-block")[0];
const devSB = document.getElementsByClassName("g-vscrollbar")[0];

devSB.setAttribute("data-before", "Background");

devTB.addEventListener("mousemove", function (e) {
  const left = e.pageX;
  devSB.style.left = e.pageX + "px";
});

const pgModuleInitial = document.getElementsByClassName("module-initial")[0];
const pgModules = document.querySelectorAll(".g-pg-module");
const pgModuleTriggers = document.querySelectorAll(".g-pg-module-trigger");

const styleClasses = ["g-pg-module-active", "g-opacity"];

const setStyles = (module) => {
  styleClasses.forEach((styleClass) => module.classList.add(styleClass));
};

const removeStyles = (module) => {
  styleClasses.forEach((styleClass) => module.classList.remove(styleClass));
};

function showModuleWhenTriggered(moduleTrigger, listenerType) {
  moduleTrigger.addEventListener(listenerType, function () {
    let moduleTriggerClass;

    moduleTrigger.classList.forEach((triggerClass) => {
      triggerClass.includes("module-") && triggerClass !== "module-initial"
        ? (moduleTriggerClass = triggerClass)
        : null;
    });

    const modules = document.querySelectorAll(`.g-pg-module`);

    modules.forEach((module) => {
      !module.classList.contains(moduleTriggerClass) ? removeStyles(module) : setStyles(module);
    });
  });
}

function initialisePgModule() {
  pgModuleInitial ? setStyles(pgModuleInitial) : null;
}

window.addEventListener("load", () => {
  initialisePgModule();
});

function pgModuleTriggered(listenerType) {
  pgModuleTriggers.forEach((moduleTrigger) => {
    showModuleWhenTriggered(moduleTrigger, listenerType);
  });
}

const vw = window.matchMedia("(max-width: 500px)");

vw.matches ? pgModuleTriggered("touchstart") : pgModuleTriggered("mouseenter");