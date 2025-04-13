import React, { useState } from 'react';
import Globe from 'react-globe.gl';
import Button from '../components/Button';

const About = () => {
    const [hasCopied, setHasCopied] = useState(false);
    const handleCopy = () =>{
        navigator.clipboard.writeText("adeniranakinloluwa2000@gmail.com");
        setHasCopied(true);
        setTimeout(() => {
            setHasCopied((prev) => !prev)
        }, 2000);
    };

    

  return (
    <section className='c-space my-20' id="about">
      <div className='grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full'>
            <div className='col-span-1 xl:row-span-3'>
                <div className='grid-container'>
                    <img 
                    src="/assets/grid1.png" 
                    alt="grid-1" 
                    className='w-full sm:h-[276px] h-fit object-contain'
                    />
                    <div>
                        <p className='grid-headtext'>Hi, I'm Gideon</p>
                        <p className='grid-subtext'>
                            With 2 years experience, I have honed my skills in frontend development, with a focus on animated 3D websites.
                        </p>
                    </div>
                </div>
            </div>

            <div className='col-span-1 xl:row-span-3'> 
                <div className='grid-container'>
                    <img 
                    src="/assets/grid2.png" 
                    alt="grid-2" 
                    className='w-full sm:w-[276px] h-fit object-contain' 
                    />
                    <div>
                        <p className="grid-headtext"> Teach Stack</p>
                        <p className="grid-subtext"> I specialize in, JavaScript/Typescript with focus on React and Next.js ecosystems. </p>
                    </div>
                </div>
            </div>
            
            <div className="col-span-1 xl:row-span-4">
                <div className="grid-container">
                    <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
                        <Globe   
                            height={323}
                            width={326}
                            backgroundColor="rgba(0,0,0,0)"
                            backgroundImageOpacity={0.5}
                            showAtmosphere
                            showGraticules
                            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                            labelsData={[{
                                lat: 40, lng: -100,
                                text: "I'm here!",
                                color: "white",
                                size: 100
                            }]}
                        />
                    </div>
                    <div>
                      <p className="grid-headtext"> I work remotely across most timezones</p>
                      <p className="grid-subtext"> I'm based in Nigeria, with remote services available</p>
                      <Button name="contact me" isBeam containerClass="w-full mt-10"/>
                    </div>
                </div>
            </div>

            <div className="xl:col-span-2 xl:row-span-3">
                <div className="grid-container">
                    <img src="/assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain"/>
                    <div>
                        <p className="grid-headtext"> My passion for coding. </p>
                        <p className="grid-subtext"> 
                            I love solving problems and buiilding things through code.
                            Coding isn't just my profession -  it's my passion 
                        </p>
                    </div>
                </div>
            </div>

            <div className="xl:col-span-1 xl:row-span-2">
                <div className="grid-container">
                    <img src="/assets/grid4.png" alt="grid-4" className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"/>
                    <div className="space-y-2">
                        <p className="grid-subtext text-center"> Contact me</p>
                        <div className="copy-container" onClick={handleCopy}>
                            <img src={hasCopied ? '/assets/tick.svg' : '/assets/copy.svg'} className="w-5 h-5" alt="copy" />
                            <p className="w-full sm:text-md md:text-md lg:text-2xl xl:text-lg font-medium text-gray_gradient text-white">
                                Adeniranakinloluwa2000@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
  );
};

export default About;
