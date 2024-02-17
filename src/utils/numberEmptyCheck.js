export default function checkEmpty(num) {
    if (isNaN(num) || typeof num === "undefined") return 0;
    else return num;
  }