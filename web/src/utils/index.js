import strings from "constants/strings";
import validator from "validator";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ar from "javascript-time-ago/locale/ar";

TimeAgo.addLocale(en);
TimeAgo.addLocale(ar);

const timeAgoInstance = { en: new TimeAgo("en"), ar: new TimeAgo("ar") };

export const checkValidity = (value, rules) => {
  let isValid = true;
  let error = null;

  if (rules.required) {
    isValid = value.trim() !== "";
    error = !isValid ? strings.errors.required : error;
  }

  if (rules.number && isValid) {
    isValid = !isNaN(value);
    error = !isValid ? strings.errors.number : error;
  }

  if (rules.minLength && isValid) {
    isValid = value.length >= rules.minLength;
    error = !isValid
      ? rules.number
        ? strings.errors.minLength.numbers
        : strings.errors.minLength.characters
      : error;
    if (error) {
      error.en = error.en.replace("%min%", rules.minLength);
      error.ar = error.ar.replace("%min%", rules.minLength);
    }
  }

  if (rules.maxLength && isValid) {
    isValid = value.length <= rules.maxLength;
    error = !isValid
      ? rules.number
        ? strings.errors.maxLength.numbers
        : strings.errors.maxLength.characters
      : error;
    if (error) {
      error.en = error.en.replace("%max%", rules.maxLength);
      error.ar = error.ar.replace("%max%", rules.maxLength);
    }
  }

  if (rules.phone && isValid) {
    isValid = validator.isMobilePhone(value);
    error = !isValid ? strings.errors.phone : error;
  }

  if (rules.email && isValid) {
    var emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    isValid = emailRegEx.test(value.toLowerCase());
    error = !isValid ? strings.errors.email : error;
  }

  if (rules.password && isValid) {
    var passwordRegEx = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/;
    isValid = passwordRegEx.test(value);
    error = !isValid ? strings.passwordInvalidError : error;
  }

  return error;
};

export const zeroPadding = (number, length = 6) => {
  return (Array(length).join("0") + number).slice(-length);
};

export const translateNumber = (number, lang = "en", hasSlash = false) => {
  if (number) {
    if (lang === "ar") {
      if (hasSlash) {
        number = number.split("/").join("\\");
        return number.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
      } else return number.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
    } else return number.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
  }
};

export const timeSince = (date) => {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  const isPlural = (num) => (num > 1 ? "s" : "");

  if (interval > 1) {
    return Math.floor(interval) + ` year${isPlural(Math.floor(interval))}`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ` month${isPlural(Math.floor(interval))}`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ` day${isPlural(Math.floor(interval))}`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ` hour${isPlural(Math.floor(interval))}`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ` minute${isPlural(Math.floor(interval))}`;
  }
  return Math.floor(seconds) + ` second${isPlural(Math.floor(interval))}`;
};

export const formatAMPM = (timeString, lang = "en") => {
  var hours = parseInt(timeString.split(":")[0]);
  var minutes = parseInt(timeString.split(":")[1]);
  var ampm = "";
  if (lang === "en") {
    ampm = hours >= 12 ? "pm" : "am";
  } else {
    ampm = hours >= 12 ? "م" : "ص";
  }

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;

  var strTime =
    translateNumber(hours.toString(), lang) +
    ":" +
    translateNumber(minutes.toString(), lang) +
    " " +
    ampm;
  return strTime;
};

export const toCamelCase = (str) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

export const getDateString = (date, lang = "en", includeYear = false) => {
  return (
    strings.weekDays[lang][date.getDay()] +
    " " +
    translateNumber(date.getDate().toString(), lang) +
    " " +
    strings.months[lang][date.getMonth()] +
    " " +
    (includeYear
      ? " -" + " " + translateNumber(date.getFullYear().toString(), lang)
      : "")
  );
};

export const translatePhoneNumber = (number, lang = "en") => {
  if (number) {
    if (lang === "ar") {
      number = number.substr(1, number.length) + "+";
      return number.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
    } else return number.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
  }
};

export const msToTime = (s) => {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  return mins + ":" + zeroPadding(secs, 2);
};

export const timeAgo = (date, lang) =>
  translateNumber(timeAgoInstance[lang].format(date), lang);

export const generateRandomString = (size = 2) => {
  let s4 = () => {
    return Math.floor((1 + Math.random() * Date.now()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  let id = "";
  for (var i = 0; i < size; i++) id += s4();
  return id;
};

export const toDataURL = (url, callback) => {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
};

export const getDirectionFromString = (str) => {
  let arabic = /[\u0600-\u06FF]/; // arabic unicode range
  return arabic.test(str) ? "rtl" : "ltr";
};
