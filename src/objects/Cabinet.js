import * as THREE from "three";

import { createShelves } from "./Shelf";
import { createDoors } from "./Door";
import { createDrawers } from "./Drawer";

export function createCabinet(material) {

    const cabinet = new THREE.Group();

    //-------------------------
    // تنظیمات
    //-------------------------

const board = 0.06;
const width = 2.2;
const height = 3.5;
const depth = 0.7;



    //-------------------------
    // دیواره چپ
    //-------------------------

    const left = new THREE.Mesh(

        new THREE.BoxGeometry(board, height, depth),

        material

    );

    left.position.x = -width / 2;

    left.castShadow = true;

    cabinet.add(left);

    //-------------------------
    // دیواره راست
    //-------------------------

    const right = left.clone();

    right.position.x = width / 2;

    cabinet.add(right);

    //-------------------------
    // سقف
    //-------------------------

    const top = new THREE.Mesh(

        new THREE.BoxGeometry(width, board, depth),

        material

    );

    top.position.y = height / 2;

    top.castShadow = true;

    cabinet.add(top);

    //-------------------------
    // کف
    //-------------------------

    const bottom = top.clone();

    bottom.position.y = -height / 2;

    cabinet.add(bottom);

    //-------------------------
    // پشت
    //-------------------------

    const back = new THREE.Mesh(

        new THREE.BoxGeometry(

            width,

            height,

            0.02

        ),

        new THREE.MeshStandardMaterial({

            color: "#d8b08c"

        })

    );

    back.position.z = -depth / 2;

    cabinet.add(back);

    //-------------------------
    // طبقات
    //-------------------------

    const shelves = createShelves({

        width,

        height,

        depth,

        boardThickness: board,

        count: 4,

        material

    });

    cabinet.add(shelves);

    //-------------------------
    // کشوها
    //-------------------------

    const drawers = createDrawers({

        width: width - board * 2,

        height,

        depth: depth * 0.9,

        material

    });

    cabinet.add(drawers);

    //-------------------------
    // درب ها
    //-------------------------

    const doors = createDoors({

        width,

        height,

        depth

    });

    cabinet.add(doors);

    cabinet.userData = {

        doors,

        drawers,

        shelves

    };

    return cabinet;

}