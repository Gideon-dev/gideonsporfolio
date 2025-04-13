import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef } from "react";

const HeroCamera = ({children, isMobile}) =>{
    const groupref = useRef();
    useFrame((state, delta) => {
        if(isMobile){
          easing.damp3(state.camera.position, [0, 0, 20] , 0.25, delta)
        }
        easing.dampE(groupref.current.rotation, [-state.pointer.y, -state.pointer.x / 5, 0] , 0.25, delta);
    });

    return(
        <group ref={groupref}>
            {children}
        </group>
    )
};

export default HeroCamera;