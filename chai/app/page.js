import Image from "next/image";

export default function Home() {
  return (
  <>
    <div className="flex flex-col justify-center items-center gap-4 text-white h-[44vh]">
      <div className=" text-5xl flex gap-2 justify-center items-center font-bold">Buy Me a Chai <span><Image unoptimized={true} height={88} src="/logo.gif" width={88} /></span></div>
      <p>A crowdfunding platform for creators. Get funded by your fans and followers. Start Now!</p>
      <div>
        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
      </div>
    </div>
    <div className="bg-white h-1 opacity-10"></div>
    <div className="text-white container mx-auto py-32">
      <h2 className="text-3xl font-bold text-center mb-14">Your Fans can buy you a Chai</h2>
      <div className="flex justify-around gap-5 ">
      <div className="item space-y-3 text-center flex flex-col justify-center items-center">
          <Image unoptimized={true} height={88} src="/man.png" width={88} className="bg-slate-400 rounded-full p-2 flex flex-col justify-center items-center text-black"/>
          <p className="font-bold">Your Fans want to help</p>
          <p className="text-center">Your fans are available for you to help you</p>
        </div>
        <div className="item space-y-3 text-center flex flex-col justify-center items-center">
          <Image unoptimized={true} height={88} src="/fund.gif" width={88} className="bg-slate-400 rounded-full p-2 flex flex-col justify-center items-center text-black"/>
          <p className="font-bold">Your Fans want to help</p>
          <p className="text-center">Your fans are available for you to help you</p>
        </div>
        <div className="item space-y-3 text-center flex flex-col justify-center items-center">
          <Image unoptimized={true} height={88} src="/group.png" width={88} className="bg-slate-400 rounded-full p-2 flex flex-col justify-center items-center text-black"/>
          <p className="font-bold">Your Fans want to help</p>
          <p className="text-center">Your fans are available for you to help you</p>
        </div>
      </div>
    </div>
    <div className="bg-white h-1 opacity-10"></div>
    <div className="text-white container mx-auto py-32 flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold text-center mb-14">Learn More About Us</h2>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/PsR-hu5hBQE?si=p7og8g0EkAulWRGO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
  </>
  );
}
