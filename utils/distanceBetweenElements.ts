function distanceBetweenElements(
  elementOne: HTMLElement,
  elementTwo: HTMLElement,
): number {
  let distance = -1;

  // const [x1, x2, x3, x4] = 0;
  // const x1 = elementOne.offset().top;
  // const y1 = elementOne.offset().left;
  // const x2 = elementTwo.offset().top;
  // const y2 = elementTwo.offset().left;
  const x1 = elementOne.offsetTop;
  const y1 = elementOne.offsetLeft;
  const x2 = elementTwo.offsetTop;
  const y2 = elementTwo.offsetLeft;
  const xDistance = x1 - x2;
  const yDistance = y1 - y2;

  distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);

  return distance;
}

export default distanceBetweenElements;

// function getPositionAtCenter(element: HTMLElement) {
//   const { top, left, width, height } = element.getBoundingClientRect();
//   return {
//     x: left + width / 2,
//     y: top + height / 2,
//   };
// }

// function distanceBetweenElements(a: HTMLElement, b: HTMLElement): number {
//   const aPosition = getPositionAtCenter(a);
//   const bPosition = getPositionAtCenter(b);

//   return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
// }

// export default distanceBetweenElements;
