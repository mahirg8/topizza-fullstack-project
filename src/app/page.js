
import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";

export default function Home() {
  return (
    <>

      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders subHeader={'Our Story'} mainHeader={'About us'} />
        <div className="max-w-md mx-auto mt-4 text-gray-500 flex flex-col gap-4">
          <p>Welcome to Topizza, your ultimate destination for mouthwatering pizzas crafted with passion and perfection. At Topizza, we believe in bringing people together over the universal love for pizza. Every slice is a testament to our commitment to quality, taste, and innovation.</p>

            <p>Our journey began with a simple goal: to create unforgettable pizza experiences. Using the finest, freshest ingredients and authentic recipes, we ensure every bite is a burst of flavor. Whether you crave the classics or adventurous gourmet toppings, we’ve got something to satisfy every palate.</p>

            <p>But it’s not just about pizza—it’s about community. We pride ourselves on delivering not just food but happiness, be it through dine-in, delivery, or catering for your special moments.</p>

            <p>At Topizza, we don’t just make pizzas—we make memories. Join us, and let’s create some delicious ones together!</p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders subHeader={'Don\'t hesitate'} mainHeader={'Contact Us'} />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel:+918208605303">+91 82086 05303</a>
        </div>
      </section>

    </>
  );
}
