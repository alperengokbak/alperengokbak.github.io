import React from "react";

export default function ButtonComponent() {
  return (
    <div className="flex flex-row justify-center items-center w-full mt-8 gap-6">
      <a
        href="
              "
        className="flex flex-row gap-3 px-8 py-4 text-xl font-medium text-white bg-transparent border rounded-lg items-center hover:bg-white hover:text-black"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
          <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
          <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
        </svg>
        Contact Me
      </a>

      <a
        href="
              "
        className="flex flex-row gap-3 px-8 py-4 text-xl font-medium text-white bg-transparent border rounded-lg items-center hover:bg-white hover:text-black"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
          <path
            fillRule="evenodd"
            d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
            clipRule="evenodd"
          />
        </svg>
        Portfolio
      </a>
      <a
        href="
              "
        className="flex flex-row gap-3 px-8 py-4 text-xl font-medium text-black bg-orange-500 border rounded-lg items-center hover:bg-orange-400"
      >
        Buy Me a Coffee
      </a>
    </div>
  );
}
