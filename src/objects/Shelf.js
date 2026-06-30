import * as THREE from "three";

export function createShelves({
    width,
    height,
    depth,
    boardThickness,
    count,
    material
}) {

    const shelves = new THREE.Group();

    const usableHeight = height - 0.6;

    const spacing = usableHeight / (count + 1);

    for (let i = 1; i <= count; i++) {

        const shelf = new THREE.Mesh(

            new THREE.BoxGeometry(

                width - boardThickness * 2,

                boardThickness,

                depth - 0.02

            ),

            material

        );

        shelf.castShadow = true;

        shelf.receiveShadow = true;

        shelf.position.y =

            -height / 2 +

            spacing * i;

        shelves.add(shelf);

    }

    return shelves;

}