export type IVect3d = [number, number, number];

export const addVect3d = (v1 : IVect3d, v2 : IVect3d) : IVect3d => {
    return ([
        v1[0] + v2[0],
        v1[1] + v2[1],
        v1[2] + v2[2],
    ]);
}

export const subVect3d = (v1 : IVect3d, v2 : IVect3d) : IVect3d => {
    return ([
        v1[0] - v2[0],
        v1[1] - v2[1],
        v1[2] - v2[2],
    ]);
}

export const multVect3d = (v1 : IVect3d, v2 : IVect3d) : IVect3d => {
    return ([
        v1[0] * v2[0],
        v1[1] * v2[1],
        v1[2] * v2[2],
    ]);
}

export const divVect3d = (v1 : IVect3d, v2 : IVect3d) : IVect3d => {
    return ([
        v1[0] / v2[0],
        v1[1] / v2[1],
        v1[2] / v2[2],
    ]);
}