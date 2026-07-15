/**
 * Contact form → Telegram.
 *
 * The bot token is read from VITE_TELEGRAM_BOT_TOKEN, which Vite inlines into
 * the bundle at build time — so it is PUBLIC on the deployed site. That's
 * inherent to calling the Bot API straight from the browser: a bot token can't
 * be scoped to an origin and has no read-only mode.
 *
 * Blast radius is this bot alone. Someone who lifts the token can spam the
 * destination chat or reconfigure the bot; visitors' submissions are not
 * exposed, since those travel bot → owner and getUpdates only returns messages
 * sent *to* the bot. If it gets abused: revoke in @BotFather, issue a new
 * token, redeploy.
 */

/** Telegram's HTML parse_mode only requires these three to be escaped. */
const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Formats a submission for Telegram's HTML parse_mode. */
export function buildTelegramMessage(name: string, email: string, message: string) {
  return [
    "<b>New message from bha3.me</b>",
    "",
    `<b>From:</b> ${escapeHtml(name.trim() || "Anonymous")}`,
    `<b>Email:</b> ${escapeHtml(email.trim() || "not provided")}`,
    "",
    escapeHtml(message.trim()),
  ].join("\n");
}

/** True when both env vars are present, i.e. delivery is actually wired up. */
export const telegramConfigured = () =>
  Boolean(import.meta.env.VITE_TELEGRAM_BOT_TOKEN && import.meta.env.VITE_TELEGRAM_CHAT_ID);

/** Posts the message. Resolves true only when Telegram confirms `ok`. */
export async function sendToTelegram(name: string, email: string, message: string) {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: buildTelegramMessage(name, email, message),
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
  const data = await res.json();
  return data.ok === true;
}
