export const isLetterBlockColliding = (obj1, obj2) => {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}

export const isObstacleColliding_0 = (obj1, obj2) => {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width/2 > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}

export const isObstacleColliding_1 = (obj1, obj2) => {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width/2 > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}

export const isTriangleColliding_a = (obj1, obj2) => {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width/2 > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}
export const isTriangleColliding_b = (obj1, obj2) => {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width/2 > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}
export const isTriangleColliding_c = (obj1, obj2) => {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width/2 > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}
export const isTriangleColliding_d = (obj1, obj2) => {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width/2 > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}

export const isObstacleColliding_large = (obj1, obj2) => {
    // Find the distance between the centers of the two objects
    let xDistance = obj1.x - obj2.x;
    let yDistance = obj1.y - obj2.y;
    let distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);

    // Compare the distance to the sum of the radii
    return distance < obj1.radius + obj2.radius;
}

export const isObstacleColliding_right_angle_0 = (obj1, obj2) => {
    // Find the distance between the centers of the two objects
    let xDistance = obj1.x - obj2.x;
    let yDistance = obj1.y - obj2.y;

    // Scale the distances based on the elliptical shape
    let scaledXDistance = xDistance / (obj2.width / 2);
    let scaledYDistance = yDistance / (obj2.height / 2);

    // Compare the scaled distance to 1
    return (scaledXDistance * scaledXDistance + scaledYDistance * scaledYDistance) <= 1;
}

export const isObstacleColliding_right_angle_1 = (obj1, obj2) => {
    // Find the distance between the centers of the two objects
    let xDistance = obj1.x - obj2.x;
    let yDistance = obj1.y - obj2.y;

    // Scale the distances based on the elliptical shape
    let scaledXDistance = xDistance / (obj2.width / 2);
    let scaledYDistance = yDistance / (obj2.height / 2);

    // Compare the scaled distance to 1
    return (scaledXDistance * scaledXDistance + scaledYDistance * scaledYDistance) <= 1;
}

export const isObstacleColliding_twins_0 = (obj1, obj2) => {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width/2 > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}

export const isObstacleColliding_twins_0_divgergence = (obj1, obj2) => {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width/2 > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}

export const isObstacleColliding_twins_1 = (obj1, obj2) => {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width/2 > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}

export const isObstacleColliding_twins_1_divgergence = (obj1, obj2) => {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width/2 > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}

export const isObstacleColliding_opacity_bot = (obj1, obj2) => {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width/2 > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}

export const isObstacleColliding_opacity_bot_divergence = (obj1, obj2) => {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width/2 > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}

export const isSpecialColliding_0 = (obj1, obj2) => {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}
export const isSpecialColliding_1 = (obj1, obj2) => {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}
export const isSpecialColliding_2 = (obj1, obj2) => {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}
export const isSpecialColliding_3 = (obj1, obj2) => {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}

export const isSpecialColliding_a_0 = (obj1, obj2) => {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}
export const isSpecialColliding_a_1 = (obj1, obj2) => {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}
export const isSpecialColliding_a_2 = (obj1, obj2) => {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}
export const isSpecialColliding_a_3 = (obj1, obj2) => {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}

export const isUpgradeToSpecial_0_Colliding = (obj1, obj2) => {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}

export const isAuxilliaryGreenHealth_Colliding = (obj1, obj2) => {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}



// export const isSpecial_0a_Colliding_0 = (obj1, obj2) => {
//     // Find the distance between the centers of the two objects
//     let xDistance = obj1.x - obj2.x;
//     let yDistance = obj1.y - obj2.y;
//     let distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);

//     // Compare the distance to the sum of the radii
//     return distance < obj1.radius + obj2.radius;
// }

// export const isSpecial_0b_Colliding_0 = (obj1, obj2) => {
//     // Find the distance between the centers of the two objects
//     let xDistance = obj1.x - obj2.x;
//     let yDistance = obj1.y - obj2.y;
//     let distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);

//     // Compare the distance to the sum of the radii
//     return distance < obj1.radius + obj2.radius;
// }
