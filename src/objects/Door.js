import * as THREE from "three";

export function createDoors({ width, height, depth }) {

    const doors = new THREE.Group();

    const material = new THREE.MeshStandardMaterial({
        color: "#d6a36d"
    });

    //-------------------
    // LEFT DOOR
    //-------------------

    const leftPivot = new THREE.Group();

    leftPivot.name = "leftDoor";

    leftPivot.position.set(
        -width / 2,
        0.4,
        depth / 2 + 0.02
    );

    const leftDoor = new THREE.Mesh(

        new THREE.BoxGeometry(
            width / 2,
            height - 0.8,
            0.04
        ),

        material

    );

    leftDoor.position.x = width / 4;

    leftDoor.castShadow = true;

    leftPivot.add(leftDoor);

    leftPivot.userData = {

        open: false,

        animate() {

            if (this.open) {

                leftPivot.rotation.y += (0 - leftPivot.rotation.y) * 0.12;

            } else {

                leftPivot.rotation.y += ((-Math.PI / 2) - leftPivot.rotation.y) * 0.12;

            }

        }

    };

    doors.add(leftPivot);

    //-------------------
    // RIGHT DOOR
    //-------------------

    const rightPivot = new THREE.Group();

    rightPivot.name = "rightDoor";

    rightPivot.position.set(
        width / 2,
        0.4,
        depth / 2 + 0.02
    );

    const rightDoor = new THREE.Mesh(

        new THREE.BoxGeometry(
            width / 2,
            height - 0.8,
            0.04
        ),

        material

    );

    rightDoor.position.x = -width / 4;

    rightDoor.castShadow = true;

    rightPivot.add(rightDoor);

    rightPivot.userData = {

        open: false,

        animate() {

            if (this.open) {

                rightPivot.rotation.y += (0 - rightPivot.rotation.y) * 0.12;

            } else {

                rightPivot.rotation.y += ((Math.PI / 2) - rightPivot.rotation.y) * 0.12;

            }

        }

    };

    doors.add(rightPivot);

    return doors;

}