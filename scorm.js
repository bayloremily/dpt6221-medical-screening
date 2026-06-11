(function () {
  function findApi(win) {
    let currentWindow = win;
    let attempts = 0;

    while (currentWindow && attempts < 10) {
      if (currentWindow.API) {
        return currentWindow.API;
      }

      if (currentWindow.parent && currentWindow.parent !== currentWindow) {
        currentWindow = currentWindow.parent;
      } else {
        break;
      }

      attempts += 1;
    }

    return null;
  }

  const scormHelper = {
    api: null,
    initialized: false,

    initialize() {
      this.api = findApi(window);

      if (!this.api) {
        return false;
      }

      const result = this.api.LMSInitialize("");
      this.initialized = result === "true" || result === true;
      return this.initialized;
    },

    setValue(element, value) {
      if (!this.initialized || !this.api) {
        return false;
      }

      return this.api.LMSSetValue(element, String(value));
    },

    getValue(element) {
      if (!this.initialized || !this.api) {
        return "";
      }

      return this.api.LMSGetValue(element);
    },

    setLessonStatus(status) {
      return this.setValue("cmi.core.lesson_status", status);
    },

    setScore(rawScore, totalQuestions) {
      const percent = totalQuestions > 0 ? Math.round((rawScore / totalQuestions) * 100) : 0;
      this.setValue("cmi.core.score.raw", percent);
      this.setValue("cmi.core.score.max", 100);
      this.setValue("cmi.core.score.min", 0);
    },

    commit() {
      if (!this.initialized || !this.api) {
        return false;
      }

      return this.api.LMSCommit("");
    },

    finish() {
      if (!this.initialized || !this.api) {
        return false;
      }

      const result = this.api.LMSFinish("");
      this.initialized = false;
      return result;
    }
  };

  window.scormHelper = scormHelper;

  window.addEventListener("beforeunload", () => {
    if (window.scormHelper) {
      window.scormHelper.commit();
      window.scormHelper.finish();
    }
  });
})();
