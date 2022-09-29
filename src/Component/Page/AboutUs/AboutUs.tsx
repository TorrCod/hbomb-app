import Footer from "../../Footer/Footer";

function AboutUs() {
  return (
    <>
      <div className="grid gap-5 place-items-center md:py-32 py-20 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <div className="bg-slate-700 h-full text-center rounded-xl w-11/12 md:grid-cols-2 md:col-start-2 md:row-start-1">
          <img className="h-full" src="" alt="" />
        </div>
        <div className="bg-white p-5 text-center rounded-xl w-11/12">
          <h1 className="text-lg">
            <b>HBOMB STORY</b>
          </h1>
          <p className="text-gray-800">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies
            consectetur ut hendrerit lorem fames. Consequat malesuada quis
            accumsan, in convallis sit. Pharetra nulla id nec ligula diam
            consequat. Rhoncus et sagittis in phasellus. Enim, purus tincidunt
            netus enim massa in sociis. Pellentesque viverra sit imperdiet nisi,
            nulla porta pharetra. Aenean eget euismod velit pharetra. Suscipit
            condimentum ut quis morbi eu, faucibus. Accumsan, laoreet quis
            mauris, vel molestie mattis euismod. In ut scelerisque quisque
            feugiat augue feugiat bibendum gravida. Amet, diam netus tortor
            lacus, at.
          </p>
          <p className="text-gray-800">
            Pretium lectus a sed vulputate augue. Nunc semper hendrerit
            elementum, sem eget. In pharetra dapibus pellentesque et magna
            tincidunt etiam. Euismod facilisis egestas turpis scelerisque
            blandit aliquam habitant. Nunc amet, molestie donec gravida sit
            mattis. Pulvinar ipsum dignissim orci tortor hac eget ut nec aenean.
          </p>
          <p className="text-gray-800">
            Etiam tempor vel vel porta dis etiam sagittis condimentum. Est, at
            amet ac ut risus eget nibh in. Sed sed malesuada pellentesque lectus
            ornare eu. Condimentum amet tristique nec fermentum, aliquet nisi,
            adipiscing dolor dictumst. Consectetur diam mattis purus, id cras
            nulla amet vitae ultrices. Magna ipsum luctus erat nibh sed risus.
            Id facilisi odio adipiscing imperdiet pharetra, vitae ut.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
