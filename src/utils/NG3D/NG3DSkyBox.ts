import * as THREE from 'three'

export default class SkyBoxUtils {
  constructor() {}

  /**
   * 创建由6张图片组成的SkyBox。纹理应指定给scene.background.
   */
  static createSkyFromTextures(subFolder:string):Promise<{}>{
    const loader = new THREE.CubeTextureLoader();
    loader.setPath(`static/img/skybox/${subFolder}/`)

    const format:string = ".jpg";

    // 六张图片按顺序排列: right, left, top, bottom, front, back
    const pictures:Array<string> = ['px', 'nx', 'py', 'ny', 'pz', 'nz'];
    const picturesFormat = pictures.map((item:string):string => item + format);
    return new Promise ((resolve, reject) => {
      loader.load(picturesFormat, t => resolve(t))
    })
  }

  /**
   * 创建由6张图片组成的SkyBox-cube
   * @param {String} subFolder 天空盒图片文件夹
   * @param {Number} size Cube大小
   * @return {THREE.Mesh}
   */
  static getCubeSkyBox(subFolder:string,size:number):THREE.Mesh{
    const path:string = `static/img/skybox/${subFolder}/`
    const format:string = '.jpg'
    const urls:Array<string> = [
      path + 'px' + format, path + 'nx' + format,
      path + 'py' + format, path + 'ny' + format,
      path + 'pz' + format, path + 'nz' + format
    ]
    let materials = []
    for (let i = 0; i < urls.length; ++i) {
      let loader = new THREE.TextureLoader()
      let texture = loader.load(urls[i], function () {}, undefined, function () {})
      materials.push(new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.BackSide
          // transparent: true,
          // needsUpdate:true
        })
      )
    }
    let cube = new THREE.Mesh(new THREE.BoxBufferGeometry(size, size, size), materials)
    cube.name = 'SkyBox';
    return cube;
  }
}