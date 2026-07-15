import { describe, expect, it } from "vitest";
import { buildTelegramMessage } from "./telegram";

describe("buildTelegramMessage", () => {
  it("includes the sender, their email and the message body", () => {
    const out = buildTelegramMessage("Ada", "ada@example.com", "Are you free for a chat?");
    expect(out).toContain("Ada");
    expect(out).toContain("ada@example.com");
    expect(out).toContain("Are you free for a chat?");
  });

  it("labels the blanks rather than sending empty fields", () => {
    const out = buildTelegramMessage("", "", "hi");
    expect(out).toContain("Anonymous");
    expect(out).toContain("not provided");
  });

  // Telegram rejects the whole request with 400 if HTML parse_mode hits an
  // unescaped tag — so a visitor typing "<script>" would silently lose their
  // message. Escaping is what keeps delivery working, not a security control.
  it("escapes HTML so angle brackets can't break parse_mode", () => {
    const out = buildTelegramMessage("<b>Bob</b>", "a&b@x.com", "1 < 2 && 3 > 2");
    expect(out).toContain("&lt;b&gt;Bob&lt;/b&gt;");
    expect(out).toContain("a&amp;b@x.com");
    expect(out).toContain("1 &lt; 2 &amp;&amp; 3 &gt; 2");
    // The only tags left are the ones we added ourselves.
    expect(out.match(/<(?!\/?b>)/g)).toBeNull();
  });

  it("trims incidental whitespace", () => {
    const out = buildTelegramMessage("  Ada  ", "  ada@x.com ", "  hello  ");
    expect(out).toContain("<b>From:</b> Ada\n");
    expect(out).toContain("<b>Email:</b> ada@x.com\n");
    expect(out.endsWith("hello")).toBe(true);
  });
});
