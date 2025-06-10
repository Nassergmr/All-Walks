import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Page: React.FC = () => {
  return (
    <div className=" sm:mt-[3rem] sm:mb-[4rem] mt-[7rem] mb-[2rem]">
      <header className="bg-[#212121] text-white sm:py-[150px] py-[100px]">
        <div className="container mx-auto px-5 text-center">
          <h1 className="sm:text-5xl text-3xl font-bold mb-6">
            About AllWalks
          </h1>
          <p className="mx-auto opacity-90">
            Where street culture meets premium footwear for every step of your
            journey
          </p>
        </div>
      </header>

      <main className="container mx-auto px-5 sm:py-16 py-8">
        {/* Our Story */}
        <section className=" sm:mb-20 mb-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-dark mb-6">Our Journey</h2>
              <p className="text-gray-700 mb-4">
                AllWalks was founded in 2015 with a simple vision: to create
                sneakers that blend urban style with unmatched comfort. What
                started as a small workshop in Brooklyn has grown into a global
                movement.
              </p>
              <p className="text-gray-700 mb-4">
                Today, we&apos;re recognized by sneakerheads and style icons
                worldwide for our innovative designs and commitment to quality.
                Our limited editions sell out in minutes, and our collaborations
                with street artists have become collector&apos;s items.
              </p>
              <p className="text-gray-700">
                Our name reflects our philosophy — we design for all walks of
                life, from city streets to skate parks, from fashion runways to
                your everyday commute.
              </p>
            </div>
            <div className="md:w-1/2 relative h-80 w-full">
              <Image
                src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="AllWalks sneakers lineup"
                fill
                className="rounded-lg object-cover shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="bg-primary-50 rounded-xl sm:p-12 px-[20px] py-8 sm:mb-20 mb-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-dark mb-6">Our Craft</h2>
            <p className="text-xl text-gray-700 mb-8">
              &quot;To create footwear that doesn&apos;t just complement your
              style but elevates every step you take.&quot;
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                {
                  icon: "fas fa-shoe-prints",
                  title: "Premium Materials",
                  desc: "We source only the finest leathers and sustainable fabrics for our sneakers.",
                },
                {
                  icon: "fas fa-hand-holding-heart",
                  title: "Ethical Production",
                  desc: "Every pair is crafted in certified factories with fair labor practices.",
                },
                {
                  icon: "fas fa-bolt",
                  title: "Innovative Tech",
                  desc: "Our proprietary cushioning system provides all-day comfort.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-lg shadow-md w-full sm:w-64"
                >
                  <div className="text-primary-600 mb-4">
                    <i className={`${item.icon} text-3xl`}></i>
                  </div>
                  <h3 className="font-bold text-dark mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="sm:mb-20 mb-10">
          <h2 className="text-3xl font-bold text-dark mb-12 text-center">
            Meet The Crew
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Marcus Chen",
                title: "Founder & Creative Director",
                desc: "Former pro skater turned designer, brings urban authenticity to every collection.",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              },
              {
                name: "Jamila Johnson",
                title: "Head of Design",
                desc: "Fashion Institute grad who's redefined sneaker aesthetics for the modern era.",
                img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              },
              {
                name: "Diego Rodriguez",
                title: "Community Manager",
                desc: "Connects AllWalks with sneaker culture through collaborations and events.",
                img: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              },
            ].map((person, idx) => (
              <div
                key={idx}
                className="bg-[#212121] text-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={person.img}
                    alt={person.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-dark mb-1">
                    {person.name}
                  </h3>
                  <p className="text-primary-600 font-medium mb-3">
                    {person.title}
                  </p>
                  <p className="text-gray-400">{person.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="bg-[#212121] text-white rounded-xl p-12 sm:mb-20 mb-10">
          <h2 className="text-3xl font-bold mb-12 text-center">
            By The Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: "500K+", label: "Sneakers Sold" },
              { stat: "24+", label: "Collaborations" },
              { stat: "50+", label: "Countries Shipped To" },
              { stat: "98%", label: "Customer Satisfaction" },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="text-5xl font-bold text-primary-400 mb-2">
                  {item.stat}
                </div>
                <div className="text-gray-300">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-[#212121] text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Walk With Us</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join the AllWalks movement and step up your sneaker game.
          </p>
          <Button size={"lg"} variant={"outline"} className="text-black">
            Shop Latest Drops
          </Button>
        </section>
      </main>
    </div>
  );
};

export default Page;
