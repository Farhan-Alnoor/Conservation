"use client";
import { useEffect,useState } from "react";
/*import { Button } from "@/components/ui/button";*/
const MAXIMGINDEX = 2
export default function Hero() {
    var [img_index ,setIndex]= useState(1)

    useEffect(()=>{
        var timer :NodeJS.Timeout
        if (img_index < MAXIMGINDEX){
            timer = setInterval(()=> setIndex(img_index + 1),6000)
        }
        else{
           timer = setInterval(()=> setIndex(1),6000)
        }

        
        return () => clearInterval(timer);
    },[img_index])


  return (
    <section className="flex h-screen w-full items-center justify-center ">
      <div className="absolute inset-0 z-10 size-full">
        <div className="grid w-full grid-cols-12 divide-x divide-white/20">
          <div className="col-span-1 h-screen" />
          <div className="col-span-3 h-screen" />
          <div className="col-span-4 h-screen" />
          <div className="col-span-3 h-screen" />
          <div className="col-span-1 h-screen" />
        </div>
      </div> 
      { Array.from({ length: MAXIMGINDEX }, (_, i) => i + 1).map((index) => (
      <div
      key={index}
        className={`absolute inset-0 bg-center bg-cover transition-opacity duration-1000 ease-in-out ${
            index === img_index ? "opacity-100" : "opacity-0"
          }`} 
        style={{
          backgroundImage:
            `url('/assets/hero-${index}.jpg')`,
            
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>))}

      <div className="relative z-10 max-w-5xl px-6 text-center text-white">
        <h1 className="text-center font-kanturmuy font-normal text-5xl text-white tracking-tight md:text-6xl lg:text-8xl">
          Protecting the species that need us most
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-center font-light text-lg text-white/90 md:text-xl">
         Explore endangered species, understand what threatens them, and find
          the organizations working to bring them back.
        </p>

        {/* <Button className="group not-disabled:inset-shadow-none mx-auto flex cursor-pointer items-center justify-center gap-0 rounded-full border-none bg-transparent px-0 py-5 font-normal shadow-none hover:bg-transparent [:hover,[data-pressed]]:bg-transparent">
          <span className="rounded-full bg-[#e1fcad] px-6 py-3 text-black duration-500 ease-in-out group-hover:bg-[#122023] group-hover:text-[#e1fcad] group-hover:transition-colors">
            Start a Project
          </span>
          <div className="relative flex h-fit cursor-pointer items-center overflow-hidden rounded-full bg-[#e1fcad] p-5 text-black duration-500 ease-in-out group-hover:bg-[#122023] group-hover:text-[#e1fcad] group-hover:transition-colors">
            <ArrowUpRight className="absolute h-5 w-5 -translate-x-1/2 transition-all duration-500 ease-in-out group-hover:translate-x-10" />
            <ArrowUpRight className="absolute h-5 w-5 -translate-x-10 transition-all duration-500 ease-in-out group-hover:-translate-x-1/2" />
          </div>
        </Button>*/}
      </div>
    </section>
  );
}