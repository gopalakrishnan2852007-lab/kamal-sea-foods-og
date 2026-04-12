/**
 * Robust WhatsApp link generation utility.
 * Uses Unicode escapes to ensure characters are preserved across different environments.
 */

export const SYMBOLS = {
  WAVE: '\uD83D\uDC4B',      // 👋
  BULLET: '\u2022',          // •
  CROSS: '\u00D7',           // ×
  SCOOTER: '\uD83D\uDEF4',   // 🛵
  CART: '\uD83D\uDED2',      // 🛒
  PACKAGE: '\uD83D\uDCE6',   // 📦
  TRUCK: '\uD83D\uDE9A',     // 🚚
  GREEN_HEART: '\uD83D\uDC9A', // 💚
  ALERT: '\uD83D\uDEA8',     // 🚨
  BUS: '\uD83D\uDE8C',       // 🚌
  PRAY: '\uD83D\uDE4F',      // 🙏
  FISH: '\uD83D\uDC1F',      // 🐟
  SCALE: '\u2696\uFE0F',     // ⚖️
  STORE: '\uD83C\uDFEA',     // 🏪
  CHAT: '\uD83D\uDCAC'       // 💬
};

export const WHATSAPP_NUMBER = "919865668125";

/**
 * Encodes a message for WhatsApp URL.
 * @param {string} message 
 * @returns {string}
 */
export const encodeWhatsAppMessage = (message) => {
  return encodeURIComponent(message)
    .replace(/'/g, '%27')
    .replace(/!/g, '%21')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A'); // WhatsApp uses * for bold, but sometimes we want to encode it if it's literal
};

/**
 * Generates a wa.me link.
 * @param {string} message 
 * @returns {string}
 */
export const getWhatsAppLink = (message) => {
  const encoded = encodeWhatsAppMessage(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
};

/**
 * Opens WhatsApp link in a new tab.
 * @param {string} message 
 */
export const openWhatsApp = (message) => {
  window.open(getWhatsAppLink(message), '_blank');
};
