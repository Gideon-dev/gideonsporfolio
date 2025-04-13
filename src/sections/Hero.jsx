import { Canvas } from "@react-three/fiber"
import HackerRoom from "../components/HackerRoom"
import CanvasLoader from "../components/CanvasLoader"
import  {Suspense}  from "react"
import { PerspectiveCamera } from "@react-three/drei"
import { useMediaQuery } from "react-responsive"
import Target from "../components/Target"
import ReactLogo from "../components/ReactLogo"
import Cube from "../components/Cube"
import Rings from "../components/Rings"
import HeroCamera from "../components/HeroCamera"
import Button from "../components/Button"


const Hero = () => {
  // const controls = useControls('Target', {
  //   rotationX:{
  //     value:2.5,
  //     min:-10,
  //     max: 10
  //   },
  //   rotationY:{
  //     value:2.5,
  //     min:-10,
  //     max: 10
  //   },
  //   rotationZ:{
  //     value:2.5,
  //     min:-10,
  //     max: 10
  //   },
  //   positionX:{
  //     value:2.5,
  //     min:-10,
  //     max: 10
  //   },
  //   positionY:{
  //     value:2.5,
  //     min: -500,
  //     max: 100
  //   },
  //   positionZ:{
  //     value:2.5,
  //     min:-10,
  //     max: 10
  //   },
  //   scale:{
  //     value: 1,
  //     min:0.1,
  //     max:10
  //   }
  // });

  const isSmall = useMediaQuery({minWidth: 300, maxWidth: 500 });
  const isMobile = useMediaQuery({minWidth:520, maxWidth: 700});
  const isTablet = useMediaQuery({minWidth: 750, maxWidth: 1024});

  const calculateSizes = (isSmall, isMobile) => {
    return{
      deskScale: isSmall ? 0.05 : isMobile ? 0.06 : isTablet ? 0.09 :  0.07,
      deskPosition: isSmall ? [0.5, -4, 2.5] : isMobile ? [0.5, -6, 2.5] :  isTablet ? [0.5, -11, 2.5] : [0.5, -6, 1.5] ,
      targetPosition: isSmall ? [-5, -10 ,-10] : isMobile ? [-9, -10, -10] : isTablet ? [-13, -10, -10] : [-13, -10, -10],
      targetScale: isSmall ? 0.05 : isMobile ? 0.06 : isTablet ? 1.5 :  1,
      reactLogoPosition: isSmall ? [3,4,0] : isMobile ? [5, 4, 0] : isTablet ? [7, 4, 0] : [11, 4, 0],
      ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-15, 13, 0 ] : [-23, 10, 0],
      reactScale: isSmall ? 0.05 : isMobile ? 0.06 : isTablet ? 0.2 :  0.25,
      cubePosition: isSmall ? [4,-5,0] : isMobile ? [5,-5,0] : isTablet ? [8,-5,0] : [11, -7, 0],
      cubeScale: isSmall ? 0.05 : isMobile ? 0.06 : isTablet ? 0.09 :  0.5,
    }

  };
  const sizes = calculateSizes(isSmall, isMobile);


  return (
    <section className="min-h-screen border-2 w-full flex flex-col relative  border-black-500">
        <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
          <p className="sm:text-3xl text-xl font-medium text-white text-center font-generalsans">Hi,I'm Gideon <span className="waving-hand">👋</span></p>
          <p className="hero_tag text-gray_gradient"> Building Products and Brands</p>
        </div>
        <div className="w-full h-full absolute inset-0">
          <Canvas className="w-full h-full">
            <Suspense fallback={<CanvasLoader />}>
              <PerspectiveCamera makeDefault position={[ 0, 0, 20]}/>
              <HeroCamera isMobile={isMobile}> 
                <HackerRoom 
                scale={sizes.deskScale} 
                position={sizes.deskPosition}
                rotation={[0, -Math.PI, 0]}
                />
              </HeroCamera>
              <group>
                <Target 
                scale={sizes.targetScale} 
                position={sizes.targetPosition} 
                rotation={[0, Math.PI / 5, 0]}
                />
                <ReactLogo position={sizes.reactLogoPosition} scale={sizes.reactScale} />
                <Cube position={sizes.cubePosition} />
                <Rings position={sizes.ringPosition}/>
              </group>
              <ambientLight intensity={1} />
              <directionalLight position={[10,10,10]} intensity={0.5} />
            </Suspense>
          </Canvas>
          <div className="absolute bottom-7 right-0 left-0 w-full z-10 c-space">
            <a href="#about" className="w-fit">
              <Button name="Let's Work together" isBeam containerClass="sm:w-fit w-full sm:min-w-96"/>
            </a>
          </div>
        </div>
    </section>
  )
};

export default Hero;