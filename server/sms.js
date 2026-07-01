import dotenv from "dotenv";
dotenv.config();

const otps = new Map();

/**
 * Sends a 6-digit verification code to the phone number.
 * If RAPIDAPI_KEY is defined in .env, sends via RapidAPI D7 Verify or fallback.
 * If not defined, operates in sandbox/development mode by printing the code to console.
 */
export async function sendSMSOTP(phone) {
  const cleanPhone = phone.replace(/[\s\-()]/g, "");
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // Store OTP with a 5-minute expiration
  otps.set(cleanPhone, {
    code,
    expires: Date.now() + 5 * 60 * 1000,
  });

  const apiKey = process.env.RAPIDAPI_KEY;

  if (apiKey) {
    console.log(`[SMS] Sending OTP to ${cleanPhone} via RapidAPI...`);
    try {
      const response = await fetch("https://d7-verify.p.rapidapi.com/verify/v1/otp/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "d7-verify.p.rapidapi.com",
        },
        body: JSON.stringify({
          mobile: cleanPhone,
          sender_id: "D7VERIFY",
          message: `Your SS Pathways counseling booking verification code is: ${code}`,
          expiry: "300",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("[SMS] RapidAPI OTP send response:", data);
        return { success: true, message: "OTP sent successfully via SMS" };
      } else {
        const errorText = await response.text();
        console.warn(`[SMS] RapidAPI error response (Status ${response.status}):`, errorText);
        console.log(`[SMS] [SANDBOX FALLBACK] Verification code for ${cleanPhone} is: ${code}`);
        return { success: true, sandbox: true, code, message: "OTP sent (Sandbox Fallback)" };
      }
    } catch (error) {
      console.error("[SMS] RapidAPI request failed:", error);
      console.log(`[SMS] [SANDBOX FALLBACK] Verification code for ${cleanPhone} is: ${code}`);
      return { success: true, sandbox: true, code, message: "OTP sent (Sandbox Fallback)" };
    }
  } else {
    console.log("=========================================");
    console.log(`[SMS] [SANDBOX MODE] Verification code for ${cleanPhone} is: ${code}`);
    console.log("=========================================");
    return { success: true, sandbox: true, code, message: "OTP sent in Sandbox Mode" };
  }
}

/**
 * Verifies a 6-digit code for a phone number.
 */
export async function verifySMSOTP(phone, code) {
  const cleanPhone = phone.replace(/[\s\-()]/g, "");
  const otpData = otps.get(cleanPhone);

  if (!otpData) {
    return { success: false, error: "No verification code sent or it has expired" };
  }

  if (Date.now() > otpData.expires) {
    otps.delete(cleanPhone);
    return { success: false, error: "Verification code has expired" };
  }

  if (otpData.code === code.trim()) {
    otps.delete(cleanPhone);
    return { success: true };
  }

  return { success: false, error: "Invalid verification code" };
}
