import React from "react";
import Button from "@/components/Button/Button";
import Image from "next/image";
import { items } from "./data.js";
import { notFound } from "next/navigation";

const getData = (categ) => {
  const data = items[categ];
  if (data) {
    return data;
  }
  return notFound();
};

const Category = ({ params }) => {
  const data = getData(params.category);
  return (
    <div className="flex justify-between mt-8 sm:mt-2 z-40">
      <div className="flex-col space-y-8 lg:space-y-12 xl:space-y-16 w-full p-5 md:px-16 xl:px-20 mt-8 sm:mt-0 z-40 rounded-2xl bg-[#1A1A1A]">
        <div className="flex justify-center">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-white">
            {params.category}
          </h2>
        </div>
        {data.map((item) => (
          <div className="flex-col space-y-6 z-40 lg:hidden" key={item.id}>
            <div className="flex justify-center">
              <Image
                width={1000}
                height={1000}
                src={item.img}
                className="object-fill w-full h-[300px] rounded-xl"
                alt="Images"
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                {item.title}
              </h1>
              <p className="font-sans font-semibold text-base text-justify sm:text-lg text-wrap text-gray-500">
                {item.desc}
              </p>
            </div>
            <div className="flex items-center">
            <Button
                  text="See more"
                  url={item.linked} />
            </div>
          </div>
        ))}
        {data.map((item) => (
          <div
            className="hidden lg:flex justify-around items-center space-x-10 z-40"
            key={item.id}
          >
            <div className="flex flex-col w-2/3 space-y-5">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-white">{item.title}</h1>
                <p className="font-sans font-semibold text-justify text-xl text-wrap text-gray-500">
                  {item.desc}
                </p>
              </div>
              <div className="flex items-center">
                <Button
                  text="See more"
                  url={item.linked} />
              </div>
            </div>
            <div className="flex justify-center w-1/2 hover:scale-105 transition-all duration-500">
              <Image
                width={1000}
                height={1000}
                src={item.img}
                className="object-fill h-[280px] rounded-xl"
                alt="Images"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
