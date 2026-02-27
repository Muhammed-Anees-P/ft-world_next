"use client";

import Image from "next/image";
import Container from "../Container";

const partners = [
  { name: "Amazon", logo: "/amazon.png" },
  { name: "Google", logo: "/google.png" },
  { name: "Shopify", logo: "/shopify.png" },
  { name: "Dell", logo: "/dell.png" },
  { name: "Sony", logo: "/sony.png" },
];

export default function PartnersSection() {
  return (
    <section className="py-20 bg-[#f4f4f4]">
      <Container>
        <h2 className="text-2xl md:text-3xl font-semibold mb-12">
          Our Partners
        </h2>

        <div className="relative w-full overflow-x-hidden py-4">
          <div className="flex w-max partners-scroll">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="w-[309px] h-[181px] bg-white rounded-[20px] px-[18px] py-[12px] 
                shadow-[0px_4px_12px_rgba(0,0,0,0.12)]
                flex flex-col items-center justify-center gap-[10px] mr-6"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={60}
                  height={60}
                  className="object-contain"
                />
                <p className="text-sm font-medium">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
