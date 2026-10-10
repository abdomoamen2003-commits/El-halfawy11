import { useState } from "react";
import { Send } from "lucide-react";
import { siteConfig } from "../../data/site";

const INITIAL = { name: "", email: "", phone: "", company: "", topic: "General Inquiry", message: "", _honey: "" };
const TOPICS = ["General Inquiry", "Request a Quote", "Project Consultation", "Partnership Opportunity", "Careers", "Other"];

const RULES = {
  name: (v) => (v.trim().length < 2 ? "Please enter your full name." : ""),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Please enter a valid email address."),
  phone: (v) => (v && !/^[+()\d\s-]{7,20}$/.test(v.trim()) ? "Please enter a valid phone number." : ""),
  message: (v) => (v.trim().length < 10 ? "Please write at least 10 characters." : ""),
};
const validate = (name, value) => (RULES[name] ? RULES[name](value) : "");

/** Single labelled form control with inline error + optional character counter. */
function Field({ name, label, value, error, onChange, onBlur, required, kind = "input", options, counter, ...control }) {
  const shared = {
    id: `mx-${name}`,
    name,
    value,
    onChange: (e) => onChange(name, e.target.value),
    onBlur: () => onBlur(name),
    "aria-invalid": error ? "true" : "false",
    "aria-describedby": error ? `mx-${name}-e` : undefined,
    className: `mx-input${error ? " mx-bad" : ""}`,
    ...control,
  };
  return (
    <div className="mx-field">
      <label htmlFor={`mx-${name}`} className="mx-label">
        {label}
        {required && (
          <span className="mx-req" aria-hidden>
            {" *"}
          </span>
        )}
      </label>
      {kind === "textarea" && <textarea {...shared} rows={5} />}
      {kind === "select" && (
        <select {...shared}>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}
      {kind === "input" && <input {...shared} />}
      {error && (
        <p id={`mx-${name}-e`} role="alert" className="mx-help">
          {error}
        </p>
      )}
      {counter && (
        <p className="mx-count">
          {value.length} / {control.maxLength}
        </p>
      )}
    </div>
  );
}

function SuccessMessage({ firstName, email, topic, onReset }) {
  return (
    <div className="mx-ok" role="status">
      <svg className="mx-check" viewBox="0 0 52 52" fill="none" aria-hidden>
        <circle cx="26" cy="26" r="24" />
        <path d="M14 27l8 8 16-17" />
      </svg>
      <h2 className="t-h3 text-white">Thank you, {firstName}!</h2>
      <p className="mt-3 text-white/85">
        Your message has been sent successfully. Our team will review it and reply to <strong className="text-accent">{email}</strong> within 1–2
        business days.
      </p>
      <p className="mt-2 text-sm text-white/65">Inquiry type: {topic}</p>
      <button type="button" onClick={onReset} className="btn-outline mt-8">
        Send Another Message
      </button>
    </div>
  );
}

export default function ContactForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | ok | err

  const sending = status === "sending";
  const firstName = values.name.trim().split(/\s+/)[0];

  const change = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (touched[name]) setErrors((e) => ({ ...e, [name]: validate(name, value) }));
  };
  const blur = (name) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((e) => ({ ...e, [name]: validate(name, values[name]) }));
  };
  const reset = () => {
    setValues(INITIAL);
    setErrors({});
    setTouched({});
    setStatus("idle");
  };

  const submit = async (event) => {
    event.preventDefault();
    const found = {};
    let firstInvalid = null;
    Object.keys(RULES).forEach((name) => {
      const message = validate(name, values[name]);
      if (message) {
        found[name] = message;
        firstInvalid ||= name;
      }
    });
    setErrors(found);
    setTouched({ name: true, email: true, phone: true, message: true });
    if (firstInvalid) {
      document.getElementById(`mx-${firstInvalid}`)?.focus();
      return;
    }
    if (values._honey) {
      setStatus("ok"); // bots get a fake success
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${siteConfig.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          Phone: values.phone.trim() || "Not provided",
          Company: values.company.trim() || "Not provided",
          "Inquiry Type": values.topic,
          Message: values.message.trim(),
          Submitted: new Date().toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" }),
          _subject: `New Website Inquiry \u2014 ${values.topic} \u2014 ${values.name.trim()}`,
          _template: "box",
          _captcha: "false",
          _autoresponse:
            `Dear ${firstName},\n\nThank you for contacting El Halfawy \u2014 Architecture & General Contracting.\n\n` +
            `We have received your inquiry (${values.topic}) and a member of our team will review it and reply within 1\u20132 business days.\n\n` +
            `For urgent matters you can reach us directly at ${siteConfig.phone}.\n\nBest regards,\nEl Halfawy Team\n${siteConfig.site}`,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && (data.success === true || data.success === "true")) setStatus("ok");
      else throw new Error("send failed");
    } catch {
      setStatus("err");
    }
  };

  const field = (name, label, props) => (
    <Field name={name} label={label} value={values[name]} error={errors[name]} disabled={sending} onChange={change} onBlur={blur} {...props} />
  );

  return (
    <div className="rounded-3xl border-2 border-accent glass p-8" data-aos="fade-right">
      {status === "ok" ? (
        <SuccessMessage firstName={firstName} email={values.email.trim()} topic={values.topic} onReset={reset} />
      ) : (
        <form onSubmit={submit} noValidate className="space-y-5" aria-busy={sending}>
          <div>
            <h2 className="t-h3 text-white">Send Us a Message</h2>
            <p className="mt-2 text-sm text-white/75">
              Tell us about your project or inquiry and a member of our team will respond within 1–2 business days.
            </p>
          </div>

          {status === "err" && (
            <div className="mx-alert" role="alert">
              We couldn’t send your message. Please check your connection and try again, or email us directly at{" "}
              <a href={`mailto:${siteConfig.email}`} className="underline">
                {siteConfig.email}
              </a>
              .
            </div>
          )}

          <div className="mx-grid2">
            {field("name", "Full Name", { required: true, autoComplete: "name", placeholder: "John Smith", maxLength: 80 })}
            {field("email", "Email Address", { required: true, autoComplete: "email", type: "email", placeholder: "name@company.com", maxLength: 120 })}
          </div>
          <div className="mx-grid2">
            {field("phone", "Phone Number (optional)", { autoComplete: "tel", type: "tel", placeholder: "+20 1XX XXX XXXX", maxLength: 20 })}
            {field("company", "Company (optional)", { autoComplete: "organization", placeholder: "Company or organization", maxLength: 100 })}
          </div>
          {field("topic", "Inquiry Type", { kind: "select", options: TOPICS })}
          {field("message", "Message", {
            required: true,
            kind: "textarea",
            placeholder: "Briefly describe your project, timeline or question\u2026",
            maxLength: 1000,
            counter: true,
          })}

          {/* honeypot: real visitors never see or fill this */}
          <input
            type="text"
            name="_honey"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            value={values._honey}
            onChange={(e) => change("_honey", e.target.value)}
            className="mx-hp"
          />

          <button type="submit" disabled={sending} className="btn-solid w-full justify-center">
            {sending ? (
              <>
                <span className="mx-spin" aria-hidden />
                Sending…
              </>
            ) : (
              <>
                Send Message <Send size={18} />
              </>
            )}
          </button>
          <p className="text-center text-xs text-white/60">We respect your privacy. Your details are used only to respond to your inquiry.</p>
        </form>
      )}
    </div>
  );
}
