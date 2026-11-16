"use client";

import { useState } from "react";
import Image from "next/image";

export default function CopyEmail({ email }: { email: string }) {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <>
      <button type="button" className="copy-container" onClick={handleCopy} aria-label={`Copy email address ${email}`}>
        <Image src={hasCopied ? "/assets/tick.svg" : "/assets/copy.svg"} width={20} height={20} alt="" className="h-5" style={{ width: "auto" }} />
        <span className="w-full lg:text-2xl xl:text-lg md:text-base font-medium text-gray_gradient break-all">{email}</span>
      </button>
      <p className="sr-only" aria-live="polite">
        {hasCopied ? "Email copied to clipboard" : ""}
      </p>
    </>
  );
}
