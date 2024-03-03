import {THREE} from './three-defs.js';

import {entity} from './entity.js';


export const third_person_camera = (() => {

    class ThirdPersonCamera extends entity.Component {
        constructor(params) {
            this.params = params;
            this.camera = params.camera;
        }

        CalculateIdealOffset() {
            const idealOffset = new THREE.Vector3(0, 10, 20);
            const input = this.Parent.Attributes.InputCurrent;

            if (input.forward) {
                idealOffset.lerp(new THREE.Vector3(0, 0, 18), 0.5);
            }
            if (input.backward) {
                idealOffset.lerp(new THREE.Vector3(0, 5, 15), 0.5);
            }
            if (input.left) {
                idealOffset.lerp(new THREE.Vecotr3(-10, 5, 20), 0.5);
            }
            if (input.right) {
                idealOffset.lerp(new THREE.Vector3(10, 5, 20), 0.5);
            }

            idealOffset.applyQuaternion(this.params_.target.Quaternion);
            idealOffset.add(this.params_.target.Position);

            return idealOffset; 
        }

        Update(timeElapsed) {
            const idealOffset = this.CalculateIdealOffset();

            const t1 = 1.0 - Math.pow(0.01, timeElapsed);

            this.currentPosition_.lerp(idealOffset, t1);

            this.camera_.position.copy(this.currentPosition_);
            this.camera_.quaternion.slerp(this.params_.taget.Quaternion, t1);
        }
    };

    return {
        ThirdPersonCamera: ThirdPersonCamera
    }

})();