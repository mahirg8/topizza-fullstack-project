
import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      
      <Hero/>
      <HomeMenu/>
      <section className="text-center my-16" id="about">
        <SectionHeaders subHeader={'Our Story'} mainHeader={'About us'} />
        <div className="max-w-md mx-auto mt-4 text-gray-500 flex flex-col gap-4">
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum aspernatur voluptatem vitae eos veritatis necessitatibus ad similique ratione et mollitia eveniet iusto accusamus, dolorum adipisci dolor cumque provident velit soluta.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore eum assumenda ullam ipsam officia ipsum. Fuga quae vero distinctio explicabo. Aliquam fugiat velit quibusdam, aliquid nobis eveniet dolorem perspiciatis veritatis.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit a iste sint nam ipsa tempora neque laboriosam exercitationem? Sequi repudiandae, dicta necessitatibus laudantium aliquid fugiat est impedit recusandae iusto enim fugit harum odio quos aperiam qui accusamus amet, beatae animi id dolore quo pariatur. Facilis!</p>
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
