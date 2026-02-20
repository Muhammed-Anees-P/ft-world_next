"use client";

import Image from "next/image";
import Container from "../Container";

interface Product {
  id: number;
  title: string;
  description?: string;
  image?: string;
  backgroundImage?: string;
  button?: string;
}

const products: Product[] = [
  {
    id: 1,
    title: "Develop Ineo 224e",
    description:
      "Develop Ineo 224e is a high-performance A4 multifunction printer designed to deliver exceptional print quality and operational efficiency.",
    image: "/printer1.png",
    backgroundImage: "/bg-printer1.jpg",
    button: "Learn more",
  },
  {
    id: 2,
    title: "POSIFLOW PSF–11",
    description: "All-in-One Wireless Monochrome Laser Printer",
    image: "/printer2.png",
    backgroundImage: "/bg-printer2.jpg",
    button: "Learn more",
  },
  {
    id: 3,
    title: "POSIFLOW PSF–11",
    image: "/pos.png",
    backgroundImage: "/bg-pos.jpg",
    button: "Learn more",
  },
];

export default function FeaturProducts() {
  const [large, tall, wide] = products;

  const cardBase = "relative overflow-hidden bg-white rounded-[40px] shadow-sm";

  const renderBackground = (bg?: string) =>
    bg ? (
      <>
        <Image src={bg} alt="background" fill className="object-cover z-0" />
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] z-0" />
      </>
    ) : null;

  return (
    <section className="w-full bg-[#FFFFFF] py-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-[280px_200px]] gap-6">
          {/* ================= LARGE ================= */}
          <div className={`lg:col-span-2 p-10 flex items-center ${cardBase}`}>
            {renderBackground(large.backgroundImage)}

            <div className="relative z-10 grid md:grid-cols-2 gap-8 w-full items-center">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {large.title}
                </h2>

                {large.description && (
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-md">
                    {large.description}
                  </p>
                )}

                {large.button && (
                  <button className="px-6 py-2 text-sm text-white rounded-lg bg-linear-to-r from-purple-500 to-purple-700">
                    {large.button}
                  </button>
                )}
              </div>

              {large.image && (
                <div className="relative flex justify-end">
                  <div className="absolute bottom-6 right-6 w-96 h-28 bg-gray-300 rounded-full blur-3xl opacity-60"></div>
                  <Image
                    src={large.image}
                    alt={large.title}
                    width={420}
                    height={300}
                    className="relative z-10 object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          {/* ================= TALL (row-span-2) ================= */}
          <div
            className={`lg:row-span-2 p-6 flex flex-col justify-between ${cardBase}`}
          >
            {renderBackground(tall.backgroundImage)}

            <div className="relative z-10 flex flex-col h-full justify-between">
              {tall.image && (
                <div className="relative flex justify-center mt-6">
                  <div className="absolute bottom-6 w-72 h-5 bg-gray-300 rounded-full blur-3xl opacity-60"></div>
                  <Image
                    src={tall.image}
                    alt={tall.title}
                    width={300}
                    height={220}
                    className="relative z-10 object-contain"
                    style={{
                      marginTop: "80px",
                    }}
                  />
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {tall.title}
                </h3>

                {tall.description && (
                  <p className="text-gray-600 text-sm mt-2 mb-4">
                    {tall.description}
                  </p>
                )}

                {tall.button && (
                  <button className="w-full px-4 py-2 text-sm text-white rounded-lg bg-linear-to-r from-purple-500 to-purple-700">
                    {tall.button}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ================= WIDE ================= */}
          <div
            className={`lg:col-span-2 p-8 flex items-center justify-between ${cardBase}`}
          >
            {renderBackground(wide.backgroundImage)}

            <div className="relative z-10 flex items-center justify-between w-full">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {wide.title}
                </h3>

                {wide.button && (
                  <button className="px-6 py-2 text-sm text-white rounded-lg bg-linear-to-r from-purple-500 to-purple-700">
                    {wide.button}
                  </button>
                )}
              </div>

              {wide.image && (
                <div className="relative flex justify-end">
                  <div className="absolute bottom-6 right-6 w-72 h-20 bg-gray-300 rounded-full blur-3xl opacity-60"></div>
                  <Image
                    src={wide.image}
                    alt={wide.title}
                    width={280}
                    height={200}
                    className="relative z-10 object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
