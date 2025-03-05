"use client";

import Image from "next/image";
import Logo from "@/assets/cop1.png";

export default function LK() {
  return (
    <a
      href="https://copublica.dk"
      className="hover:opacity-70 transition-all duration-250"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image src={Logo} width={176} height={76} alt="Logo" />
    </a>
  );
}
