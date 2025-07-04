const countryList = {
  AED: "AE", AFN: "AF", XCD: "AG", ALL: "AL", AMD: "AM", ANG: "AN", AOA: "AO", AQD: "AQ", ARS: "AR", AUD: "AU", AZN: "AZ", BAM: "BA", BBD: "BB", BDT: "BD", XOF: "BE", BGN: "BG", BHD: "BH", BIF: "BI", BMD: "BM", BND: "BN", BOB: "BO", BRL: "BR", BSD: "BS", NOK: "BV", BWP: "BW", BYR: "BY", BZD: "BZ", CAD: "CA", CDF: "CD", XAF: "CF", CHF: "CH", CLP: "CL", CNY: "CN", COP: "CO", CRC: "CR", CUP: "CU", CVE: "CV", CYP: "CY", CZK: "CZ", DJF: "DJ", DKK: "DK", DOP: "DO", DZD: "DZ", ECS: "EC", EEK: "EE", EGP: "EG", ETB: "ET", EUR: "FR", FJD: "FJ", FKP: "FK", GBP: "GB", GEL: "GE", GGP: "GG", GHS: "GH", GIP: "GI", GMD: "GM", GNF: "GN", GTQ: "GT", GYD: "GY", HKD: "HK", HNL: "HN", HRK: "HR", HTG: "HT", HUF: "HU", IDR: "ID", ILS: "IL", INR: "IN", IQD: "IQ", IRR: "IR", ISK: "IS", JMD: "JM", JOD: "JO", JPY: "JP", KES: "KE", KGS: "KG", KHR: "KH", KMF: "KM", KPW: "KP", KRW: "KR", KWD: "KW", KYD: "KY", KZT: "KZ", LAK: "LA", LBP: "LB", LKR: "LK", LRD: "LR", LSL: "LS", LTL: "LT", LVL: "LV", LYD: "LY", MAD: "MA", MDL: "MD", MGA: "MG", MKD: "MK", MMK: "MM", MNT: "MN", MOP: "MO", MRO: "MR", MTL: "MT", MUR: "MU", MVR: "MV", MWK: "MW", MXN: "MX", MYR: "MY", MZN: "MZ", NAD: "NA", XPF: "NC", NGN: "NG", NIO: "NI", NPR: "NP", NZD: "NZ", OMR: "OM", PAB: "PA", PEN: "PE", PGK: "PG", PHP: "PH", PKR: "PK", PLN: "PL", PYG: "PY", QAR: "QA", RON: "RO", RSD: "RS", RUB: "RU", RWF: "RW", SAR: "SA", SBD: "SB", SCR: "SC", SDG: "SD", SEK: "SE", SGD: "SG", SKK: "SK", SLL: "SL", SOS: "SO", SRD: "SR", STD: "ST", SVC: "SV", SYP: "SY", SZL: "SZ", THB: "TH", TJS: "TJ", TMT: "TM", TND: "TN", TOP: "TO", TRY: "TR", TTD: "TT", TWD: "TW", TZS: "TZ", UAH: "UA", UGX: "UG", USD: "US", UYU: "UY", UZS: "UZ", VEF: "VE", VND: "VN", VUV: "VU", YER: "YE", ZAR: "ZA", ZMK: "ZM", ZWD: "ZW"
};

const fromSelect = document.querySelector('.fromcontainer select');
const toSelect = document.querySelector('.tocontainer select');
const amountInput = document.querySelector('input[type="number"]');
const getRatesBtn = document.getElementById("getRatesBtn");
const exchangeMsg = document.querySelector('.exchange');

// Populate select options
function populateSelectOptions(selectElement) {
  selectElement.innerHTML = "";
  Object.keys(countryList).forEach(code => {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = code;
    selectElement.appendChild(option);
  });
}
populateSelectOptions(fromSelect);
populateSelectOptions(toSelect);

// Set default values
fromSelect.value = "USD";
toSelect.value = "INR";

// Fetch and display exchange rate
async function getExchangeRate() {
  const fromCurrency = fromSelect.value;
  const toCurrency = toSelect.value;
  let amount = amountInput.value;
  if (!amount || amount <= 0) {
    amount = 1;
    amountInput.value = 1;
  }
  exchangeMsg.innerText = "Getting exchange rate...";

  // Use ExchangeRate-API (replace YOUR_API_KEY with your real key)
  const url = ` `;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    if (data.result === "success") {
      const rate = data.conversion_rates[toCurrency];
      if (rate) {
        const total = (amount * rate).toFixed(2);
        exchangeMsg.innerText = `${amount} ${fromCurrency} = ${total} ${toCurrency}`;
      } else {
        exchangeMsg.innerText = "Exchange rate not available.";
      }
    } else {
      exchangeMsg.innerText = "Exchange rate not available.";
    }
  } catch (err) {
    exchangeMsg.innerText = "Failed to fetch exchange rate.";
  }
}

getRatesBtn.addEventListener("click", getExchangeRate);