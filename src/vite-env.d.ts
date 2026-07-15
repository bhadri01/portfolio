/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Telegram bot token from @BotFather. NOTE: inlined into the bundle at build
   *  time and therefore public on the deployed site — this is not a secret. */
  readonly VITE_TELEGRAM_BOT_TOKEN?: string;
  /** Destination chat for contact-form messages. */
  readonly VITE_TELEGRAM_CHAT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
