import { act, render, screen, waitFor } from "../test/utils.jsx";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ConnectSection from "./ConnectSection.jsx";
import { buildMailto } from "../lib/contact.js";

const fill = async (user, { name = "Ada", email = "ada@example.com", subject = "", message = "Hi there" } = {}) => {
  await user.type(screen.getByLabelText(/^name$/i), name);
  await user.type(screen.getByLabelText(/^email$/i), email);
  if (subject) await user.type(screen.getByLabelText(/^subject$/i), subject);
  await user.type(screen.getByLabelText(/^message$/i), message);
};

// The label flips to "Sending…" mid-request, so match either state.
const submit = () => screen.getByRole("button", { name: /send message|sending|delivered/i });

describe("buildMailto", () => {
  it("encodes the subject and body so newlines cannot inject mail headers", () => {
    const url = buildMailto({
      name: "Ada",
      email: "ada@example.com",
      subject: "Hello\nBcc: victim@example.com",
      message: "Line one\nLine two",
    });

    expect(url).toContain("%0A");
    expect(url).not.toMatch(/\n/);
    expect(url).toContain("mailto:gokbakalperen@gmail.com");
  });

  it("falls back to a default subject and marks a missing email", () => {
    const url = buildMailto({ name: "Ada", email: "", subject: "", message: "Hi" });
    expect(url).toContain(encodeURIComponent("Portfolio Inquiry"));
    expect(url).toContain(encodeURIComponent("no-email-provided"));
  });
});

describe("ConnectSection", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_WEB3FORMS_KEY", "test-access-key");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("gives every field a label that survives typing", async () => {
    // Placeholders disappear the moment someone types, so they are not an accessible
    // name. Each field needs a real <label> a screen reader can announce at any point.
    const user = userEvent.setup();
    render(<ConnectSection />);

    await user.type(screen.getByLabelText(/^name$/i), "Ada");

    // The label must still resolve the field after typing — a placeholder would not.
    for (const label of [/^name$/i, /^email$/i, /^subject$/i, /^message$/i]) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
  });

  it("reports delivery on the button itself, then returns to idle", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) }));

    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<ConnectSection />);
    await fill(user);
    await user.click(submit());

    // The action keeps one verb through the flow: send -> sending -> delivered.
    expect(await screen.findByRole("button", { name: /delivered/i })).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(2600);
    });

    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("keeps the inputs controlled", async () => {
    const user = userEvent.setup();
    render(<ConnectSection />);

    await user.type(screen.getByLabelText(/^name$/i), "Ada");

    expect(screen.getByLabelText(/^name$/i)).toHaveValue("Ada");
  });

  it("posts the form to Web3Forms and confirms success", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const user = userEvent.setup();
    render(<ConnectSection />);
    await fill(user, { subject: "Contract role" });
    await user.click(submit());

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.web3forms.com/submit");
    const body = JSON.parse(options.body);
    expect(body).toMatchObject({
      access_key: "test-access-key",
      name: "Ada",
      email: "ada@example.com",
      subject: "Contract role",
      message: "Hi there",
    });

    expect(await screen.findByText(/on its way/i)).toBeInTheDocument();
  });

  it("defaults a blank subject rather than sending an empty one", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    vi.stubGlobal("fetch", fetchMock);

    const user = userEvent.setup();
    render(<ConnectSection />);
    await fill(user);
    await user.click(submit());

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).subject).toBe("Portfolio Inquiry");
  });

  it("clears the form after a successful send", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) }));

    const user = userEvent.setup();
    render(<ConnectSection />);
    await fill(user);
    await user.click(submit());

    await screen.findByText(/on its way/i);
    expect(screen.getByLabelText(/^name$/i)).toHaveValue("");
    expect(screen.getByLabelText(/^message$/i)).toHaveValue("");
  });

  it("surfaces a failure and offers the mailto fallback", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500, json: async () => ({ success: false, message: "Server error" }) })
    );

    const user = userEvent.setup();
    render(<ConnectSection />);
    await fill(user);
    await user.click(submit());

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/could not send/i);
    expect(screen.getByRole("link", { name: /email me directly/i })).toHaveAttribute(
      "href",
      expect.stringContaining("mailto:")
    );
  });

  it("surfaces a network rejection too", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

    const user = userEvent.setup();
    render(<ConnectSection />);
    await fill(user);
    await user.click(submit());

    expect(await screen.findByRole("alert")).toHaveTextContent(/offline/i);
  });

  it("disables the submit button while the request is in flight", async () => {
    let resolveRequest;
    vi.stubGlobal(
      "fetch",
      vi.fn().mockReturnValue(new Promise((resolve) => {
        resolveRequest = () => resolve({ ok: true, json: async () => ({ success: true }) });
      }))
    );

    const user = userEvent.setup();
    render(<ConnectSection />);
    await fill(user);
    await user.click(submit());

    await waitFor(() => expect(submit()).toBeDisabled());
    expect(submit()).toHaveTextContent(/sending/i);

    resolveRequest();
    await screen.findByText(/on its way/i);
    expect(submit()).toBeEnabled();
  });

  it("does not submit when the honeypot is filled", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const { container } = render(<ConnectSection />);
    const user = userEvent.setup();
    await fill(user);

    // Simulate a bot completing the hidden field.
    const honeypot = container.querySelector('input[name="botcheck"]');
    await user.type(honeypot, "i am a robot");
    await user.click(submit());

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("falls back to mailto when no access key is configured", async () => {
    vi.stubEnv("VITE_WEB3FORMS_KEY", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    // jsdom cannot navigate, so observe the assignment instead.
    const originalLocation = window.location;
    delete window.location;
    window.location = { ...originalLocation, href: "" };

    const user = userEvent.setup();
    render(<ConnectSection />);
    await fill(user);
    await user.click(submit());

    expect(fetchMock).not.toHaveBeenCalled();
    expect(window.location.href).toContain("mailto:gokbakalperen@gmail.com");

    window.location = originalLocation;
  });
});
