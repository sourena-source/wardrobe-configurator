import * as THREE from "three";

export function createDrawers({

    width,
    height,
    depth,

    count = 4,

    drawerHeight = 0.35,

    gap = 0.08,

    color = "#d6a36d",

    handleColor = "#222"

}) {

    const drawers = new THREE.Group();

    const material = new THREE.MeshStandardMaterial({

        color

    });

    const totalHeight = count * drawerHeight + (count - 1) * gap;

    const startY = -height / 2 + 0.15 + totalHeight / 2;

    for (let i = 0; i < count; i++) {

        const drawer = new THREE.Group();

        //-----------------
        // Body
        //-----------------

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

        //-----------------
        // Handle
        //-----------------

        const handle = new THREE.Mesh(

            new THREE.CylinderGeometry(

                0.018,

                0.018,

                0.28,

                20

            ),

            new THREE.MeshStandardMaterial({

                color: handleColor

            })

        );

        handle.rotation.z = Math.PI / 2;

        handle.position.z = depth / 2 + 0.03;

        drawer.add(handle);

        //-----------------
        // Position
        //-----------------

        drawer.position.set(

            0,

            startY - i * (drawerHeight + gap),

            0.33

        );

        //-----------------
        // Animation
        //-----------------

        drawer.userData = {

            open: false,

            animate() {

                const target = this.open ? 0.25 : 0;

                drawer.position.z +=

                    (0.33 + target - drawer.position.z) * 0.12;

            }

        };

        drawer.name = "drawer";

        drawers.add(drawer);

    }

    return drawers;

}