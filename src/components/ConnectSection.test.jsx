import { render, screen, waitFor } from "../test/utils.jsx";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ConnectSection from "./ConnectSection.jsx";
import { buildMailto } from "../lib/contact.js";

const fill = async (user, { name = "Ada", email = "ada@example.com", subject = "", message = "Hi there" } = {}) => {
  await user.type(screen.getByPlaceholderText("Name"), name);
  await user.type(screen.getByPlaceholderText("Email"), email);
  if (subject) await user.type(screen.getByPlaceholderText("Subject"), subject);
  await user.type(screen.getByPlaceholderText(/tell me about the problem/i), message);
};

// The label flips to "Sending…" mid-request, so match either state.
const submit = () => screen.getByRole("button", { name: /send message|sending/i });

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

  it("keeps the inputs controlled", async () => {
    const user = userEvent.setup();
    render(<ConnectSection />);

    await user.type(screen.getByPlaceholderText("Name"), "Ada");

    expect(screen.getByPlaceholderText("Name")).toHaveValue("Ada");
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
    expect(screen.getByPlaceholderText("Name")).toHaveValue("");
    expect(screen.getByPlaceholderText(/tell me about the problem/i)).toHaveValue("");
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
