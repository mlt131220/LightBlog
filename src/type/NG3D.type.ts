//场景中所有相机集合的类型
export interface Cameras{
    [uuid:string]:THREE.PerspectiveCamera
}

export interface Geometries{
    [uuid:string]:THREE.BufferGeometry
}

export interface Materials{
    [uuid:string]:THREE.Material
}