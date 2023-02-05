import { VNode, VNodeUpdater } from './types';

function createDifferent(oldVNode1: VNode, newVNode2: VNode): VNodeUpdater {
    return {
        type: 'skip',
    };
}

export {
    createDifferent,
};
