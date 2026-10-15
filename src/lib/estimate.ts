export type ContactMethod = "phone" | "email";

export type EstimateInput = {
  name: string;
  phone: string;
  email: string;
  service: string;
  description: string;
  contactMethod: ContactMethod | "";
};

export type EstimateRequest = {
  name: string;
  phone: string;
  email: string;
  service: string;
  description: string;
  contactMethod: ContactMethod;
};

export type FieldErrors = Partial<Record<keyof EstimateInput, string>>;

export type SubmitEstimateResult =
  | { ok: true; delivered: boolean; message: string }
  | { ok: false; delivered: false; message: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const emptyEstimate = (): EstimateInput => ({
  name: "",
  phone: "",
  email: "",
  service: "",
  description: "",
  contactMethod: "phone",
});

export function validateEstimate(input: EstimateInput): FieldErrors {
  const errors: FieldErrors = {};
  const name = input.name.trim();
  const phoneDigits = input.phone.replace(/\D/g, "");
  const email = input.email.trim();
  const description = input.description.trim();

  if (!name) errors.name = "Enter your name.";
  if (!input.phone.trim()) {
    errors.phone = "Enter a phone number so the shop can reach you.";
  } else if (phoneDigits.length < 10) {
    errors.phone = "Enter a 10-digit phone number, including the area code.";
  }
  if (!email) {
    errors.email = "Enter your email address.";
  } else if (!emailPattern.test(email)) {
    errors.email = "Enter an email address like name@email.com.";
  }
  if (!input.service) errors.service = "Choose the service you need.";
  if (!description) {
    errors.description = "Add a brief description of what the system is doing.";
  }
  if (!input.contactMethod) {
    errors.contactMethod = "Choose phone or email.";
  }

  return errors;
}

export function toEstimateRequest(input: EstimateInput): EstimateRequest | null {
  if (Object.keys(validateEstimate(input)).length > 0) return null;
  if (input.contactMethod !== "phone" && input.contactMethod !== "email") return null;
  return {
    name: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email.trim(),
    service: input.service,
    description: input.description.trim(),
    contactMethod: input.contactMethod,
  };
}

/**
 * Single handoff for a future inbox, CRM, or email integration.
 * Replace the body of this function with a real request. Do not tell the
 * visitor a message was delivered until that call succeeds.
 * This demo does not send the request anywhere.
 */
export async function submitEstimate(
  request: EstimateRequest,
): Promise<SubmitEstimateResult> {
  void request;
  return {
    ok: true,
    delivered: false,
    message:
      "This demo form is not connected to a backend. Your request was not sent.",
  };
}
