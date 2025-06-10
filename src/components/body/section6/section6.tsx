"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const Section6: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submited, setSubmitted] = useState(false);
  const [mssg, setMssg] = useState(false);
  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (email.trim() !== "" && isValidEmail(email)) {
      setSubmitted(true);
    } else setMssg(true);
  };

  return (
    <div className="container bg-[#EBEBEB] relative  py-6 text-center  sm:my-[4rem] my-[2rem] mx-auto">
      {!submited ? (
        <>
          <h2 className="sm:text-3xl text-2xl pt-10  sm:mb-[2rem] mb-[1rem] font-bold text-[#212121]">
            Be the First to Know
          </h2>
          <p className="pb-5 lg:w-[50%] md:w-[80%] w-full  mx-auto">
            Sign up for exclusive updates on limited drops, cutting-edge
            materials, and exciting product launches—straight to your inbox.
          </p>
          <form
            onSubmit={handleEmail}
            action=""
            className="sm:px-5 px-0 pb-3 lg:w-[50%] md:w-[80%] w-full mx-auto flex justify-center items-center gap-3"
          >
            <input
              typeof="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Youre Email"
              className={`w-full focus:outline-2 ${
                mssg
                  ? "focus:outline-red-400 border-red-400"
                  : "focus:outline-[#212121] border-[#212121] "
              }  px-5 py-3 bg-white border-b-2 border-solid border-[#212121]`}
            />
            <div id="button_container">
              <Button
                onClick={handleEmail}
                className="hover:bg-white h-[53px] bg-black text-white transition-all duration-300 ease-in-out hover:text-black"
                size="lg"
                variant="outline"
              >
                <span className="text-[14px] tracking-wider italic">
                  SIGN UP
                </span>
              </Button>
            </div>
          </form>
          <div
            id="wrong_email_message"
            className={`text-red-400 absolute sm:w-[50%] w-full bottom-2 left-[50%] translate-x-[-50%] font-bold text-sm ${
              mssg ? "visible" : "hidden"
            }`}
          >
            Please use a valid email adress
          </div>
        </>
      ) : (
        <>
          <h2 className="text-3xl pt-10  mb-[2rem]  font-bold text-[#212121]">
            You&apos;re In!
          </h2>
          <p className="pb-10 lg:w-[50%] md:w-[80%] w-full  mx-auto">
            Thanks for signing up — we’re excited to have you. Stay tuned for
            updates on comfortable, sustainable products coming your way.
          </p>
        </>
      )}
    </div>
  );
};

export default Section6;
