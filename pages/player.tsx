import { useState, useEffect } from "react";
import Tabla from "@/components/tabla";
import { generateRandomNumber } from "../utils/index";
import Image from 'next/image';
import pacifier from "../public/images/pacifier.svg";

export default function Player() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [randomNumberArray, setRandomNumberArray] = useState<
    Array<number> | undefined
  >(undefined);

  useEffect(() => {
    generateArray();
  }, []);

  useEffect(() => {
    if (randomNumberArray !== undefined) {
      checkLoadedImages();
    }
  }, [randomNumberArray]);

  const generateArray = () => {
    let count: number = 0;
    let array: Array<number> = [];

    while (count < 16) {
      const num: number = generateRandomNumber(48);
      if (!array.includes(num)) {
        array.push(num);
        count++;
      }
    }
    setRandomNumberArray(array);
  };

  const checkLoadedImages = () => {
    Promise.all(
      Array.from(document.images).map((img) => {
        if (img.complete) return Promise.resolve(img.naturalHeight !== 0);
        return new Promise((resolve) => {
          img.addEventListener("load", () => resolve(true));
          img.addEventListener("error", () => resolve(false));
        });
      })
    ).then((results) => {
      if (results.every((res) => res)) {
        console.log("all images loaded successfully");
        setIsLoading(false);
      } else console.log("some images failed to load, all finished loading");
    });
  };

  return (
    <>
      <div
        className={`w-full flex flex-row justify-center items-center ${
          isLoading ? "mt-[275px] md:mt-0 md:h-dynamic-screen" : "h-0 hidden"
        }`}
      >
        <span className="animate-ping">
          <Image
            priority
            src={pacifier}
            alt="pacifier"
          />
        </span>
      </div>
      <section
        className={`flex flex-row w-full md:items-center justify-center md:p-4 ${
          isLoading ? "h-0" : "bg-white md:bg-inherit min-h-screen"
        }`}
      >
        <Tabla isLoading={isLoading} randomNumberArray={randomNumberArray} />
      </section>
    </>
  );
}
