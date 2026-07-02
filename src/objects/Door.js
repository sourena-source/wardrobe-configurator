import * as THREE from "three";

export function createDoors({

    width,
    height,
    depth,

    color = "#d6a36d",
    thickness = 0.04,
    handleColor = "#222"

}) {

    const doors = new THREE.Group();

    const material = new THREE.MeshStandardMaterial({

        color

    });

    //-----------------------
    // LEFT
    //-----------------------

    const leftPivot = new THREE.Group();

    leftPivot.name = "leftDoor";

    leftPivot.position.set(

        -width / 2,

        0,

        depth / 2 + thickness / 2

    );

    const leftDoor = new THREE.Mesh(

        new THREE.BoxGeometry(

            width / 2,

            height,

            thickness

        ),

        material

    );

    leftDoor.position.x = width / 4;

    leftPivot.add(leftDoor);

    const leftHandle = new THREE.Mesh(

        new THREE.BoxGeometry(

            0.03,

            0.35,

            0.03

        ),

        new THREE.MeshStandardMaterial({

            color: handleColor

        })

    );

    leftHandle.position.set(

        width / 2 - 0.08,

        0,

        thickness

    );

    leftDoor.add(leftHandle);

    leftPivot.userData = {

        open:false,

        animate(){

            const target=this.open?-Math.PI/2:0;

            leftPivot.rotation.y+=

            (target-leftPivot.rotation.y)*0.12;

        }

    };

    doors.add(leftPivot);

    //-----------------------
    // RIGHT
    //-----------------------

    const rightPivot=new THREE.Group();

    rightPivot.name="rightDoor";

    rightPivot.position.set(

        width/2,

        0,

        depth/2+thickness/2

    );

    const rightDoor=new THREE.Mesh(

        new THREE.BoxGeometry(

            width/2,

            height,

            thickness

        ),

        material

    );

    rightDoor.position.x=-width/4;

    rightPivot.add(rightDoor);

    const rightHandle=new THREE.Mesh(

        new THREE.BoxGeometry(

            0.03,

            0.35,

            0.03

        ),

        new THREE.MeshStandardMaterial({

            color:handleColor

        })

    );

    rightHandle.position.set(

        -width/2+0.08,

        0,

        thickness

    );

    rightDoor.add(rightHandle);

    rightPivot.userData={

        open:false,

        animate(){

            const target=this.open?Math.PI/2:0;

            rightPivot.rotation.y+=

            (target-rightPivot.rotation.y)*0.12;

        }

    };

    doors.add(rightPivot);

    return doors;

}