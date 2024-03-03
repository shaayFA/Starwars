import {THREE, OrbitControls} from './three-defs.js';
import {entity} from './entity.js';

export const threejs_component = (() => {

    class ThreeJSController extends entity.Component {
        constructor() {
            super();
        }

        InitEntity() {
            this.threejs_ = new THREE.WebGLRenderer({
                antialias: false,
            });
            this.threejs_.outputEncoding = THREE.sRGBEncoding;
            this.threejs_.shadowMap.enabled = true;
            this.threejs_.shadowMap.type = THREE.PCFSoftshadowMap;
            this.threejs_.setPixelRatio(window.devicePixelRatio);
            this.threejs_.setSize(window.innerWidth, window.innerHeight);
            this.threejs_.domElement.id = 'threejs';
            this.threejs_.physicallyCorrectLights = true;

            document.getElementByld('container').appendChild(this.threejs_.DomElement);

            this.camera_ = new THREE.PrespectiveCamera(60, 1920/1080, 1.0, 100000.0);
            this.scene_ = new THREE.Scene();

            const loader = new THREE.CubeTextureLoader();
            const texture = loader.load({
                './resources/terrain/space-posx.jpg',
                './resources/terrain/space-negx.jpg',
                './resources/terrain/space-posy.jpg',
                './resources/terrain/space-negy.jpg',
                './resources/terrain/space-posz.jpg',
                './resources/terrain/space-negz.jpg',
            });
            texture.encoding = THREE.sRGBEncoding;
            this.scene_.background = texture
        }

        Render() {
            this.threejs_.render(this.scene_, this.camera_);
        }
    }

    return {
        ThreeJSController: ThreeJSController
    };
})();
