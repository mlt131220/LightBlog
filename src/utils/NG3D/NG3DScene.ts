/**
 * @Date 2021-11-21
 * @Author 二三
 * @Description 三维场景类
 */
 import * as THREE from 'three';
//  import { TextGeometry }
 import NG3DApp from './NG3DApp';

export default class NG3DScene{
    constructor(NG3DApp:NG3DApp){
        NG3DApp.scene.add()
    }

    public title(){
        let geometry = new THREE.TextGeometry( 'THREE.JS', {
            font: font,
            size: 40,
            height: 5,
            curveSegments: 3,
            bevelThickness: 2,
            bevelSize: 1,
            bevelEnabled: true
        } );
    }
}