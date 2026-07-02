import * as THREE from "three";
import { createShelves } from "./Shelf";
import { createDoors } from "./Door";
import { createDrawers } from "./Drawer";

export function createCabinet(config) {
    const cabinet = new THREE.Group();
config = {

    boardThickness:0.06,

    shelfColor:config.bodyColor,

    drawerColor:config.bodyColor,

    doorColor:config.bodyColor,

    ...config

};
    // ==========================
    // CONFIG
    // ==========================

    
    const width = config.width;

    const height = config.height;

    const depth = config.depth;

    const board = config.boardThickness;

    const bodyMaterial = new THREE.MeshStandardMaterial({

        color: config.bodyColor

    });

    //-------------------------
    // LEFT
    //-------------------------

    const left = new THREE.Mesh(

        new THREE.BoxGeometry(

            board,

            height,

            depth

        ),

        bodyMaterial

    );

    left.position.x = -width / 2;

    left.castShadow = true;

    cabinet.add(left);

    //-------------------------
    // RIGHT
    //-------------------------

    const right = left.clone();

    right.position.x = width / 2;

    cabinet.add(right);

    //-------------------------
    // TOP
    //-------------------------

    const top = new THREE.Mesh(

        new THREE.BoxGeometry(

            width,

            board,

            depth

        ),

        bodyMaterial

    );

    top.position.y = height / 2;

    cabinet.add(top);

    //-------------------------
    // BOTTOM
    //-------------------------

    const bottom = top.clone();

    bottom.position.y = -height / 2;

    cabinet.add(bottom);

    //-------------------------
    // BACK
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
    // SHELVES
    //-------------------------

    const shelves = createShelves({

        width,

        height,

        depth,

        count: config.shelfCount,

        thickness: board,

        sideThickness: board,

        color: config.shelfColor

    });

    cabinet.add(shelves);
        //-------------------------
    // DRAWERS
    //-------------------------

    const drawers = createDrawers({

        width: width - board * 2,

        height,

        depth: depth * 0.9,

        count: config.drawerCount,

        color: config.drawerColor

    });

    cabinet.add(drawers);

    //-------------------------
    // DOORS
    //-------------------------

    const doors = createDoors({

        width,

        height,

        depth,

        color: config.doorColor,

        thickness: 0.04,

        handleColor: "#333333"

    });

    cabinet.add(doors);

    //-------------------------
    // USER DATA
    //-------------------------

    cabinet.userData = {

        config,

        shelves,

        drawers,

        doors

    };

    return cabinet;

}