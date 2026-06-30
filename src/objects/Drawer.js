import * as THREE from "three";

export function createDrawers({
    width,
    height,
    depth,
    material
}) {

    const drawers = new THREE.Group();

    const drawerHeight = 0.35;

    for (let i = 0; i < 2; i++) {

        const drawer = new THREE.Group();

        // بدنه کشو
        const body = new THREE.Mesh(

            new THREE.BoxGeometry(
                width,
                drawerHeight,
                depth
            ),

            material

        );

        body.castShadow = true;
        body.receiveShadow = true;

        drawer.add(body);

        // دستگیره

        const handle = new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.02,
                0.02,
                0.30,
                20
            ),

            new THREE.MeshStandardMaterial({

                color:0x333333

            })

        );

        handle.rotation.z = Math.PI / 2;

        handle.position.z = depth/2 + 0.02;

        drawer.add(handle);

        drawer.position.set(

            0,

            -height/2 + 0.25 + i*0.42,

            0.33

        );

        drawer.userData.open=false;

        drawers.add(drawer);

    }

    return drawers;

}