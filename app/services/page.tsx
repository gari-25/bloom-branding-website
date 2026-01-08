export default function ServicesPage() {
  return (
    <main className="h-[100vh] w-[100vw] mt-[-1.35rem]">
    
      {/* PAGE TITLE */}
      <div className="page1 h-[100vh] bg-[#FFF1B8] px-[1rem]">
      <div className="text-center mb-14">
        <h1 className="text-5xl tracking-wide text-[#4F352E] h-[10vh]">
          SERVICES
        </h1>
      </div>
      <div className="flex justify-between gap-8 h-[100vh]">
      <div className="text-center h-[56vh] w-[40vw] sky-bg bg-cover flex flex-col items-center justify-center pt-[0.6rem] px-[2rem]">
        <div>
          <div className="text-[#4F352E] text-2xl font-bold mt-4">BLOOM BRANDING</div>
          <div className="text-[#4F352E] text-lg font-medium mt-2">Helping brands bloom</div>
        </div>
        <p className="text-[#4F352E] text-xl mt-2 leading-relaxed">Bringing synergy of aesthetics and expertise to help your brand bloom🌷 Social Media Marketing, Branding, Influencer Management, and Content Creation are interconnected digital marketing disciplines we specialize in for building and creating your brand's digital presence.</p>
      </div>
      <div className="h-[56vh] w-[40vw] list-none pl-0 text-2xl">
        <li className="bg-[#E8E6D8] rounded-[0.6rem] h-1/4 w-32 flex items-center justify-center my-4 py-2">Create content that you like first</li><br />
        <li className="bg-[#E8E6D8] rounded-[0.6rem] h-1/4 w-32 flex items-center justify-center my-4 py-2">It's about authenticity and connection</li><br />
        <li className="bg-[#E8E6D8] rounded-[0.6rem] h-1/4 w-32 flex items-center justify-center my-4 py-2">Your voice = your signature. Different is good!</li><br />
        <li className="bg-[#E8E6D8] rounded-[0.6rem] h-1/4 w-32 flex items-center justify-center my-4 py-2">A good camera doesn't beat genuine content.</li>
      </div>
    </div>
    </div>
    <div className="page2 bg-[#E8E6D8] w-[100vw] h-[100vh]  flex justify-between">
    <div className="h-[50vh] w-[55vw] bg-[#FFF1B8]">
    <div className="h-[40vh] w-[45vw] bg-[#0057FF]">
      <div className="text-[#FFF1B8] text-[3.5rem] font-bold text-center py-[1rem]">CONTENT <br /> CREATION</div>
      <div className="px-[25vw] bg-cover">
        <div className="bg-[#4f352e] h-[60vh] w-[40vw]">
          <img src="/images/sky-bg.webp" alt="image" className="h-[56vh] w-[38vw] "/>
        </div>
      </div>
      
    </div>
    </div>
    <div className="pl-[75vw] pt-[1rem] bg-[#FFF1B8] h-[70vh] w-[1rem]"></div>
    </div>
     </main>
  );
}
