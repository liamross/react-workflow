export const isBlockColliding = (block1, block2) => (
  block1.x < block2.width + block2.x
  && block1.y < block2.height + block2.y
  && block1.x + block1.width > block2.x
  && block1.y + block1.height > block2.y
);