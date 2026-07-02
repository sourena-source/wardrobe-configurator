import * as THREE from "three";

export function createShelves({

    width,
    height,
    depth,

    count = 5,

    thickness = 0.06,

    color = "#d6a36d",

    sideThickness = 0.06,

    frontGap = 0.02,

    topMargin = 0.30,

    bottomMargin = 0.30

}) {

    const shelves = new THREE.Group();

    const material = new THREE.MeshStandardMaterial({

        color

    });

    const usableHeight =

        height - topMargin - bottomMargin;

    const spacing = usableHeight / (count + 1);

    for (let i = 1; i <= count; i++) {

        const shelf = new THREE.Mesh(

            new THREE.BoxGeometry(

                width - sideThickness * 2,

                thickness,

                depth - frontGap

            ),

            material

        );

        shelf.castShadow = true;

        shelf.receiveShadow = true;

        shelf.position.y =

            -height / 2 +

            bottomMargin +

            spacing * i;

        shelves.add(shelf);

    }

    return shelves;

}