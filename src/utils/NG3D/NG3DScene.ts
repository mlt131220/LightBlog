/**
 * @Date 2021-11-21
 * @Author 二三
 * @Description 三维场景类
 */
import * as THREE from 'three';
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"
import NG3DApp from './NG3DApp';

export default class NG3DScene {
    public NG3DApp;
    constructor(NG3DApp: NG3DApp) {
        this.NG3DApp = NG3DApp;
        this.light();
        this.title();
        this.test();

        console.log(this.NG3DApp.scene)
        console.log(this.NG3DApp.camera)
    }

    //场景灯光
    light() {
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.125);
        dirLight.position.set(0, 0, 0).normalize();
        this.NG3DApp.scene.add(dirLight);

        const pointLight = new THREE.PointLight(0xffffff, 1.5);
        pointLight.position.set(0, 100, 90);
        this.NG3DApp.scene.add(pointLight);
    }

    //三维文字title
    title() {
        const fontLoader = new FontLoader();

        import('three/examples/fonts/helvetiker_regular.typeface.json').then(res => {
            const font = fontLoader.parse(res);

            let geometry = new TextGeometry('THREE.JS', {
                font: font,
                size: 80,
                height: 10,
                curveSegments: 3,
                bevelThickness: 2,
                bevelSize: 1,
                bevelEnabled: true
            });

            const matLite = new THREE.MeshBasicMaterial({
                color: 0x00ff00,
                transparent: true,
                opacity: 0.8,
                side: THREE.DoubleSide
            });

            const text = new THREE.Mesh(geometry, matLite);

            this.NG3DApp.addObject(text);
        })

    }

    test() {
        var geometry = new THREE.BoxBufferGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        var cube = new THREE.Mesh(geometry, material);
        this.NG3DApp.scene.add(cube);
    }
}