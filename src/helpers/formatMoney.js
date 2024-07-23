export function scientificToDecimal(num) {
  try {
    num = String(num).replace(/\,/g, "");
    const sign = Math.sign(num);
    //if the number is in scientific notation remove it
    if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
      const zero = "0";
      const parts = String(num).toLowerCase().split("e"); //split into coeff and exponent
      const e = parts.pop() ; //store the exponential part
      let l = Math.abs(e); //get the number of zeros
      const direction = e / l; // use to determine the zeroes on the left or right
      const coeff_array = parts[0].split(".");

      if (direction === -1) {
        coeff_array[0] = Math.abs(Number(coeff_array[0]));
        num = zero + "." + new Array(l).join(zero) + coeff_array.join("");
      } else {
        const dec = coeff_array[1];
        if (dec) l = l - dec.length;
        num = coeff_array.join("") + new Array(l + 1).join(zero);
      }
    }

    if (sign < 0) {
      num = -num;
    }

    return num;
  } catch (err) {
    console.log("err", err);
    return 0;
  }
}

export const formatMoney = (value, decimal) => {
  if (value == undefined || value === "") {
    return "";
  }
  if (value === 0) {
    return 0;
  }
  // value = String(value).replace(/^0+/, "");
  value = String(value).replace(/\s/g, "");
  value = scientificToDecimal(value);
  var x = value.toString().split(".");
  var result = x[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
  const replaceComma = Number(result.replace(/\,/g, ""));
  const replaceNumberZero = String(replaceComma).replace(
    /\B(?=(?:\d{3})+(?!\d))/g,
    ",",
  );

  if (x.length > 1) {
    if (decimal && x[1].length > decimal) {
      const cutWithDecimal = x[1].slice(0, decimal);
      if (!x[0]) {
        return "0" + "." + cutWithDecimal;
      } else return replaceNumberZero + "." + cutWithDecimal;
    } else {
      if (!x[0]) {
        return "0" + "." + x[1];
      } else return replaceNumberZero + "." + x[1];
    }
  }
  return replaceNumberZero;
};

